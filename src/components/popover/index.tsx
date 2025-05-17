import { Button, Popover } from 'antd';
import { useRef } from 'react';

/**
 * 通用气泡卡片
 * @returns
 */
const CustomPopover: React.FC<CustomPopoverProps> = ({
  trigger = 'hover',
  position = 'bottom',
  htmlContent,
  popupClassName,
  btnElement,
  className,
  btnClassName,
  manualClose,
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeOutRef = useRef<number | null>(null);

  /**
   * 鼠标移入
   * @param isOpen 是否打开
   * @returns
   */
  const onMouseEnter = (isOpen: boolean) => {};

  /**
   * 鼠标移出
   * @param isOpen 是否打开
   * @returns
   */
  const onMouseLeave = (isOpen: boolean) => {};

  return (
    <Popover>
      <Button>{btnElement}</Button>
    </Popover>
  );
};
export default CustomPopover;

const timeoutDuration = 100;

/**
 * 通用气泡卡片属性
 */
type CustomPopoverProps = {
  className?: string;
  htmlContent?: React.ReactNode;
  popupClassName?: string;
  trigger?: 'click' | 'hover';
  position?: 'bottom' | 'br' | 'bl';
  btnElement?: string | React.ReactNode;
  btnClassName?: string | ((open: boolean) => string);
  manualClose?: boolean;
  disabled?: boolean;
};

// popover里面的选项操作
export type HtmlContentProps = {
  onClose?: () => void;
  onClick?: () => void;
};
