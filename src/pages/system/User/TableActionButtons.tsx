import { Button, Space, Upload, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { usePermission } from '@/hooks/usePermission';
import { useTranslation } from 'react-i18next';

interface TableActionButtonsProps {
  handleAdd: () => void;
  handleBatchDelete: () => void;
  refetch: () => void;
  selectedRows: any[];
}

// 表格操作按钮
const TableActionButtons: React.FC<TableActionButtonsProps> = ({
  handleAdd,
  handleBatchDelete,
  refetch,
  selectedRows,
}) => {
  const { t } = useTranslation();
  // 是否有新增权限
  const canAdd = usePermission(['sys:user:add']);
  // 是否有批量删除权限
  const canBatchDelete = usePermission(['sys:user:delete']);
  // 是否有批量导入权限
  const canBatchImport = usePermission(['sys:user:import']);
  return (
    <Space>
      {canAdd && (
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          {t('common.operation.add')}
        </Button>
      )}

      {canBatchImport && (
        <Upload
          accept=".xlsx"
          showUploadList={false}
          action="/api/user/import"
          onChange={(info) => {
            if (info.file.status === 'done') {
              message.success('导入成功');
              refetch();
            } else if (info.file.status === 'error') {
              message.error('导入失败');
            }
          }}
        >
          <Button icon={<PlusOutlined />}>{t('common.operation.import')}</Button>
        </Upload>
      )}

      {canBatchDelete && (
        <Button danger icon={<DeleteOutlined />} disabled={selectedRows.length === 0} onClick={handleBatchDelete}>
          {t('common.operation.delete')}
        </Button>
      )}
    </Space>
  );
};

export default TableActionButtons;
