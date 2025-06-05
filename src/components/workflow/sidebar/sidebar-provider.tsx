import { SidebarContext } from '@/context/workflow/sidebar-context';
import { useState, type ReactNode } from 'react';

/**
 * 侧边栏上下文提供器
 */
export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: { children: ReactNode }) => {
  const [nodeId, setNodeId] = useState<string | undefined>();
  return (
    <SidebarContext.Provider value={{ visible: !!nodeId, nodeId, setNodeId }}>
      {children}
    </SidebarContext.Provider>
  );
};
