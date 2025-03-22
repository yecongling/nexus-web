import useParentSize from '@/hooks/useParentSize';
import { userService } from './api/userApi';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  LockOutlined,
} from '@ant-design/icons';
import { Card, Table, App } from 'antd';
import type React from 'react';
import { useMemo, useReducer, useState } from 'react';
import type { UserSearchParams } from './types';
import { getColumns } from './columns';
import SearchForm from './SearchForm';
import UserInfoModal from './UserInfoModal';
import type { UserModel } from './api/type';
import { useMutation, useQuery } from '@tanstack/react-query';
import TableActionButtons from './TableActionButtons';

/**
 * 用户管理
 */
const User: React.FC = () => {
  const { message, modal } = App.useApp();
  // 合并状态
  const [state, dispatch] = useReducer(
    (prev: any, action: any) => ({
      ...prev,
      ...action,
    }),
    {
      // 编辑窗口的打开状态
      openEditModal: false,
      // 当前编辑的行数据
      currentRow: null,
      // 当前选中的行数据
      selectedRows: [],
      // 当前操作
      action: '',
    },
  );

  // 容器高度计算（表格）
  const { parentRef, height } = useParentSize();

  // 查询参数（包含分页参数）
  const [searchParams, setSearchParams] = useState<UserSearchParams>({
    pageNum: 1,
    pageSize: 20,
  });

  // 查询用户数据
  const {
    isLoading,
    data: result,
    refetch,
  } = useQuery({
    queryKey: ['sys_users', searchParams],
    queryFn: () => userService.queryUsers({ ...searchParams }),
  });

  // 处理删除数据
  const logicDeleteUserMutation = useMutation({
    mutationFn: (ids: string[]) => userService.logicDeleteUsers(ids),
    onSuccess: () => {
      message.success('删除成功!');
      dispatch({
        selectedRows: [],
      });
      refetch();
    },
    onError: (error) => {
      message.error(`删除失败, 原因：${error.message}`);
    },
  });

  // 处理搜索
  const handleSearch = (values: UserSearchParams) => {
    const search = {
      ...values,
      pageNum: searchParams.pageNum,
      pageSize: searchParams.pageSize,
    };
    // 判断参数是否发生变化
    if (JSON.stringify(search) === JSON.stringify(searchParams)) {
      // 参数没有变化，手动刷新数据
      refetch();
      return;
    }
    setSearchParams((prev) => ({ ...prev, ...search }));
  };

  // 处理编辑
  const handleEdit = (record: UserModel) => {
    dispatch({
      openEditModal: true,
      currentRow: record,
      action: 'edit',
    });
  };

  // 处理详情
  const handleDetail = (record: UserModel) => {
    dispatch({
      openEditModal: true,
      currentRow: record,
      action: 'view',
    });
  };

  // 处理新增
  const handleAdd = () => {
    dispatch({
      openEditModal: true,
      currentRow: null,
      action: 'add',
    });
  };

  // 处理批量删除
  const handleBatchDelete = () => {
    modal.confirm({
      title: '确定要删除选中的用户吗？',
      icon: <ExclamationCircleFilled />,
      content: '此操作将删除选中的用户，删除后可在回收站中进行恢复，是否继续？',
      onOk() {
        const ids = state.selectedRows.map((row: Partial<UserModel>) => row.id);
        // 调用批量删除接口(逻辑删除)
        logicDeleteUserMutation.mutate(ids);
      },
    });
  };

  // 处理用户状态更新
  const handleStatusChange = async (record: UserModel) => {
    userService
      .updateBatchUserStatus([record.id], record.status === 1 ? 0 : 1)
      .then(() => {
        message.success('状态更新成功');
        refetch();
      })
      .catch((error: Error) => {
        message.error(`状态更新失败,${error.message}`);
      });
  };

  // 处理表单提交
  const handleModalOk = async (values: Partial<UserModel>) => {
    try {
      if (state.currentRow?.id) {
        await userService.updateUser({ id: state.currentRow.id, ...values });
        message.success('更新成功');
      } else {
        await userService.createUser(values);
        message.success('创建成功');
      }
      dispatch({
        openEditModal: false,
      });
      refetch();
    } catch (error) {
      message.error((state.currentRow?.id ? '更新失败' : '创建失败') + error);
    }
  };

  // 表格列配置
  const columns = useMemo(
    () =>
      getColumns(handleEdit, handleDetail, (record) => [
        {
          key: 'updatePwd',
          label: '修改密码',
          icon: <EditOutlined className="text-orange-400!" />,
          onClick: () => {
            /* 实现修改密码逻辑 */
          },
        },
        {
          key: 'freeze',
          label: record.status === 1 ? '冻结' : '解冻',
          icon: <LockOutlined className="text-orange-400!" />,
          onClick: () => handleStatusChange(record),
        },
        {
          key: 'delete',
          label: '删除',
          icon: <DeleteOutlined className="text-red-400!" />,
          onClick: () => {
            modal.confirm({
              title: '删除用户',
              icon: <ExclamationCircleFilled />,
              content: '确定删除该用户吗？数据删除后请在回收站中恢复！',
              onOk() {
                logicDeleteUserMutation.mutate([record.id]);
              },
            });
          },
        },
      ]),
    [],
  );

  return (
    <>
      {/* 搜索表单 */}
      <SearchForm onSearch={handleSearch} />

      {/* 查询表格 */}
      <Card
        style={{ flex: 1, marginTop: '8px', minHeight: 0 }}
        styles={{ body: { height: '100%' } }}
        ref={parentRef}
      >
        {/* 操作按钮 */}
        <TableActionButtons
          handleAdd={handleAdd}
          handleBatchDelete={handleBatchDelete}
          refetch={refetch}
          selectedRows={state.selectedRows}
        />

        {/* 表格数据 */}
        <Table
          size="small"
          style={{ marginTop: '8px' }}
          bordered
          pagination={{
            pageSize: searchParams.pageSize,
            current: searchParams.pageNum,
            showQuickJumper: true,
            hideOnSinglePage: false,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            total: result?.total || 0,
            onChange(page, pageSize) {
              setSearchParams({
                ...searchParams,
                pageNum: page,
                pageSize: pageSize,
              });
            },
          }}
          dataSource={result?.data || []}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          scroll={{ y: height - 128, x: 'max-content' }}
          rowSelection={{
            onChange: (_selectedRowKeys, selectedRows) => {
              dispatch({
                selectedRows: selectedRows,
              });
            },
            columnWidth: 32,
            fixed: true,
          }}
        />
      </Card>

      {/* 编辑弹窗 */}
      <UserInfoModal
        visible={state.openEditModal}
        onOk={handleModalOk}
        onCancel={() => {
          dispatch({
            openEditModal: false,
            currentRow: null,
          });
        }}
        userInfo={state.currentRow}
        action={state.action}
      />
    </>
  );
};

export default User;
