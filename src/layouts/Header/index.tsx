import {
  BellOutlined,
  GithubOutlined,
  LockOutlined,
  MailOutlined,
  SearchOutlined,
  SettingOutlined,
  SwitcherOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Dropdown,
  Input,
  Layout,
  type MenuProps,
  Skeleton,
  Space,
  Tooltip,
} from 'antd';
import React, { Suspense } from 'react';
import { memo, useState } from 'react';

import MessageBox from './component/MessageBox';
import FullScreen from './component/FullScreen';
import BreadcrumbNav from './component/BreadcrumbNav';
import UserDropdown from './component/UserDropdown';
import { usePreferencesStore } from '@/stores/store';
import { useTranslation } from 'react-i18next';
import { languages } from '@/locales/language';
import { changeLanguage } from '@/locales/i18next-config';

const Setting = React.lazy(() => import('./component/Setting'));

/**
 * 顶部布局内容
 */
const Header: React.FC = memo(() => {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  // 从全局状态中获取配置是否开启面包屑、图标
  const { preferences, updatePreferences } = usePreferencesStore();
  const { breadcrumb } = preferences;
  const { t } = useTranslation();

  /**
   * 跳转到github
   */
  const routeGitHub = () => {
    window.open('https://github.com/yecongling/fusion-flex', '_blank');
  };

  /**
   * 下拉语言选项
   */
  const menuItems: MenuProps['items'] = languages.map((item: any) => ({
    key: item.value,
    label: item.name,
    onClick: () => changeLocale(item.value),
  }));

  /**
   * 检索菜单
   * @param name 菜单名
   */
  const searchMenu = (name: string) => {
    console.log(name);
  };

  /**
   * 切换语言
   * @param locale 语言
   */
  const changeLocale = (locale: string) => {
    updatePreferences('app', 'locale', locale);
    changeLanguage(locale);
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
            placeholder={t('common.operation.search')}
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
          <Tooltip placement="bottom" title={t('layout.header.lock')}>
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
          <Dropdown placement="bottomRight" popupRender={() => <MessageBox />}>
            <Badge count={5}>
              <BellOutlined style={{ cursor: 'pointer', fontSize: '18px' }} />
            </Badge>
          </Dropdown>
          <Tooltip placement="bottomRight" title={t('layout.header.setting')}>
            <SettingOutlined
              style={{ cursor: 'pointer', fontSize: '18px' }}
              onClick={() => setOpenSetting(true)}
            />
          </Tooltip>
          <Dropdown menu={{ items: menuItems }}>
            <SwitcherOutlined style={{ cursor: 'pointer', fontSize: '18px' }} />
          </Dropdown>
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
