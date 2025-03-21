import { Button, Space, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { usePermission } from '@/hooks/usePermission';

type ActionButtonsProps = {
  onAddMenuClick: () => void;
  onDeleteBatch: () => void;
  selRowsLength: number;
};

/**
 * 操作按钮
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAddMenuClick,
  onDeleteBatch,
  selRowsLength,
}) => {
  // 新增菜单权限
  const hasAddPermission = usePermission(['system:menu:add']);
  // 批量导入权限
  const hasImportPermission = usePermission(['system:menu:batch-import']);
  // 批量删除权限
  const hasDeletePermission = usePermission(['system:menu:batch-delete']);
  return (
    <Space>
      {hasAddPermission && (
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddMenuClick}>
          新增
        </Button>
      )}
      {hasImportPermission && (
        <Upload accept=".xlsx">
          <Button type="default" icon={<PlusOutlined />}>
            批量导入
          </Button>
        </Upload>
      )}
      {hasDeletePermission && (
        <Button
          type="default"
          danger
          icon={<DeleteOutlined />}
          disabled={selRowsLength === 0}
          onClick={onDeleteBatch}
        >
          批量删除
        </Button>
      )}
    </Space>
  );
};

export default ActionButtons;
