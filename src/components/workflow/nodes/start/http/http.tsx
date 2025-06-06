import { useIsModal } from '@/hooks/workflow/use-is-modal';
import { useIsSidebar } from '@/hooks/workflow/use-is-sidebar';
import type { FlowNodeJSON } from '@/types/workflow/node';
import {
  useNodeRender,
  ValidateTrigger,
  type FormMeta,
  type FormRenderProps,
} from '@flowgram.ai/free-layout-editor';

/**
 * http 输出节点
 * @returns
 */
export const HttpNode = (props: FormRenderProps<FlowNodeJSON>) => {
  const nodeRender = useNodeRender();
  const { node } = nodeRender;
  const nodeMeta = node.getNodeMeta();
  const isSidebar = useIsSidebar();
  const isNodeModal = useIsModal();

  if (isNodeModal) {
    return <div>http节点的弹窗配置界面</div>;
  }
  if (isSidebar) {
    return <div>http节点的具体配置界面</div>;
  }
  return (
    <div
      style={{ width: nodeMeta.size.width, height: nodeMeta.size.height }}
      className="bg-amber-300 text-blue-500"
    >
      http输出节点
    </div>
  );
};

export const formMeta: FormMeta<FlowNodeJSON> = {
  render: HttpNode,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({ value }: { value: string }) =>
      value ? undefined : 'Title is required',
  },
};
