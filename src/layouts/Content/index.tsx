import AuthRouter from '@/router/AuthRouter';
import { ErrorFallback } from '@/router/ErrorBoundary';
import { Layout } from 'antd';
import type React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router';

/**
 * 中间主内容区域
 * @returns
 */
const Content: React.FC = () => {
  // 错误边界加key的目的是为了每次路由切换的时候都重新渲染错误边界，避免切换到新的路由的时候不会重新渲染
  const location = useLocation();
  return (
    <Layout.Content
      className="flex flex-col"
      style={{
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '8px',
      }}
    >
      <ErrorBoundary key={location.pathname} fallback={<ErrorFallback />}>
        <AuthRouter>
          <Outlet />
        </AuthRouter>
      </ErrorBoundary>
    </Layout.Content>
  );
};
export default Content;
