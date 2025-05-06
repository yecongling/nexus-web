import useParentSize from '@/hooks/useParentSize';
import { App, Card, type TableProps } from 'antd';
import type React from 'react';
import { useReducer, useState } from 'react';
import RoleInfoModal from './RoleInfoModal';
import RoleMenuDrawer from './AssignRoleMenuDrawer';
import RoleUserDrawer from './AssignRoleUserDrawer';
import RoleSearchForm from './RoleSearchForm';
import RoleActionButtons from './RoleActionButtons';
import RoleTable from './RoleTable';
import getRoleTableColumns from './RoleTableColumns';
import type { RoleSearchParams, RoleState } from '@/services/system/role/type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { roleService } from '@/services/system/role/roleApi';
import { isEqual } from 'lodash-es';

/**
 * 系统角色维护
 * @returns
 */
const Role: React.FC = () => {
  const { modal, message } = App.useApp();
  // 容器高度计算（表格）
  const { parentRef, height } = useParentSize();

  // 定义状态（合并的状态）
  const [state, dispatch] = useReducer(
    (prev: RoleState, action: Partial<RoleState>) => ({
      ...prev,
      ...action,
    }),
    {
      // 编辑窗口的打开状态
      openEditModal: false,
      // 角色用户分配窗口的打开状态
      openRoleUserModal: false,
      // 角色菜单分配窗口的打开状态
      openRoleMenuModal: false,
      // 当前编辑的行数据
      currentRow: null,
      // 当前选中的行数据
      selectedRows: [],
      // 当前操作
      action: '',
    },
  );

  // 查询参数（包含分页参数）
  const [searchParams, setSearchParams] = useState<RoleSearchParams>({
    pageNum: 1,
    pageSize: 20,
  });

  // 查询表格数据
  const {
    isLoading,
    data: tableData,
    refetch,
  } = useQuery({
    queryKey: ['sys_roles', searchParams],
    queryFn: () => roleService.getRoleList({ ...searchParams }),
  });

  // 处理检索
  const handleSearch = (values: RoleSearchParams) => {
    const search = {
      ...values,
      pageNum: searchParams.pageNum,
      pageSize: searchParams.pageSize,
    };
    if (isEqual(search, searchParams)) {
      // 参数没有变化，手动刷新数据
      refetch();
      return;
    }
    setSearchParams((prev: RoleSearchParams) => ({ ...prev, ...search }));
  };

  // 处理逻辑删除角色
  const logicDeleteUserMutation = useMutation({
    mutationFn: (ids: string[]) => roleService.deleteBatchRole(ids),
    onSuccess() {
      message.success('删除成功!');
      dispatch({
        selectedRows: [],
      });
      refetch();
    },
    onError(error) {
      modal.error({
        title: '操作失败',
        content: `原因：${error}`,
      });
    },
  });

  /**
   * 多行选中的配置
   */
  const rowSelection: TableProps['rowSelection'] = {
    // 行选中的回调
    onChange(_selectedRowKeys, selectedRows) {
      dispatch({
        selectedRows,
      });
    },
    columnWidth: 32,
    fixed: true,
  };

  /**
   * 表格行双击显示预览
   */
  const onRow = (record: any) => {
    return {
      onDoubleClick: () => {
        dispatch({
          openEditModal: true,
          currentRow: record,
          action: 'view',
        });
      },
    };
  };

  /**
   * 新增角色
   */
  const onAddRoleClick = () => {
    dispatch({
      openEditModal: true,
      currentRow: null,
      action: 'add',
    });
  };

  /**
   * 取消
   */
  const onCancel = () => {
    dispatch({
      openEditModal: false,
      currentRow: null,
      action: 'cancel',
    });
  };

  /**
   * 隐藏抽屉
   */
  const hideDrawer = () => {
    dispatch({
      openRoleUserModal: false,
      openRoleMenuModal: false,
    });
  };

  /**
   * 点击确定的回调
   * @param roleData 角色数据
   */
  const onEditOk = async (roleData: Record<string, any>) => {
    try {
      if (state.currentRow == null) {
        // 新增数据
        await roleService.addRole(roleData);
      } else {
        // 编辑数据
        await roleService.editRole(roleData);
      }
      // 操作成功，关闭弹窗，刷新数据
      dispatch({
        openEditModal: false,
        currentRow: null,
        action: 'ok',
      });
      refetch();
    } catch (error) {
      modal.error({
        title: '操作失败',
        content: `原因：${error}`,
      });
    }
  };

  /**
   * 获取表格列配置
   */
  const columns = getRoleTableColumns({
    dispatch,
    logicDeleteUserMutation,
  });

  return (
    <>
      {/* 菜单检索条件栏 */}
      <RoleSearchForm onFinish={handleSearch} />
      {/* 查询表格 */}
      <Card
        style={{ flex: 1, marginTop: '8px' }}
        styles={{ body: { height: '100%' } }}
        ref={parentRef}
      >
        {/* 操作按钮 */}
        <RoleActionButtons
          onAddRoleClick={onAddRoleClick}
          selRows={state.selectedRows}
          logicDeleteUserMutation={logicDeleteUserMutation}
        />
        {/* 表格数据 */}
        <RoleTable
          tableData={tableData?.data || []}
          loading={isLoading}
          columns={columns}
          onRow={onRow}
          rowSelection={rowSelection}
          height={height}
          pagination={{
            pageSize: searchParams.pageSize,
            current: searchParams.pageNum,
            showQuickJumper: true,
            hideOnSinglePage: false,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            total: tableData?.total || 0,
            onChange(page, pageSize) {
              setSearchParams({
                ...searchParams,
                pageNum: page,
                pageSize: pageSize,
              });
            },
          }}
        />
      </Card>

      {/* 编辑弹窗 */}
      <RoleInfoModal params={state} onCancel={onCancel} onOk={onEditOk} />
      {/* 权限分配抽屉 */}
      <RoleMenuDrawer
        roleId={state.currentRow?.id}
        onOk={hideDrawer}
        open={state.openRoleMenuModal}
        onCancel={hideDrawer}
      />
      {/* 用户分配抽屉 */}
      <RoleUserDrawer
        roleId={state.currentRow?.id}
        onCancel={hideDrawer}
        open={state.openRoleUserModal}
      />
    </>
  );
};

export default Role;
