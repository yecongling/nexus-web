import type { WorkflowNodeEntity } from '@flowgram.ai/free-layout-editor';

/**
 * 注释组件
 * @returns
 */
export const CommentRender: React.FC<{ node: WorkflowNodeEntity }> = (
  props,
) => {
  const { node } = props;
  

  return <div className="workflow-comment">注释组件</div>;
};
