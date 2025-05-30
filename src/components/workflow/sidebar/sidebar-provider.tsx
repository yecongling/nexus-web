import { SidebarContext } from '@/context/workflow/sidebar-context';
import type { NodeRenderReturnType } from '@flowgram.ai/free-layout-editor';
import { useState, type ReactNode } from 'react';

/**
 * 侧边栏上下文提供器
 */
export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: { children: ReactNode }) => {
  const [nodeRender, setNodeRender] = useState<
    NodeRenderReturnType | undefined
  >();
  return (
    <SidebarContext.Provider
      value={{ visible: !!nodeRender, nodeRender, setNodeRender }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
