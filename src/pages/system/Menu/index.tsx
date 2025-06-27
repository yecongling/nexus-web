import { isEqual } from 'lodash-es';

import type React from 'react';
import { useReducer, useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { App, Button, Card, ConfigProvider, Space, type TableProps, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import { menuService } from '@/services/system/menu/menuApi';
import MenuInfoModal from './MenuInfoModal';
import './menu.scss';
import useParentSize from '@/hooks/useParentSize';
import { addIcon } from '@/utils/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SearchBar from './SearchBar';
import ActionButtons from './ActionButtons';
import DataTable from './DataTable';

/**
 * 系统菜单维护
 */
const Menu: React.FC = () => {
  const { modal } = App.useApp();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  // 合并的状态
  const [state, dispatch] = useReducer((prev: any, action: any) => ({ ...prev, ...action }), {
    openEditModal: false,
    currentRow: null,
    selRows: [],
  });
  // 查询条件
  const [searchParams, setSearchParams] = useState({});

  // 容器高度计算（表格）
  const { parentRef, height } = useParentSize();

  // 查询菜单数据
  const { isLoading, data, refetch } = useQuery({
    // 依赖searchParams, 当searchParams变化时，会重新执行queryFn
    queryKey: ['sys_menu', searchParams],
    queryFn: menuService.getAllMenus,
  });

  // 新增菜单mutation
  const addMenuMutation = useMutation({
    mutationFn: menuService.addMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sys_menu', searchParams] });
      closeEditModal();
    },
  });

  // 修改单个菜单mutation
  const updateMenuMutation = useMutation({
    mutationFn: menuService.updateMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sys_menu', searchParams] });
      closeEditModal();
    },
  });

  // 删除菜单mutation
  const deleteMenuMutation = useMutation({
    mutationFn: menuService.deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sys_menu', searchParams] });
    },
  });

  // 批量删除菜单mutation
  const batchDeleteMenuMutation = useMutation({
    mutationFn: menuService.deleteMenuBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sys_menu', searchParams] });
    },
  });

  // 定义表格列
  const columns: TableProps['columns'] = [
    {
      title: '名称',
      width: 160,
      dataIndex: 'name',
      key: 'name',
      render(value) {
        return t(value);
      },
    },
    {
      title: '组件',
      width: 140,
      dataIndex: 'component',
      key: 'component',
    },
    {
      title: '路径',
      width: 140,
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '类型',
      width: 80,
      dataIndex: 'menuType',
      key: 'menuType',
      align: 'center',
      render(value) {
        switch (value) {
          case 0:
            return '一级菜单';
          case 1:
            return '子菜单';
          case 2:
            return '子路由';
          case 3:
            return '权限按钮';
          default:
            return '';
        }
      },
    },
    {
      title: '图标',
      width: 80,
      dataIndex: 'icon',
      key: 'icon',
      align: 'center',
      render(value) {
        return addIcon(value);
      },
    },
    {
      title: '序号',
      width: 80,
      dataIndex: 'sortNo',
      key: 'sortNo',
      align: 'center',
    },
    {
      title: '状态',
      width: 80,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render(value: boolean) {
        if (value) {
          return <Tag color="green">启用</Tag>;
        }
        return <Tag color="gray">停用</Tag>;
      },
    },
    {
      title: '操作',
      width: 40,
      dataIndex: 'operation',
      fixed: 'right',
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <Space size={0}>
            <Button
              size="small"
              type="link"
              style={{ color: '#fa8c16' }}
              onClick={() => {
                dispatch({
                  currentRow: record,
                  openEditModal: true,
                });
              }}
            >
              {t('common.operation.edit')}
            </Button>
            <Button size="small" variant="link" color="danger" onClick={() => delMenu(record.id)}>
              {t('common.operation.delete')}
            </Button>
          </Space>
        );
      },
    },
  ];

  /**
   * 多行选中的配置
   */
  const rowSelection: TableProps['rowSelection'] = {
    // 行选中的回调
    onChange(_selectedRowKeys, selectedRows) {
      dispatch({
        selRows: selectedRows,
      });
    },
    columnWidth: 32,
    fixed: true,
  };

  /**
   * 检索表单提交
   * @param values  检索表单条件
   */
  const onFinish = (values: any) => {
    // 拼接查询条件，没有选择的条件就不拼接
    const queryCondition = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value !== undefined && value !== ''),
    );
    // 判断参数是否发生变化
    if (isEqual(queryCondition, searchParams)) {
      // 参数没有变化，手动刷新数据
      refetch();
      return;
    }
    // 参数变了，更新查询参数，自动触发查询
    setSearchParams(queryCondition);
  };

  /**
   * 批量删除选中的菜单
   */
  const deleteBatch = () => {
    modal.confirm({
      title: '批量删除',
      icon: <ExclamationCircleFilled />,
      content: '确定批量删除菜单吗？数据删除后将无法恢复！',
      onOk() {
        // 调用删除接口，删除成功后刷新页面数据
        batchDeleteMenuMutation.mutate(state.selRows.map((item: any) => item.id));
      },
    });
  };

  // 新增公共确认方法
  const confirmDelete = (content: string, onConfirm: () => void) => {
    modal.confirm({
      title: '确认删除？',
      icon: <ExclamationCircleFilled />,
      content,
      onOk: onConfirm,
    });
  };

  // 修改后的删除方法
  const delMenu = (id: string) => {
    confirmDelete('确定删除菜单吗？数据删除后将无法恢复！', () => {
      deleteMenuMutation.mutate(id);
    });
  };

  /**
   * 新增按钮点击
   */
  const onAddMenuClick = () => {
    dispatch({
      openEditModal: true,
      currentRow: null,
    });
  };

  /**
   * 关闭编辑弹窗
   */
  const closeEditModal = () => {
    dispatch({
      openEditModal: false,
    });
  };

  /**
   * 弹窗点击确定的回调函数
   * @param menuData 编辑的菜单数据
   */
  const onEditOk = async (menuData: Record<string, any>) => {
    if (state.currentRow == null) {
      // 新增数据
      addMenuMutation.mutate(menuData);
    } else {
      // 编辑数据
      updateMenuMutation.mutate(menuData);
    }
  };

  return (
    <>
      {/* 菜单检索条件栏 */}
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 0,
            },
          },
        }}
      >
        <Card>
          <SearchBar onFinish={onFinish} />
        </Card>
      </ConfigProvider>
      {/* 查询表格 */}
      <Card className="mt-2! min-h-0 flex-1" styles={{ body: { height: '100%' } }} ref={parentRef}>
        {/* 操作按钮 */}
        <ActionButtons
          onAddMenuClick={onAddMenuClick}
          onDeleteBatch={deleteBatch}
          selRowsLength={state.selRows.length}
        />
        {/* 表格数据 */}
        <DataTable
          dataSource={data || []}
          columns={columns}
          isLoading={isLoading}
          rowKey="id"
          scroll={{ y: height - 128, x: 'max-content' }}
          rowSelection={{ ...rowSelection }}
        />
      </Card>

      {/* 新增、编辑弹窗 */}
      <MenuInfoModal
        visible={state.openEditModal}
        currentRow={state.currentRow}
        onCancel={closeEditModal}
        onOk={onEditOk}
      />
    </>
  );
};
export default Menu;
