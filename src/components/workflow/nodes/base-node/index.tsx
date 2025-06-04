import type { FlowNodeEntity } from "@flowgram.ai/free-layout-editor";

/**
 * 节点渲染方法（所有节点渲染的入口）
 */
const BaseNode: React.FC<{node: FlowNodeEntity}> = ({node}) => {
  return (
    <>
        渲染节点：{node.flowNodeType}
    </>
  )
}
export default BaseNode;