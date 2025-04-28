import { HttpRequest } from '@/utils/request';
import type { Response } from '@/types/global';

/**
 * 枚举登录需要的接口地址
 */
export enum LoginApi {
  /**
   * 登录
   */
  login = '/login',
  /**
   * 获取验证码
   */
  getCode = '/getCaptcha',
}

/**
 * 登录服务接口
 */
interface ILoginService {
  /**
   * 登录
   * @param params 登录参数
   * @returns 登录结果
   */
  login(params: any): Promise<Response>;

  /**
   * 获取验证码
   * @returns 验证码
   */
  getCaptcha(): Promise<{ key: string; code: any }>;

}

/**
 * 登录服务实现
 */
export const loginService: ILoginService = {
  /**
   * 登录
   * @param params 登录参数
   * @returns 登录结果
   */
  login(params: any): Promise<Response> {
    return HttpRequest.post<Response>(
      {
        url: LoginApi.login,
        data: params,
      },
      { isTransformResponse: false },
    );
  },
  
  /**
   * 获取验证码
   * @param checkKey 验证码key
   * @returns 验证码
   */
  async getCaptcha(): Promise<{ key: string; code: any }> {
    const key = new Date().getTime().toString();
    const code = await HttpRequest.get(
      {
        url: `${LoginApi.getCode}/${key}`,
      },
      {
        successMessageMode: 'none',
      },
    );
    return { key, code };
  },
};
