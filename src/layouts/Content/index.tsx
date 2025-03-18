import RouterBeforeEach from '@/router/RouterBeforeEach';
import { Layout } from 'antd';
import type React from 'react';

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
      <RouterBeforeEach />
    </Layout.Content>
  );
};
export default Content;
