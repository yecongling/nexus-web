import React from 'react';

import type { NodeRenderReturnType } from '@flowgram.ai/free-layout-editor';

/**
 * 侧边栏上下文(用于右边栏显示每个选中的节点的配置信息)
 */
export const SidebarContext = React.createContext<{
  visible: boolean;
  nodeRender?: NodeRenderReturnType;
  setNodeId: (node: string | undefined) => void;
}>({
  visible: false,
  setNodeId: () => {},
});

export const IsSidebarContext = React.createContext<boolean>(false);
