import { HttpRequest } from "@/utils/request";
import type { Project } from "@/views/project/Design/types";

export enum DesignApi {
  /**
   * 获取项目设计列表
   */
  getProjectList = "/engine/project/getProjectList",

  /**
   * 新增项目
   */
  addProject = "/engine/project/addProject",

  /**
   * 更新项目
   */
  updateProject = "/engine/project/updateProject",
}

/**
 * 项目查询参数
 */
export interface ProjectSearchParams {
  /**
   * 项目名称
   */
  name?: string;
  /**
   * 项目类型
   */
  type?: number;
}

/**
 * 项目服务接口
 */
export interface IDesignService {
  /**
   * 获取项目列表
   * @param pageParams 分页参数
   * @param searchParams 参数
   * @returns 结果
   */
  getProjectList(searchParams?: ProjectSearchParams): Promise<Project[]>;

  /**
   * 新增项目
   * @param params 项目信息
   */
  addProject(params: Project): Promise<boolean>;

  /**
   * 更新项目
   * @param params 项目信息
   * @returns 结果
   */
  updateProject(params: Project): Promise<boolean>;
}

/**
 * 项目服务实现
 */
export const projectService: IDesignService = {
  /**
   * 获取项目列表
   * @param pageParams 分页参数
   * @param searchParams 参数
   * @returns 结果
   */
  getProjectList(searchParams?: ProjectSearchParams): Promise<Project[]> {
    const response = HttpRequest.post<Project[]>(
      {
        url: DesignApi.getProjectList,
        data: searchParams,
      },
      {
        successMessageMode: "none",
      }
    );
    return response;
  },
  /**
   * 新增项目
   * @param params 项目信息
   */
  addProject(params: Project): Promise<boolean> {
    const response = HttpRequest.post({
      url: DesignApi.addProject,
      data: params,
    });
    return response;
  },

  /**
   * 更新项目
   * @param params 项目信息
   * @returns 结果
   */
  updateProject(params: Project): Promise<boolean> {
    const response = HttpRequest.post({
      url: DesignApi.updateProject,
      data: params,
    });
    return response;
  },
};
