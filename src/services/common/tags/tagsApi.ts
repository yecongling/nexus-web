import { HttpRequest } from '@/utils/request';
import type { TagsModel } from './tagsModel';

/**
 * 标签相关接口
 */
const TagsApi: Record<string, string> = {
  /**
   * 获取标签列表
   */
  getTagsList: '/engine/tags/getTagsList',
  /**
   * 新增标签
   */
  addTags: '/engine/tags/addTags',
  /**
   * 更新标签
   */
  updateTags: '/engine/tags/updateTags',
};

/**
 * 标签服务接口
 */
export interface ITagsService {
  /**
   * 获取标签列表
   */
  getTagsList(name?: string): Promise<TagsModel[]>;

  /**
   * 新增标签
   */
  addTags(tags: Partial<TagsModel>): Promise<boolean>;
  /**
   * 更新标签
   */
  updateTags(tags: Partial<TagsModel>): Promise<boolean>;
}

/**
 * 标签服务实现
 */
export const tagsService: ITagsService = {
  /**
   * 获取标签列表
   */
  async getTagsList(name?: string): Promise<TagsModel[]> {
    const response = await HttpRequest.get(
      {
        url: TagsApi.getTagsList,
        params: { name },
      },
      {
        successMessageMode: 'none',
      },
    );
    return response;
  },

  /**
   * 新增标签
   */
  async addTags(tags: Partial<TagsModel>): Promise<boolean> {
    const response = await HttpRequest.post({
      url: TagsApi.addTags,
      data: tags,
    });
    return response;
  },
  /**
   * 更新标签
   */
  async updateTags(tags: Partial<TagsModel>): Promise<boolean> {
    const response = await HttpRequest.post({
      url: TagsApi.updateTags,
      data: tags,
    });
    return response;
  },
};
