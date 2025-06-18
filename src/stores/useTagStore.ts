import type { Tag } from '@/services/common/tags/tagsModel';
import { create } from 'zustand';

type TagStoreState = {
  tagList: Tag[];
  showTagManagementModal: boolean;
};

type Action = {
  setTagList: (tags: Tag[]) => void;
  setShowTagManagementModal: (show: boolean) => void;
};

/**
 * 标签管理状态
 * 用于存储标签列表和标签管理模态框的显示状态
 */
export const useTagStore = create<TagStoreState & Action>((set) => ({
  tagList: [],
  showTagManagementModal: false,
  setTagList: (tags: Tag[]) => set({ tagList: tags }),
  setShowTagManagementModal: (show: boolean) =>
    set({ showTagManagementModal: show }),
}));
