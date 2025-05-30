import type { FlowNodeRegistry } from '@/types/workflow/node';
import { HttpOutNodeRegistry } from './start/httpOutNode';

/**
 * 节点注册列表
 */
export const nodeRegistries: FlowNodeRegistry[] = [HttpOutNodeRegistry];
