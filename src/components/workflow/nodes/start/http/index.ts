import { formMeta } from './form-meta';
import type { FlowNodeRegistry } from '@/types/workflow/node';
import { WorkflowNodeType } from '../../constants';

/**
 * http输入的节点
 */
export const HttpNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.HTTP,

  meta: {
    isStart: true,
    deleteDisable: false,
    copyDisable: false,
    defaultPorts: [
      {
        type: 'output',
      },
    ],
    size: {
      width: 300,
      height: 220,
    },
  },
  info: {
    icon: '',
    description: 'http输入的节点',
  },
  formMeta,
  canAdd() {
    return false;
  },
};
