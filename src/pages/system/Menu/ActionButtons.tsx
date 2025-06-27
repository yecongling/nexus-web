import { Button, Space, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { usePermission } from '@/hooks/usePermission';
import { useTranslation } from 'react-i18next';

type ActionButtonsProps = {
  onAddMenuClick: () => void;
  onDeleteBatch: () => void;
  selRowsLength: number;
};

/**
 * 操作按钮
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({ onAddMenuClick, onDeleteBatch, selRowsLength }) => {
  const { t } = useTranslation();
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
          {t('common.operation.add')}
        </Button>
      )}
      {hasImportPermission && (
        <Upload accept=".xlsx">
          <Button type="default" icon={<PlusOutlined />}>
            {t('common.operation.import')}
          </Button>
        </Upload>
      )}
      {hasDeletePermission && (
        <Button type="default" danger icon={<DeleteOutlined />} disabled={selRowsLength === 0} onClick={onDeleteBatch}>
          {t('common.operation.delete')}
        </Button>
      )}
    </Space>
  );
};

export default ActionButtons;
