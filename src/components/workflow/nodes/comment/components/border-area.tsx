import { useNodeRender } from '@flowgram.ai/free-layout-editor';
import type { CommentEditorModel } from '../model';

interface BlankAreaProps {
  model: CommentEditorModel;
}
export const BlankArea: React.FC<BlankAreaProps> = (props) => {
  const { model } = props;
  const { selectNode } = useNodeRender();
  return (
  <div className="workflow-comment-blank-area h-full w-full">
    
  </div>

);
};
