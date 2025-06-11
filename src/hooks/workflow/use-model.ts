import { CommentEditorModel } from '@/components/workflow/nodes/comment/model';
import {
  FlowNodeFormData,
  type FormModelV2,
  useEntityFromContext,
  useNodeRender,
  type WorkflowNodeEntity,
} from '@flowgram.ai/free-layout-editor';
import { useMemo } from 'react';

/**
 * 创建节点模型的
 */
export const useModel = () => {
  const node = useEntityFromContext<WorkflowNodeEntity>();
  const { selected: focused } = useNodeRender();

  const formModel = node.getData(FlowNodeFormData).getFormModel<FormModelV2>();

  const model = useMemo(() => new CommentEditorModel(), []);

  
};
