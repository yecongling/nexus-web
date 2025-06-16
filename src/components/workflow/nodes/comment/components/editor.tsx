import { useEffect, useRef, type FC } from 'react';
import type { CommentEditorModel } from '../model';
import { usePlayground } from '@flowgram.ai/free-layout-editor';
import { useTranslation } from 'react-i18next';
import { CommentEditorEvent } from '../constant';

/**
 * 注释编辑器属性
 */
interface CommentEditorProps {
  model: CommentEditorModel;
  style?: React.CSSProperties;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * 注释编辑器
 * @param props
 * @returns
 */
export const CommentEditor: FC<CommentEditorProps> = (props) => {
  const { model, style, value, onChange } = props;
  const playground = usePlayground();
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  const { t } = useTranslation();

  const placeholder =
    model.value || model.focused
      ? undefined
      : t('workflow.comment.placeholder');

  // 同步编辑器内部值变化
  useEffect(() => {
    const disposer = model.on((params) => {
      if (params.type !== CommentEditorEvent.Change) return;
      onChange?.(params.value);
    });
    return () => disposer.dispose();
  }, [model, onChange]);

  // 编辑器绑定后初始化model
  useEffect(() => {
    if (!editorRef.current) return;
    model.element = editorRef.current;
  }, [editorRef]);

  return (
    <div className="workflow-comment-editor">
      <p className="workflow-comment-editor-placeholder">{placeholder}</p>
      <textarea
        className="workflow-comment-editor-textarea"
        ref={editorRef}
        style={style}
        // 这里注意，可能会值同步不到文本域中
        value={value}
        readOnly={playground.config.readonly}
        onChange={(e) => {
          model.setValue(e.target.value);
        }}
        onFocus={() => model.setFocus(true)}
        onBlur={() => model.setFocus(false)}
      />
    </div>
  );
};
