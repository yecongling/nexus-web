import { HttpRequest } from '@/utils/request';
import type { Tag } from './tagsModel';

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
   * @param type 标签类型
   */
  getTagsList(type: string): Promise<Tag[]>;

  /**
   * 新增标签
   */
  addTags(tags: Partial<Tag>): Promise<boolean>;
  /**
   * 更新标签
   */
  updateTags(tags: Partial<Tag>): Promise<boolean>;
}

/**
 * 标签服务实现
 */
export const tagsService: ITagsService = {
  /**
   * 获取标签列表
   */
  async getTagsList(type?: string): Promise<Tag[]> {
    const response = await HttpRequest.get(
      {
        url: TagsApi.getTagsList,
        params: { type },
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
  async addTags(tags: Partial<Tag>): Promise<boolean> {
    const response = await HttpRequest.post({
      url: TagsApi.addTags,
      data: tags,
    });
    return response;
  },
  /**
   * 更新标签
   */
  async updateTags(tags: Partial<Tag>): Promise<boolean> {
    const response = await HttpRequest.post({
      url: TagsApi.updateTags,
      data: tags,
    });
    return response;
  },
};
