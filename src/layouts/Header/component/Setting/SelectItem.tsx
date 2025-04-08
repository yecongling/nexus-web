import type { BasicOptions } from '@/types/global';
import { Select } from 'antd';
import clsx from 'clsx';
import "./switchItem.scss";

/**
 * 选择项
 * @returns
 */
const SelectItem: React.FC<SelectItemProps> = (props) => {
  const { title, disabled, placeholder, items } = props;

  return (
    <div
      className={clsx('select-item', {
        'pointer-events-none opacity-50': disabled,
      })}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '14px',
          lineHeight: '20px',
        }}
      >
        {title}
      </span>
      {/* Select组件 */}
      <Select options={items} disabled={disabled} placeholder={placeholder} style={{width: '165px'}}/>
    </div>
  );
};
export default SelectItem;

export interface SelectItemProps {
  title?: string;
  disabled?: boolean;
  placeholder?: string;
  items?: BasicOptions[];
}
