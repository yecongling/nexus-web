import type { FlowNodeJSON } from '@/types/workflow/node';
import {
  type FormRenderProps,
  type FormMeta,
  ValidateTrigger,
} from '@flowgram.ai/free-layout-editor';

export const renderForm = ({ form }: FormRenderProps<FlowNodeJSON>) => {
  return <div>默认节点渲染</div>;
};

export const defaultFormMeta: FormMeta<FlowNodeJSON> = {
  render: renderForm,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({ value }: { value: string }) =>
      value ? undefined : 'Title is required',
  },
};
