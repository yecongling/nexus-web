import useParentSize from '@/hooks/useParentSize';
import { App, Card, type TableProps } from 'antd';
import type React from 'react';
import { useEffect, useState } from 'react';
import {
  addRole,
  deleteRole,
  editRole,
  getRoleList,
} from '@/api/system/role/roleApi';
import RoleInfoModal from './RoleInfoModal';
import RoleMenuDrawer from './RoleMenuDrawer';
import RoleUserDrawer from './RoleUserDrawer';
import RoleSearchForm from './RoleSearchForm';
import RoleActionButtons from './RoleActionButtons';
import RoleTable from './RoleTable';
import getRoleTableColumns from './RoleTableColumns';
import type { RoleSearchParams } from './api/roleModel';

/**
 * 系统角色维护
 * @returns
 */
const Role: React.FC = () => {
  const { modal } = App.useApp();
  // 容器高度计算（表格）
  const { parentRef, height } = useParentSize();

  // 表格数据
  const [tableData, setTableData] = useState<any[]>([]);
  // 表格加载状态
  const [loading, setLoading] = useState<boolean>(false);
  // 当前选中的行数据
  const [selRows, setSelectedRows] = useState<any[]>([]);

  // 将当前编辑行和窗口开关合并为一个状态对象
  const [params, setParams] = useState<{
    visible: boolean;
    currentRow: any;
    view: boolean;
  }>({
    visible: false,
    currentRow: null,
    view: false,
  });

  // 抽屉窗口打开关闭
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  // 角色用户分配抽屉
  const [drawerOpenUser, setDrawerOpenUser] = useState<boolean>(false);

  useEffect(() => {
    // 查询角色数据
    queryRoleData();
  }, []);

  /**
   * 查询角色数据
   * @param params 参数
   */
  const queryRoleData = async (params?: any) => {
    setLoading(true);
    // 获取表单查询条件
    const formCon = params;
    // 拼接查询条件，没有选择的条件就不拼接
    const queryCondition: Record<string, any> = {};
    for (const item of Object.keys(formCon)) {
      if (formCon[item] || formCon[item] === '') {
        queryCondition[item] = formCon[item];
      }
    }
    // 调用查询
    getRoleList(queryCondition)
      .then((response) => {
        setTableData(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 处理检索
  const handleSearch = (values: RoleSearchParams) => {
    
  }

  // 检索表单提交
  const onFinish = (values: any) => {
    queryRoleData(values);
  };

  /**
   * 多行选中的配置
   */
  const rowSelection: TableProps['rowSelection'] = {
    // 行选中的回调
    onChange(_selectedRowKeys, selectedRows) {
      setSelectedRows(selectedRows);
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
        setParams({ visible: true, currentRow: record, view: true });
      },
    };
  };

  /**
   * 新增角色
   */
  const onAddRoleClick = () => {
    setParams({ visible: true, currentRow: null, view: false });
  };

  /**
   * 取消
   */
  const onCancel = () => {
    setParams({ visible: false, currentRow: null, view: false });
  };

  /**
   * 隐藏抽屉
   */
  const hideDrawer = () => {
    setDrawerOpen(false);
    setDrawerOpenUser(false);
  };

  /**
   * 点击确定的回调
   * @param roleData 角色数据
   */
  const onEditOk = async (roleData: Record<string, any>) => {
    try {
      if (params.currentRow == null) {
        // 新增数据
        await addRole(roleData);
      } else {
        // 编辑数据
        await editRole(roleData);
      }
      // 操作成功，关闭弹窗，刷新数据
      setParams({ visible: false, currentRow: null, view: false });
      queryRoleData();
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
    setParams,
    setDrawerOpen,
    setDrawerOpenUser,
    deleteRole,
    queryRoleData,
  });

  return (
    <>
      {/* 菜单检索条件栏 */}
      <RoleSearchForm onFinish={onFinish} />
      {/* 查询表格 */}
      <Card
        style={{ flex: 1, marginTop: '8px' }}
        styles={{ body: { height: '100%' } }}
        ref={parentRef}
      >
        {/* 操作按钮 */}
        <RoleActionButtons onAddRoleClick={onAddRoleClick} selRows={selRows} />
        {/* 表格数据 */}
        <RoleTable
          tableData={tableData}
          loading={loading}
          columns={columns}
          onRow={onRow}
          rowSelection={rowSelection}
          height={height}
        />
      </Card>

      {/* 编辑弹窗 */}
      <RoleInfoModal params={params} onCancel={onCancel} onOk={onEditOk} />
      {/* 权限分配抽屉 */}
      <RoleMenuDrawer
        roleId={params.currentRow?.id}
        onOk={hideDrawer}
        open={drawerOpen}
        onCancel={hideDrawer}
      />
      {/* 用户分配抽屉 */}
      <RoleUserDrawer
        roleId={params.currentRow?.id}
        onCancel={hideDrawer}
        open={drawerOpenUser}
      />
    </>
  );
};

export default Role;
