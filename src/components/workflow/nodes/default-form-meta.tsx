import type { FlowNodeJSON } from '@/types/workflow/node';
import { type FormRenderProps, FormMeta, ValidateTrigger } from '@flowgram.ai/free-layout-editor';

export const renderForm = ({form}: FormRenderProps<FlowNodeJSON>) => {
  return <div>默认节点</div>;
}