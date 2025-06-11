import type { FlowNodeRegistry } from '@/types/workflow/node';
import { WorkflowNodeType } from '../constants';

/**
 * 注册注释组件（用于给流程中的节点添加相关的描述信息的）
 * @returns
 */
export const CommentNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Comment,
  meta: {
    disableSideBar: true,
    defaultPorts: [],
    renderKey: WorkflowNodeType.Comment,
    size: {
      width: 240,
      height: 150,
    },
    formMeta: {
      render: () => <></>,
    },
    getInputPoints: () => [], // Comment 节点没有输入
    getOutputPoints: () => [], // Comment 节点没有输出
  },
};
