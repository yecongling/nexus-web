import {
  BellOutlined,
  GithubOutlined,
  LockOutlined,
  MailOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Badge, Dropdown, Input, Layout, Skeleton, Space, Tooltip } from 'antd';
import React, { Suspense } from 'react';
import { memo, useState } from 'react';

import MessageBox from './component/MessageBox';
import FullScreen from './component/FullScreen';
import BreadcrumbNav from './component/BreadcrumbNav';
import UserDropdown from './component/UserDropdown';
import { usePreferencesStore } from '@/stores/store';

const Setting = React.lazy(() => import('./component/Setting'));

/**
 * 顶部布局内容
 */
const Header: React.FC = memo(() => {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  // 从全局状态中获取配置是否开启面包屑、图标
  const { preferences, updatePreferences } = usePreferencesStore();
  const { breadcrumb } = preferences;

  /**
   * 跳转到github
   */
  const routeGitHub = () => {
    window.open('https://github.com/yecongling/fusion-flex', '_blank');
  };

  /**
   * 检索菜单
   * @param name 菜单名
   */
  const searchMenu = (name: string) => {
    console.log(name);
  };

  return (
    <>
      <Layout.Header
        className="ant-layout-header flex"
        style={{
          borderBottom: ' 1px solid #e9edf0',
        }}
      >
        {/* 面包屑 */}
        {breadcrumb.enable && <BreadcrumbNav />}
        <Space
          size="large"
          className="flex flex-1 justify-end items-center toolbox"
        >
          <Input
            variant="filled"
            placeholder="输入内容查询"
            suffix={
              <SearchOutlined style={{ cursor: 'pointer', fontSize: '18px' }} />
            }
            onChange={(e) => searchMenu(e.target.value)}
          />
          <Tooltip placement="bottom" title="github">
            <GithubOutlined
              style={{ cursor: 'pointer', fontSize: '18px' }}
              onClick={routeGitHub}
            />
          </Tooltip>
          <Tooltip placement="bottom" title="锁屏">
            <LockOutlined
              style={{ cursor: 'pointer', fontSize: '18px' }}
              onClick={() => {
                updatePreferences('widget', 'lockScreenStatus', true);
              }}
            />
          </Tooltip>
          {/* 邮件 */}
          <Badge count={5}>
            <MailOutlined style={{ cursor: 'pointer', fontSize: '18px' }} />
          </Badge>
          <Dropdown
            placement="bottomRight"
            popupRender={() => <MessageBox />}
          >
            <Badge count={5}>
              <BellOutlined style={{ cursor: 'pointer', fontSize: '18px' }} />
            </Badge>
          </Dropdown>
          <Tooltip placement="bottomRight" title="系统设置">
            <SettingOutlined
              style={{ cursor: 'pointer', fontSize: '18px' }}
              onClick={() => setOpenSetting(true)}
            />
          </Tooltip>
          <FullScreen />
          {/* 用户信息 */}
          <UserDropdown />
        </Space>
      </Layout.Header>
      {/* 系统设置界面 */}
      <Suspense fallback={<Skeleton />}>
        <Setting open={openSetting} setOpen={setOpenSetting} />
      </Suspense>
    </>
  );
});
export default Header;
