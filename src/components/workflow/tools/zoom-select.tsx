import {
  usePlayground,
  usePlaygroundTools,
} from '@flowgram.ai/free-layout-editor';
import { Dropdown, type MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';

/**
 * 缩放选择
 * @returns
 */
const ZoomSelect = () => {
  const tools = usePlaygroundTools();
  const { t } = useTranslation();
  const playound = usePlayground();
  //缩放选项
  const items: MenuProps['items'] = [
    {
      label: t('workflow.tools.zoomSelect.zoomIn'),
      key: 'zoomIn',
      onClick: () => tools.zoomin(),
    },
    {
      label: t('workflow.tools.zoomSelect.zoomOut'),
      key: 'zoomOut',
      onClick: () => tools.zoomout(),
    },
    {
      type: 'divider',
    },
    {
      label: t('workflow.tools.zoomSelect.zoomTo'),
      key: 'zoomTo50',
      onClick: () => playound.config.updateZoom(0.5),
    },
    {
      label: t('workflow.tools.zoomSelect.zoomTo100'),
      key: 'zoomTo100',
      onClick: () => playound.config.updateZoom(1),
    },
    {
      label: t('workflow.tools.zoomSelect.zoomTo150'),
      key: 'zoomTo150',
      onClick: () => playound.config.updateZoom(1.5),
    },
    {
      label: t('workflow.tools.zoomSelect.zoomTo200'),
      key: 'zoomTo200',
      onClick: () => playound.config.updateZoom(2),
    },
  ];
  return (
    <Dropdown trigger={['click']} menu={{ items }}>
      <span className="p-1 rounded-lg border border-solid border-amber-50 text-xs w-[50px] cursor-pointer">
        {Math.floor(tools.zoom * 100)}%
      </span>
    </Dropdown>
  );
};
export default ZoomSelect;
