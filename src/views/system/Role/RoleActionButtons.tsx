import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import type React from 'react';

interface RoleActionButtonsProps {
  onAddRoleClick: () => void;
  selRows: any[];
}

/**
 * 角色操作按钮
 * @param props 参数
 * @returns 操作按钮
 */
const RoleActionButtons: React.FC<RoleActionButtonsProps> = ({
  onAddRoleClick,
  selRows,
}) => {
  return (
    <Space>
      <Button type="primary" icon={<PlusOutlined />} onClick={onAddRoleClick}>
        新增
      </Button>
      <Button type="default" icon={<PlusOutlined />}>
        批量导入
      </Button>
      <Button
        type="default"
        danger
        icon={<DeleteOutlined />}
        disabled={selRows.length === 0}
      >
        批量删除
      </Button>
    </Space>
  );
};

export default RoleActionButtons;
