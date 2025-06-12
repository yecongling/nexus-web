import { CommentEditorFormField } from '@/components/workflow/nodes/comment/constant';
import {
  FlowNodeFormData,
  type FormModelV2,
  HistoryService,
  TransformData,
  useCurrentEntity,
  usePlayground,
  useService,
} from '@flowgram.ai/free-layout-editor';
import { useCallback, useEffect, useState } from 'react';

/**
 * 判定尺寸
 */
export const useSize = () => {
  // 当前节点
  const node = useCurrentEntity();
  const nodeMeta = node.getNodeMeta();

  const playground = usePlayground();
  const historyService = useService(HistoryService);

  const { size = { width: 240, height: 150 } } = nodeMeta;
  const transform = node.getData(TransformData);
  const formModel = node.getData(FlowNodeFormData).getFormModel<FormModelV2>();

  // 获取输入的宽高
  const formSize = formModel.getValueIn<{ width: number; height: number }>(
    CommentEditorFormField.Size,
  );

  const [width, setWidth] = useState<number>(formSize?.width ?? size.width);
  const [height, setHeight] = useState<number>(formSize?.height ?? size.height);

  // 初始化表单
  useEffect(() => {
    const initSize = formModel.getValueIn<{ width: number; height: number }>(
      CommentEditorFormField.Size,
    );
    if (!initSize) {
      formModel.setValueIn(CommentEditorFormField.Size, {
        width,
        height,
      });
    }
  }, [formModel, width, height]);

  // 同步表单外部值变化
  useEffect(() => {
    const disposer = formModel.onFormValuesChange(({ name }) => {
      if (name !== CommentEditorFormField.Size) {
        return;
      }
      const newSize = formModel.getValueIn<{ width: number; height: number }>(
        CommentEditorFormField.Size,
      );
      if (!newSize) return;
      setWidth(newSize.width);
      setHeight(newSize.height);
    });
    return () => disposer.dispose();
  }, [formModel]);

  // 尺寸变化监听
  const onResize = useCallback(() => {}, [
    node,
    width,
    height,
    transform,
    playground,
    formModel,
    historyService,
  ]);

  return {
    width,
    height,
    onResize,
  };
};
