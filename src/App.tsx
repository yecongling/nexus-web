import { Spin, App as AntdApp, Skeleton } from 'antd';
import type React from 'react';
import { Suspense, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Router } from '@/router/router';
import { antdUtils } from '@/utils/antdUtil';
import { useMenuStore } from './stores/store';
import { useQuery } from '@tanstack/react-query';
import { commonService } from '@/api/common/common';

/**
 * 主应用
 */
const App: React.FC = () => {
  const { setMenus } = useMenuStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { notification, message, modal } = AntdApp.useApp();

  // 使用 TanStack Query 获取菜单数据
  const { isLoading, isError, error } = useQuery({
    queryKey: ['menuData'],
    queryFn: async () => {
      const roleId = sessionStorage.getItem('roleId') || '';
      const menu = await commonService.getMenuListByRoleId(roleId);
      setMenus(menu);
      return menu;
    },
    // 未登录的情况下不启用菜单的查询操作
    enabled() {
      const isLogin = sessionStorage.getItem('isLogin');
      if (isLogin === 'false' ||!isLogin || location.pathname === '/login') {
        return false;
      }
      return true;
    },
  });

  useEffect(() => {
    if (isError) {
      notification.error({
        message: '菜单加载失败',
        description: `原因：${error.message || '未知错误'}`,
        duration: 0,
      });
    }
  }, [isError, error]);

  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);

    const isLogin = sessionStorage.getItem('isLogin');
    if (isLogin === 'false' || !isLogin || location.pathname === '/login') {
      navigate('/login');
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Spin size="large" fullscreen style={{ fontSize: 48 }} />
      ) : (
        <Suspense fallback={<Skeleton />}>
          <Router />
        </Suspense>
      )}
    </>
  );
};
export default App;
