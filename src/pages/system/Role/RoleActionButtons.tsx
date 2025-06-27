import { PlusOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import type { UseMutationResult } from '@tanstack/react-query';
import { App, Button, Space } from 'antd';
import type React from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface RoleActionButtonsProps {
  onAddRoleClick: () => void;
  selRows: any[];
  logicDeleteUserMutation: UseMutationResult<any, any, any, unknown>;
}

/**
 * 角色操作按钮
 * @param props 参数
 * @returns 操作按钮
 */
const RoleActionButtons: React.FC<RoleActionButtonsProps> = ({ onAddRoleClick, selRows, logicDeleteUserMutation }) => {
  const { modal } = App.useApp();
  const { t } = useTranslation();
  // 批量处理删除
  const onBatchDelete = useCallback(() => {
    modal.confirm({
      title: '批量删除',
      icon: <ExclamationCircleFilled />,
      content: '确定删除选中的角色吗？数据删除后将无法恢复！',
      onOk() {
        const ids = selRows.map((item) => item.id);
        logicDeleteUserMutation.mutate(ids);
      },
    });
  }, []);

  return (
    <Space>
      <Button type="primary" icon={<PlusOutlined />} onClick={onAddRoleClick}>
        {t('common.operation.add')}
      </Button>
      <Button type="default" icon={<PlusOutlined />}>
        {t('common.operation.import')}
      </Button>
      <Button type="default" danger icon={<DeleteOutlined />} disabled={selRows.length === 0} onClick={onBatchDelete}>
        {t('common.operation.delete')}
      </Button>
    </Space>
  );
};

export default RoleActionButtons;
