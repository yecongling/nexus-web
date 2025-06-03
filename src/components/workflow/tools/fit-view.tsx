import { ExpandAltOutlined } from '@ant-design/icons';
import { usePlaygroundTools } from '@flowgram.ai/free-layout-editor';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

/**
 * 视图自动整理
 * @returns
 */
const FitView: React.FC = () => {
  const { t } = useTranslation();
  const tools = usePlaygroundTools();
  return (
    <Tooltip title={t('workflow.tools.fitView')}>
      <Button
        type="text"
        icon={<ExpandAltOutlined />}
        onClick={() => tools.fitView()}
      />
    </Tooltip>
  );
};
export default FitView;
