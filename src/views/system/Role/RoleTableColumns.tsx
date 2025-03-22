import type { TableProps } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  MoreOutlined,
} from '@ant-design/icons';
import { Tag, Space, Button, Dropdown, App } from 'antd';
import { useCallback } from 'react';
import type { RoleState } from './api/type';
import type { UseMutationResult } from '@tanstack/react-query';

interface RoleTableColumnsProps {
  dispatch: React.Dispatch<Partial<RoleState>>;
  logicDeleteUserMutation: UseMutationResult<any, any, any, unknown>;
}

/**
 * 角色表格列配置
 * @param props 参数
 * @returns 表格列配置
 */
const getRoleTableColumns = ({
  dispatch,
  logicDeleteUserMutation,
}: RoleTableColumnsProps): TableProps['columns'] => {
  const { modal } = App.useApp();

  // 更多操作
  const more = useCallback(
    (row: any) => [
      {
        key: 'edit',
        label: '编辑',
        icon: <EditOutlined className="text-orange-400" />,
        onClick: () => {
          dispatch({
            openEditModal: true,
            currentRow: row,
            action: 'edit',
          });
        },
      },
      {
        key: 'delete',
        label: '删除',
        icon: <DeleteOutlined className="text-red-400" />,
        onClick: () => {
          modal.confirm({
            title: '删除角色',
            icon: <ExclamationCircleFilled />,
            content: '确定删除该角色吗？数据删除后将无法恢复！',
            onOk() {
              logicDeleteUserMutation.mutate([row.id]);
            },
          });
        },
      },
    ],
    [],
  );

  /**
   * 表格列配置
   */
  const columns: TableProps['columns'] = [
    {
      title: '编码',
      width: 160,
      dataIndex: 'roleCode',
      key: 'roleCode',
    },
    {
      title: '名称',
      width: 160,
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '类型',
      width: 120,
      dataIndex: 'roleType',
      key: 'roleType',
      align: 'center',
      render(value) {
        switch (value) {
          case 0:
            return '系统角色';
          case 1:
            return '普通角色';
          default:
            return '';
        }
      },
    },
    {
      title: '状态',
      width: 80,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render(value) {
        return value ? (
          <Tag color="success">启用</Tag>
        ) : (
          <Tag color="error">停用</Tag>
        );
      },
    },
    {
      title: '描述',
      width: 160,
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      width: '14%',
      dataIndex: 'action',
      fixed: 'right',
      align: 'center',
      render(_, record) {
        return (
          <Space size={0}>
            <Button
              type="link"
              size="small"
              onClick={() => {
                dispatch({
                  openEditModal: true,
                  currentRow: record,
                  action: 'view',
                });
              }}
            >
              详情
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                dispatch({
                  openEditModal: false,
                  currentRow: record,
                  action: 'user',
                  openRoleUserModal: true,
                });
              }}
            >
              用户
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                dispatch({
                  openEditModal: false,
                  currentRow: record,
                  action: 'auth',
                  openRoleMenuModal: true,
                });
              }}
            >
              授权菜单
            </Button>
            <Dropdown
              menu={{ items: more(record) }}
              placement="bottom"
              trigger={['click']}
            >
              <Button type="link" size="small" icon={<MoreOutlined />} />
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return columns;
};

export default getRoleTableColumns;
