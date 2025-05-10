import { HttpRequest } from '@/utils/request';
import type { ProjectModel, ProjectSearchParams } from './types';

/**
 * 项目相关接口
 */
const ProjectApi: Record<string, string> = {
  /**
   * 获取项目列表
   */
  getProjectList: '/engine/project/getProjectList',
  /**
   * 新增项目
   */
  addProject: '/engine/project/addProject',

  /**
   * 更新项目
   */
  updateProject: '/engine/project/updateProject',
};

/**
 * 项目服务接口
 */
export interface IProjectService {
  /**
   * 获取项目列表
   */
  getProjectList(
    searchParams: ProjectSearchParams,
  ): Promise<Record<string, any>>;

  /**
   * 新增项目
   */
  addProject(project: Partial<ProjectModel>): Promise<boolean>;
  /**
   * 更新项目
   */
  updateProject(project: Partial<ProjectModel>): Promise<boolean>;
}

/**
 * 项目服务实现
 */
export const projectService: IProjectService = {
  /**
   * 获取项目列表
   */
  async getProjectList(
    searchParams: ProjectSearchParams,
  ): Promise<Record<string, any>> {
    const response = await HttpRequest.get(
      {
        url: ProjectApi.getProjectList,
        params: searchParams,
      },
      {
        successMessageMode: 'none',
      },
    );
    return response;
  },
  /**
   * 新增项目
   */
  async addProject(project: Partial<ProjectModel>): Promise<boolean> {
    const response = await HttpRequest.post({
      url: ProjectApi.addProject,
      data: project,
    });
    return response;
  },
  /**
   * 更新项目
   */
  async updateProject(project: Partial<ProjectModel>): Promise<boolean> {
    const response = await HttpRequest.post({
      url: ProjectApi.updateProject,
      data: project,
    });
    return response;
  },
};
