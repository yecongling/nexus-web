import type { FlowNodeRegistry } from '@/types/workflow/node';
import { HttpNodeRegistry } from './start/http';
import { CommentNodeRegistry } from './comment';

/**
 * 节点注册列表
 */
export const nodeRegistries: FlowNodeRegistry[] = [
    HttpNodeRegistry,
    // 注释节点
    CommentNodeRegistry
];
