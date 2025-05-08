import { Spin, App as AntdApp, Skeleton } from 'antd';
import type React from 'react';
import { Suspense, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Router } from '@/router/router';
import { antdUtils } from '@/utils/antdUtil';
import { useMenuStore } from './stores/store';
import { useQuery } from '@tanstack/react-query';
import { commonService } from '@/services/common';
import { useUserStore } from './stores/userStore';

/**
 * 主应用
 */
const App: React.FC = () => {
  const { setMenus } = useMenuStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { role = '', isLogin } = useUserStore();
  const { notification, message, modal } = AntdApp.useApp();

  // 使用 TanStack Query 获取菜单数据
  const { isLoading, refetch } = useQuery({
    queryKey: ['menuData'],
    queryFn: async () => {
      const menu = await commonService.getMenuListByRoleId(role);
      setMenus(menu);
      return menu;
    },
    enabled: false,
  });

  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);

    if (!isLogin || location.pathname === '/login') {
      navigate('/login');
    } else {
      // 查询菜单数据
      refetch();
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
