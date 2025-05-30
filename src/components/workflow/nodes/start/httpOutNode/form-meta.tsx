import type { FlowNodeJSON } from '@/types/workflow/node';
import {
  ValidateTrigger,
  type FormMeta,
  type FormRenderProps,
} from '@flowgram.ai/free-layout-editor';

/**
 * http 输出节点
 * @returns
 */
export const HttpOutNode = (props: FormRenderProps<FlowNodeJSON>) => {
  return <>http输出节点</>;
};

export const formMeta: FormMeta<FlowNodeJSON> = {
  render: HttpOutNode,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({ value }: { value: string }) =>
      value ? undefined : 'Title is required',
  },
};
