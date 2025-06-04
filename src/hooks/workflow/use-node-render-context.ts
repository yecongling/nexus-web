import { NodeRenderContext } from '@/context/workflow/node-render-context';
import { useContext } from 'react';

/**
 * 获取节点渲染上下文
 * @returns
 */
export function useNodeRenderContext() {
  return useContext(NodeRenderContext);
}
