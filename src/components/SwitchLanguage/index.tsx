import { Select, type SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

/**
 * 切换语言
 */
const SwitchLanguage: React.FC = () => {
  const { t } = useTranslation();
  const options: SelectProps['options'] = [
    {
      value: 'zh',
      label: '中文',
    },
    {
      value: 'en',
      label: '英文',
    },
  ];
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#676f83]">{t('common.language')}：</span>
      <Select defaultValue="zh" className="w-[100px]" options={options} />
    </div>
  );
};
export default SwitchLanguage;
