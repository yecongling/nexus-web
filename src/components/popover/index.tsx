import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { cloneElement, Fragment, useRef } from 'react';
import cn from '@/utils/classnames';

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
  const onMouseEnter = (isOpen: boolean) => {
    timeOutRef.current && window.clearTimeout(timeOutRef.current);
    !isOpen && buttonRef.current?.click();
  };

  /**
   * 鼠标移出
   * @param isOpen 是否打开
   * @returns
   */
  const onMouseLeave = (isOpen: boolean) => {
    timeOutRef.current = window.setTimeout(() => {
      !isOpen && buttonRef.current?.click();
    }, timeoutDuration);
  };

  return (
    <Popover className="relative">
      {({ open }: { open: boolean }) => {
        return (
          <>
            <div
              {...(trigger !== 'hover'
                ? {}
                : {
                    onMouseLeave: () => onMouseLeave(open),
                    onMouseEnter: () => onMouseEnter(open),
                  })}
            >
              <PopoverButton
                ref={buttonRef}
                disabled={disabled}
                className={cn(
                  'group inline-flex items-center rounded-lg border border-[#10182824] bg-[#fff] px-3 py-2 text-base font-medium hover:border-[#10182833] hover:bg-[#f9fafb] focus:outline-none',
                  open && 'bg-[#10182824] hover:bg-[#f9fafb]',
                  btnClassName &&
                    typeof btnClassName === 'string' &&
                    btnClassName,
                  btnClassName &&
                    typeof btnClassName !== 'string' &&
                    btnClassName?.(open),
                )}
              >
                {btnElement}
              </PopoverButton>
              <Transition as={Fragment}>
                <PopoverPanel
                  className={cn(
                    'absolute z-10 mt-1 w-full max-w-sm px-4 sm:px-0 lg:max-w-3xl',
                    position === 'bottom' && 'left-1/2 -translate-x-1/2',
                    position === 'bl' && 'left-0',
                    position === 'br' && 'right-0',
                    className,
                  )}
                  {...(trigger !== 'hover'
                    ? {}
                    : {
                        onMouseLeave: () => onMouseLeave(open),
                        onMouseEnter: () => onMouseEnter(open),
                      })}
                >
                  {({ close }) => (
                    <div
                      className={cn(
                        'w-fit min-w-[130px] overflow-hidden rounded-lg bg-[#fff] shadow-lg ring-1 ring-black/5',
                        popupClassName,
                      )}
                      {...(trigger !== 'hover'
                        ? {}
                        : {
                            onMouseLeave: () => onMouseLeave(open),
                            onMouseEnter: () => onMouseEnter(open),
                          })}
                    >
                      {cloneElement(htmlContent as React.ReactElement, {
                        onClose: () => onMouseLeave(open),
                        ...(manualClose
                          ? {
                              onClick: close,
                            }
                          : {}),
                      })}
                    </div>
                  )}
                </PopoverPanel>
              </Transition>
            </div>
          </>
        );
      }}
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
