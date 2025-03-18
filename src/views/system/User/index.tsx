import useParentSize from '@/hooks/useParentSize';
import { userService } from '@/api/system/user/userApi';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  LockOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Space, Table, Upload, message, Modal } from 'antd';
import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { UserSearchParams } from './types';
import { getColumns } from './columns';
import SearchForm from './SearchForm';
import UserInfoModal from './UserInfoModal';
import type { UserModel } from '@/api/system/user/userModel';

const { confirm } = Modal;

/**
 * 用户管理
 * @returns
 */
const User: React.FC = () => {
  // 编辑窗口的打开状态
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  // 表格数据
  const [tableData, setTableData] = useState<UserModel[]>([]);
  // 当前编辑的行数据
  const [currentRow, setCurrentRow] = useState<Partial<UserModel> | null>(null);
  // 表格加载状态
  const [loading, setLoading] = useState<boolean>(false);
  // 当前选中的行数据
  const [selectedRows, setSelectedRows] = useState<UserModel[]>([]);
  // 数据总条数
  const [total, setTotal] = useState<number>(0);
  // 容器高度计算（表格）
  const { parentRef, height } = useParentSize();
  // 分页参数
  const [pagination, setPagination] = useState<{
    pageNum: number;
    pageSize: number;
  }>({
    pageNum: 1,
    pageSize: 20,
  });

  // 查询用户数据
  const getUserList = useCallback(
    async (params: UserSearchParams) => {
      try {
        setLoading(true);
        const res = await userService.queryUsers({ ...pagination, ...params });
        setTableData(res.data);
        setTotal(res.total || 0);
      } finally {
        setLoading(false);
      }
    },
    [pagination],
  );

  // 首次加载和分页变化时获取数据
  useEffect(() => {
    getUserList({} as UserSearchParams);
  }, [getUserList]);

  // 处理搜索
  const handleSearch = (values: UserSearchParams) => {
    setPagination((prev) => ({ ...prev, pageNum: 1 }));
    getUserList(values);
  };

  // 处理编辑
  const handleEdit = (record: UserModel) => {
    setCurrentRow(record);
    setOpenEditModal(true);
  };

  // 处理详情
  const handleDetail = (record: UserModel) => {
    setCurrentRow(record);
    setOpenEditModal(true);
  };

  // 处理新增
  const handleAdd = () => {
    setCurrentRow(null);
    setOpenEditModal(true);
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    try {
      await userService.deleteUser(id);
      message.success('删除成功');
      getUserList({} as UserSearchParams);
    } catch (error) {
      message.error('删除失败, 原因：' + error);
    }
  };

  // 处理批量删除
  const handleBatchDelete = () => {
    confirm({
      title: '确定要删除选中的用户吗？',
      icon: <ExclamationCircleFilled />,
      content: '此操作将永久删除选中的用户，是否继续？',
      onOk() {
        const ids = selectedRows.map((row) => row.id);
        // 调用批量删除接口
        Promise.all(ids.map((id) => userService.deleteUser(id)))
          .then(() => {
            message.success('批量删除成功');
            setSelectedRows([]);
            getUserList({} as UserSearchParams);
          })
          .catch(() => {
            message.error('批量删除失败');
          });
      },
    });
  };

  // 处理用户状态更新
  const handleStatusChange = async (record: UserModel) => {
    try {
      await userService.updateUserStatus(
        record.id,
        record.status === 1 ? 0 : 1,
      );
      message.success('状态更新成功');
      getUserList({} as UserSearchParams);
    } catch (error) {
      message.error('状态更新失败' + error);
    }
  };

  // 处理表单提交
  const handleModalOk = async (values: Partial<UserModel>) => {
    try {
      if (currentRow?.id) {
        await userService.updateUser({ id: currentRow.id, ...values });
        message.success('更新成功');
      } else {
        await userService.createUser(values);
        message.success('创建成功');
      }
      setOpenEditModal(false);
      getUserList({} as UserSearchParams);
    } catch (error) {
      message.error((currentRow?.id ? '更新失败' : '创建失败')  + error);
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
            confirm({
              title: '删除用户',
              icon: <ExclamationCircleFilled />,
              content: '确定删除该用户吗？数据删除后将无法恢复！',
              onOk() {
                handleDelete(record.id);
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
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增
          </Button>
          <Upload
            accept=".xlsx"
            showUploadList={false}
            action="/api/user/import"
            onChange={(info) => {
              if (info.file.status === 'done') {
                message.success('导入成功');
                getUserList({} as UserSearchParams);
              } else if (info.file.status === 'error') {
                message.error('导入失败');
              }
            }}
          >
            <Button icon={<PlusOutlined />}>批量导入</Button>
          </Upload>
          <Button
            danger
            icon={<DeleteOutlined />}
            disabled={selectedRows.length === 0}
            onClick={handleBatchDelete}
          >
            批量删除
          </Button>
        </Space>

        {/* 表格数据 */}
        <Table
          size="small"
          style={{ marginTop: '8px' }}
          bordered
          pagination={{
            pageSize: pagination.pageSize,
            current: pagination.pageNum,
            showQuickJumper: true,
            hideOnSinglePage: false,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            total: total,
            onChange(page, pageSize) {
              setPagination({
                pageNum: page,
                pageSize: pageSize,
              });
            },
          }}
          dataSource={tableData}
          columns={columns}
          loading={loading}
          rowKey="id"
          scroll={{ y: height - 128, x: 'max-content' }}
          rowSelection={{
            onChange: (_selectedRowKeys, selectedRows) => {
              setSelectedRows(selectedRows);
            },
            columnWidth: 32,
            fixed: true,
          }}
        />
      </Card>

      {/* 编辑弹窗 */}
      <UserInfoModal
        visible={openEditModal}
        onOk={handleModalOk}
        onCancel={() => {
          setOpenEditModal(false);
          setCurrentRow(null);
        }}
        userInfo={currentRow}
      />
    </>
  );
};

export default User;
