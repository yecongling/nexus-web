// ... 已有代码 ...
import { useUserStore } from '@/stores/userStore';
// 假设这里有一个 refreshToken 请求函数
import { refreshTokenRequest } from '@/api/auth'; 

// 标记是否正在刷新 token
let isRefreshing = false;
// 存储等待的请求
let refreshSubscribers: ((token: string) => void)[] = [];

// ... 已有代码 ...

export const transform: AxiosTransform = {
  // ... 已有代码 ...

  /**
   * 响应错误处理(这种是针对后端服务有响应的，比如404之类的)
   * @param error
   */
  responseInterceptorsCatch: async (error: any) => {
    const userStore = useUserStore.getState();
    const config = error.config;
    const { code: responseCode } = error.response?.data ?? {};

    if (responseCode === HttpCodeEnum.RC401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // 调用 refreshToken 请求
          const newToken = await refreshTokenRequest(userStore.refreshToken);
          userStore.setToken(newToken); // 更新 token 到 store

          // 执行等待的请求
          refreshSubscribers.forEach((callback) => callback(newToken));
          refreshSubscribers = [];

          // 重新发起原请求
          return axios({
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${newToken}`,
            },
          });
        } catch (refreshError) {
          // 刷新 token 失败，跳转登录页
          antdUtils.modal?.confirm({
            title: '凭证失效',
            content: '当前用户身份验证凭证已过期或无效，请重新登录！',
            onOk() {
              userStore.logout();
              window.location.href = '/login';
            },
            okText: '确定',
          });
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        // 正在刷新 token，将请求添加到等待队列
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            resolve(
              axios({
                ...config,
                headers: {
                  ...config.headers,
                  Authorization: `Bearer ${token}`,
                },
              })
            );
          });
        });
      }
    }

    const err: string = error?.toString?.() ?? '';
    const result = error.response?.data ?? {};
    const { message: responseMessage } = result;
    const { code, message } = error || {};
    let errMessage: string | React.ReactNode = '';
    if (responseCode === HttpCodeEnum.RC404 && responseMessage) {
      errMessage = (
        <>
          <div>错误信息：{responseMessage}</div>
          <div>请求路径：{error.config.url}</div>
        </>
      );
    } else if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
      errMessage = '接口请求超时，请稍后重试';
    } else if (err?.includes('Network Error')) {
      errMessage = '网络异常';
    } else if (responseCode && responseMessage) {
      errMessage = responseMessage;
    }

    if (errMessage) {
      antdUtils.modal?.error({
        title: `服务异常（状态码：${responseCode || code}）`,
        content: errMessage,
        okText: '确定',
      });
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
};