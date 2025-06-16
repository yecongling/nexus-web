import type { WorkflowNodeEntity } from "@flowgram.ai/free-layout-editor";

/**
 * 节点菜单属性
 */
interface NodeMenuProps {
  node: WorkflowNodeEntity;
  updateTitleEdit?: (setEditing: boolean) => void;
  deleteNode: () => void;
}

/**
 * 节点菜单 菜单由各个节点的配置项
 * @param props
 * @returns
 */
export const NodeMenu: React.FC<NodeMenuProps> = (props) => {
  const { node, updateTitleEdit, deleteNode } = props;
  return (
    <div className="node-menu">
      节点菜单
    </div>
  );
};