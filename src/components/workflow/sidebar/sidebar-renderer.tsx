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
import { SidebarNodeRenderer } from './sidebar-node-renderer';

/**
 * 侧边栏渲染器(渲染每个选中节点的配置面板)
 * @returns
 */
const SidebarRenderer: React.FC = () => {
  const { nodeId, setNodeId } = useContext(SidebarContext);
  const { selection, playground, document } = useClientContext();

  const node = nodeId ? document.getNode(nodeId) : undefined;

  /**
   * 取消渲染
   */
  const handleCancel = useCallback(() => {
    setNodeId(undefined);
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
        selection.selection[0] !== node
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
    if (node) {
      const toDispose = node.onDispose(() => {
        console.log('监听到节点销毁', node);
        setNodeId(undefined);
      });
      return () => {
        toDispose.dispose();
      };
    }
  }, [node]);

  /**
   * 节点渲染
   */
  const visible = useMemo(() => {
    if (!node) {
      return false;
    }
    const { disableSideBar = false } = node.getNodeMeta<FlowNodeMeta>();
    return !disableSideBar;
  }, [node]);

  if (playground.config.readonly) {
    return null;
  }
  /**
   * 内容
   */
  const content = node ? (
    <PlaygroundEntityContext.Provider key={node.id} value={node}>
      <SidebarNodeRenderer node={node} />
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
