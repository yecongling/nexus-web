import { SidebarContext } from '@/context/workflow/sidebar-context';
import { useNodeRenderContext } from '@/hooks/workflow/use-node-render-context';
import classNames from '@/utils/classnames';
import {
  useClientContext,
  WorkflowPortRender,
} from '@flowgram.ai/free-layout-editor';
import { useContext, useState } from 'react';
import { scrollToView } from './util';
import './node-wrapper.scss';

/**
 * 节点包裹器属性
 */
export interface NodeWrapperProps {
  isScrollToView?: boolean;
  children: React.ReactNode;
}

/**
 * 节点包裹器组件
 * 主要用于包裹节点使用
 * 用于节点的拖拽、点击事件、和点位渲染
 *
 * @param props 节点包裹器属性
 * @returns 节点包裹器组件
 */
const NodeWrapper: React.FC<NodeWrapperProps> = ({
  isScrollToView,
  children,
}) => {
  const nodeRender = useNodeRenderContext();
  const { selected, startDrag, ports, selectNode, nodeRef, onFocus, onBlur } =
    nodeRender;
  const [isDragging, setIsDragging] = useState(false);
  const sidebar = useContext(SidebarContext);
  const form = nodeRender.form;
  const ctx = useClientContext();

  const portsRender = ports.map((port) => (
    <WorkflowPortRender key={port.id} entity={port} />
  ));

  return (
    <>
      <div
        className={classNames('node-wrapper', {
          selected: selected,
        })}
        ref={nodeRef}
        draggable
        onDragStart={(e) => {
          startDrag(e);
          setIsDragging(true);
        }}
        onClick={(e) => {
          selectNode(e);
          if (!isDragging) {
            sidebar.setNodeId(nodeRender.node.id);
            // 可选：将 isScrollToView 设为 true，可以让节点选中后滚动到画布中间
            if (isScrollToView) {
              scrollToView(ctx, nodeRender.node);
            }
          }
        }}
        onMouseUp={() => setIsDragging(false)}
        onFocus={onFocus}
        onBlur={onBlur}
        data-node-selected={String(selected)}
        style={{
          outline: form?.state.invalid ? '1px solid red' : 'none',
        }}
      >
        {children}
      </div>
      {portsRender}
    </>
  );
};
export default NodeWrapper;
