import classNames from 'classnames';
import './switchItem.scss';
import { InputNumber } from 'antd';
/**
 * 数字框
 * @returns
 */
const NumberItem: React.FC<NumberItemProps> = (props) => {
  const { title, disabled, placeholder } = props;
  return (
    <div
      className={classNames('number-item', {
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
      <InputNumber
        disabled={disabled}
        placeholder={placeholder}
        style={{ width: '165px' }}
      />
    </div>
  );
};

export default NumberItem;

export interface NumberItemProps {
  title?: string;
  disabled?: boolean;
  placeholder?: string;
}
