import { NodeRenderContext } from '@/context/workflow/node-render-context';
import {
  IsSidebarContext,
  SidebarContext,
} from '@/context/workflow/sidebar-context';
import type { FlowNodeMeta } from '@/types/workflow/node';
import {
  PlaygroundEntityContext,
  useClientContext,
} from '@flowgram.ai/free-layout-editor';
import { Drawer } from 'antd';
import { useCallback, useContext, useEffect, useMemo } from 'react';

/**
 * 侧边栏渲染器(渲染每个选中节点的配置面板)
 * @returns
 */
const SidebarRenderer: React.FC = () => {
  const { nodeRender, setNodeRender } = useContext(SidebarContext);
  const { selection, playground } = useClientContext();

  /**
   * 取消渲染
   */
  const handleCancel = useCallback(() => {
    setNodeRender(undefined);
  }, []);

  /**
   * 监听画布实例变更
   */
  useEffect(() => {
    console.log('监听到画布实例变更', playground);
  }, [playground]);

  /**
   * 监听节点选中
   */
  useEffect(() => {
    const toDispose = selection.onSelectionChanged(() => {
      console.log('监听到节点选中', selection);
      /**
       * 如果没有选中任何节点，则自动关闭侧边栏
       * If no node is selected, the sidebar is automatically closed
       */
      if (selection.selection.length === 0) {
        handleCancel();
      } else if (
        selection.selection.length === 1 &&
        selection.selection[0] !== nodeRender?.node
      ) {
        handleCancel();
      }
    });
    return () => {
      toDispose.dispose();
    };
  }, [selection, handleCancel]);

  /**
   * 监听节点销毁
   */
  useEffect(() => {
    if (nodeRender) {
      const toDispose = nodeRender.node.onDispose(() => {
        console.log('监听到节点销毁', nodeRender);
        setNodeRender(undefined);
      });
      return () => {
        toDispose.dispose();
      };
    }
  }, [nodeRender]);

  /**
   * 节点渲染
   */
  const visible = useMemo(() => {
    if (!nodeRender) {
      return false;
    }
    const { disableSideBar = false } =
      nodeRender.node.getNodeMeta<FlowNodeMeta>();
    return !disableSideBar;
  }, [nodeRender]);

  /**
   * 内容
   */
  const content = nodeRender ? (
    <PlaygroundEntityContext.Provider
      key={nodeRender.node.id}
      value={nodeRender.node}
    >
      <NodeRenderContext.Provider value={nodeRender}>
        {nodeRender.form?.render()}
      </NodeRenderContext.Provider>
    </PlaygroundEntityContext.Provider>
  ) : null;

  return (
    <Drawer mask={false} open={visible} onClose={handleCancel}>
      <IsSidebarContext.Provider value={true}>
        {content}
      </IsSidebarContext.Provider>
    </Drawer>
  );
};
export default SidebarRenderer;
