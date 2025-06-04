import type { FlowNodeRegistry } from '@/types/workflow/node';
import { HttpNodeRegistry } from './start/http';

/**
 * 节点注册列表
 */
export const nodeRegistries: FlowNodeRegistry[] = [HttpNodeRegistry];
