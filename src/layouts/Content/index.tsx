import AuthRouter from '@/router/AuthRouter';
import { Layout } from 'antd';
import type React from 'react';
import { Outlet } from 'react-router';

/**
 * 中间主内容区域
 * @returns
 */
const Content: React.FC = () => {
  return (
    <Layout.Content
      className="flex flex-col"
      style={{
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '8px',
      }}
    >
      <AuthRouter>
        <Outlet />
      </AuthRouter>
    </Layout.Content>
  );
};
export default Content;
