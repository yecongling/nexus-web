import { NodeMenu } from '@/components/workflow/node-menu';
import classNames from '@/utils/classnames';
import type { WorkflowNodeEntity } from '@flowgram.ai/free-layout-editor';
import type { FC } from 'react';

/**
 * 更多按钮属性
 */
interface MoreButtonProps {
  node: WorkflowNodeEntity;
  focused: boolean;
  deleteNode: () => void;
}

export const MoreButton: FC<MoreButtonProps> = ({
  node,
  focused,
  deleteNode,
}) => (
  <div
    className={classNames('workflow-comment-more-button', {
      'workflow-comment-more-button-focused': focused,
    })}
  >
    <NodeMenu node={node} deleteNode={deleteNode} />
  </div>
);
