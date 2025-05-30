import {
  type WorkflowNodeJSON as FlowNodeJsonDefault,
  type WorkflowNodeRegistry as FlowNodeRegistryDefault,
  FreeLayoutPluginContext,
  FlowNodeEntity,
  type WorkflowEdgeJSON,
  type WorkflowNodeMeta,
} from '@flowgram.ai/free-layout-editor';

/**
 * 自定义的节点数据结构
 */
export interface FlowNodeJSON extends FlowNodeJsonDefault {
  data: {
    /**
     * 节点标题
     */
    title?: string;
    /**
     * 其他属性
     */
    [key: string]: any;
  };
}

/**
 * 自定义的节点的meta数据（ui相关的部分）
 * 例如节点位置，大小，其他属性
 */
export interface FlowNodeMeta extends WorkflowNodeMeta {}

/**
 * 定义节点的注册器
 * 用于确定节点的类型以及渲染方式
 * 不同的节点类型可以有不同的渲染方式，例如文本节点，图片节点，视频节点等
 * 
 */
export interface FlowNodeRegistry extends FlowNodeRegistryDefault {
  meta: FlowNodeMeta;

  info?: {
    icon: string;
    description: string;
  };
}

/**
 * 定义的流程的json数据结构
 */
export interface FlowDocumentJSON {
  nodes: FlowNodeJSON[];
  edges: WorkflowEdgeJSON[];
}
