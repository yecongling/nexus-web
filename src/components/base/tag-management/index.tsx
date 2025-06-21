import React from "react";
import DragModal from "@/components/modal/DragModal";
import {useTagStore} from "@/stores/useTagStore.ts";

type TagManagementModalProps = {
  type: string;
  show: boolean
}

/**
 * 标签管理弹窗
 */
const TagManagementModal: React.FC<TagManagementModalProps> = ({type, show}) => {
  const {setShowTagManagementModal} = useTagStore();
  return (
    <DragModal centered open={show} title="标签管理" onCancel={() => setShowTagManagementModal(false)}>
      <h1>Tag Management</h1>
    </DragModal>
  );
}
export default TagManagementModal;