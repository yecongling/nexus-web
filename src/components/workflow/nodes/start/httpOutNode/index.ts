import { formMeta } from './form-meta';
import type { FlowNodeRegistry } from '@/types/workflow/node';
import { WorkflowNodeType } from '../../constants';

/**
 * http输入的节点
 */
export const HttpOutNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.HttpInput,

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
    info: {},
    formMeta,
    canAdd() {
      return true;
    },
  },
};
