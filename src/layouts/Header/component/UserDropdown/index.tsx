import { App, Avatar, Divider, Dropdown, theme, type MenuProps } from 'antd';
import avatar from '@/assets/images/avatar.png';
import { useNavigate } from 'react-router';
import {
  ExclamationCircleOutlined,
  FileMarkdownOutlined,
  LockOutlined,
  LogoutOutlined,
  QuestionCircleFilled,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';
import React from 'react';
import { usePreferencesStore } from '@/stores/store';
import { commonService } from '@/api/common';

const { useToken } = theme;

/**
 * 用户信息下拉框
 * @returns
 */
const UserDropdown: React.FC = () => {
  const { updatePreferences } = usePreferencesStore();
  const { token } = useToken();
  const { modal } = App.useApp();

  const navigate = useNavigate();

  // 菜单栏
  const items: MenuProps['items'] = [
    {
      key: 'doc',
      label: '文档',
      icon: <FileMarkdownOutlined />,
    },
    {
      key: '1',
      label: '个人中心',
      icon: <UserOutlined />,
      disabled: false,
      onClick: () => {
        // 个人中心做成一个弹窗，内部可以修改
      },
    },
    {
      key: 'help',
      label: '问题 & 帮助',
      icon: <QuestionCircleFilled />,
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: '刷新缓存',
      icon: <SyncOutlined />,
      onClick: () => {
        // 后端的缓存信息（相当于把缓存数据刷新）
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'lock',
      label: '锁屏',
      icon: <LockOutlined />,
      onClick: () => {
        updatePreferences('widget', 'lockScreenStatus', true);
      },
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: '退出登录',
      icon: <LogoutOutlined />,
      disabled: false,
      danger: true,
      onClick: () => {
        modal.confirm({
          title: '退出登录',
          icon: <ExclamationCircleOutlined />,
          content: '确认退出登录吗？',
          okText: '确认',
          onOk: () => {
            const token = localStorage.getItem('token');

            // 清除后端的信息
            commonService.logout(token as string).then((res: boolean) => {
              if (res) {
                // 清空token
                localStorage.removeItem('token');
                localStorage.removeItem('roleId');
                localStorage.removeItem('isLogin');
                localStorage.removeItem('loginUser');

                // 修改回document.title
                document.title = 'fusion - 登录';
                // 退出到登录页面
                navigate('/login');
              }
            });
          },
          cancelText: '取消',
        });
      },
    },
  ];

  /**
   * 内容样式
   */
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  /**
   * 自定义渲染
   * @param menus 菜单
   * @returns
   */
  const renderDropdown = (menus: ReactNode) => {
    return (
      <div className="dropdownContent" style={contentStyle}>
        <div className="avatar flex items-center p-3">
          <Avatar size="large" src={avatar} />
        </div>
        <Divider style={{ margin: '2px 0' }} />
        {React.cloneElement(menus as React.ReactElement, {
          style: { boxShadow: 'none' },
        })}
      </div>
    );
  };

  return (
    <>
      <Dropdown
        menu={{ items }}
        dropdownRender={renderDropdown}
        placement="bottomLeft"
        overlayStyle={{ width: 240 }}
      >
        <div className="login-user flex items-center cursor-pointer justify-between h-[50] transition-all duration-300">
          <Avatar size="default" src={avatar} />
          <span style={{ margin: '0 0 0 6px' }}>
            {sessionStorage.getItem('loginUser') || 'username'}
          </span>
        </div>
      </Dropdown>
    </>
  );
};

export default UserDropdown;
