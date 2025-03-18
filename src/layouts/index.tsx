import { Layout } from 'antd';
import type React from 'react';
import LeftMenu from './LeftMenu';
import Header from './Header';
import Content from './Content';
import ScreenLock from '@/components/ScreenLock';

/**
 * 系统整体布局
 */
const Layouts: React.FC = () => {
  return (
    <>
      <Layout className='h-full'>
        {/* 左边菜单区域 */}
        <LeftMenu />
        <Layout>
          {/* 顶部区域 */}
          <Header />
          {/* 中间主内容区域 */}
          <Content />
        </Layout>
      </Layout>
      {/* 锁屏区域 */}
      <ScreenLock />
    </>
  );
};
export default Layouts;
