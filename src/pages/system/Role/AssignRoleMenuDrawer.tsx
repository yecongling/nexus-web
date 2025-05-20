import { roleService } from '@/services/system/role/roleApi';
import { getIcon } from '@/utils/utils';
import {
  CloseOutlined,
  DownOutlined,
  FolderFilled,
  FolderOpenFilled,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Drawer, Space, Tree, type TreeProps, App } from 'antd';
import { memo, useCallback, useEffect, useState } from 'react';

/**
 * 角色菜单授权界面
 * @returns
 */
const RoleMenuDrawer: React.FC<RoleMenuDrawerProps> = memo(
  ({ open, roleId, onOk, onCancel }) => {
    // 树组件的数据
    const [treeData, setTreeData] = useState<any[]>([]);
    // 选中的节点
    const [checked, setChecked] = useState<string[]>([]);
    // 展开的节点
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const { message, modal } = App.useApp();
    // 使用useQuery获取数据
    const {
      data: resp,
      isSuccess,
      isError,
      error,
    } = useQuery({
      queryKey: ['sys_role_assign_menu', roleId],
      queryFn: () => roleService.getRoleMenu(roleId),
      enabled: open,
    });

    // 分配角色菜单
    const assignRoleMenuMutation = useMutation({
      mutationFn: (params: any) =>
        roleService.assignRoleMenu(params.roleId, params.menuIds),
      onSuccess: () => {
        message.success('分配角色菜单成功');
        onOk();
      },
      onError: (error: any) => {
        modal.error({
          title: '分配角色菜单失败',
          content: error.message,
        });
      },
    });

    useEffect(() => {
      if (isSuccess) {
        const expanded: string[] = [];
        const data = transformData(resp.menuList, expanded);
        setTreeData(data);
        setChecked(resp.menuIds);
        setExpandedKeys(expanded);
      }
    }, [isSuccess, resp]);

    /**
     * 数据转换
     * @param data 原始数据
     * @param expanded 需要展开的数据
     */
    const transformData = useCallback((data: any, expanded: string[]) => {
      return data.map((item: any) => {
        if (item.icon) {
          item.icon = getIcon(item.icon);
        }
        if (item.children?.length > 0) {
          expanded.push(item.id);
        }
        if (item.children) {
          transformData(item.children, expanded);
        }
        return item;
      });
    }, []);

    /**
     * 点击确定的时候的操作
     */
    const handleOk = () => {
      // 保存分配的菜单数据
      assignRoleMenuMutation.mutate({
        roleId: roleId,
        menuIds: checked,
      });
    };

    /**
     * 处理节点选中
     * @param checkedKeys 选中的节点
     * @param e
     */
    const handleChecked: TreeProps['onCheck'] = useCallback(
      (checkedKeysValue: any) => {
        setChecked((checkedKeysValue as any).checked);
      },
      [],
    );

    return (
      <Drawer
        title="授权菜单"
        width={400}
        open={open}
        closeIcon={false}
        extra={
          <Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
        }
        onClose={onCancel}
        classNames={{ footer: 'text-right' }}
        footer={
          <Space>
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" onClick={handleOk}>
              确认
            </Button>
          </Space>
        }
      >
        {isError && <div>数据加载失败，{error.message}</div>}
        {isSuccess && (
          <Tree
            blockNode
            checkable
            showIcon
            switcherIcon={<DownOutlined />}
            defaultExpandAll
            expandedKeys={expandedKeys}
            fieldNames={{ title: 'name', key: 'id', children: 'children' }}
            icon={(props: any) => {
              // 没有isLeaf这个属性表明是一级菜单
              const { isLeaf } = props.data;
              if (!isLeaf) {
                return props.expanded ? (
                  <FolderOpenFilled
                    style={{ fontSize: '16px', color: 'orange' }}
                  />
                ) : (
                  <FolderFilled style={{ fontSize: '16px', color: 'orange' }} />
                );
              }
              return <></>;
            }}
            treeData={treeData}
            checkedKeys={checked}
            checkStrictly
            onCheck={handleChecked}
          />
        )}
      </Drawer>
    );
  },
);
export default RoleMenuDrawer;

export type RoleMenuDrawerProps = {
  open: boolean;
  // 角色id（通过角色id查询角色已经分配的菜单）
  roleId: string;
  // 点击确定的回调
  onOk: () => void;
  // 点击取消的回调
  onCancel: (e: any) => void;
};
