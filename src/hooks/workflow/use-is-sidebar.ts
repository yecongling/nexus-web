import { IsSidebarContext } from '@/context/workflow/sidebar-context';
import { useContext } from 'react';

/**
 * 判读是否是在渲染侧边栏
 * @returns 
 */
export function useIsSidebar() {
  return useContext(IsSidebarContext);
}
