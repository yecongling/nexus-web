import React from 'react';

/**
 * 路由懒加载
 * @param param0 模块名
 * @returns
 */

export const LazyLoad = (moduleName: string) => {
  //页面地址
  let URL = '';
  if (moduleName.endsWith('.tsx')) {
    URL = `/${moduleName}`;
  } else {
    URL = `/${moduleName}/index.tsx`;
  }
  //组件地址
  let Module: any;
  try {
    Module = React.lazy(() => import(`@/views${URL}`));
  } catch (error) {
    void error;
    // 如果动态加载错误就是认定为模块不存在
    Module = React.lazy(() => import('@/views/error/404'));
  }
  return <Module />;
};
