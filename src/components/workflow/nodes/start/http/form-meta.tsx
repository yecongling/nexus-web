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
export const HttpNode = (props: FormRenderProps<FlowNodeJSON>) => {
  console.log(props);
  return <div className='bg-amber-300 text-blue-500'>http输出节点</div>;
};

export const formMeta: FormMeta<FlowNodeJSON> = {
  render: HttpNode,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({ value }: { value: string }) =>
      value ? undefined : 'Title is required',
  },
};
