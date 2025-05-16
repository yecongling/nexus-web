import { HttpRequest } from '@/utils/request';
import type { App, AppSearchParams } from './types';

/**
 * 项目相关接口
 */
const AppsApi: Record<string, string> = {
  /**
   * 获取项目列表
   */
  getApps: '/engine/apps/getApps',
  /**
   * 新增项目
   */
  addApp: '/engine/apps/addApp',

  /**
   * 更新项目
   */
  updateApp: '/engine/apps/updateApp',
};

/**
 * 项目服务接口
 */
export interface IAppsService {
  /**
   * 获取项目列表
   */
  getApps(searchParams: AppSearchParams): Promise<Record<string, any>>;

  /**
   * 新增项目
   */
  addApp(app: Partial<App>): Promise<boolean>;
  /**
   * 更新项目
   */
  updateApp(app: Partial<App>): Promise<boolean>;
}

/**
 * 项目服务实现
 */
export const appsService: IAppsService = {
  /**
   * 获取项目列表
   */
  async getApps(searchParams: AppSearchParams): Promise<Record<string, any>> {
    const response = await HttpRequest.get(
      {
        url: AppsApi.getApps,
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
  async addApp(app: Partial<App>): Promise<boolean> {
    const response = await HttpRequest.post({
      url: AppsApi.addApp,
      data: app,
    });
    return response;
  },
  /**
   * 更新项目
   */
  async updateApp(app: Partial<App>): Promise<boolean> {
    const response = await HttpRequest.post({
      url: AppsApi.updateApp,
      data: app,
    });
    return response;
  },
};
