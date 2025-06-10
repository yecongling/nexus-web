import type { LineRenderProps } from '@flowgram.ai/free-lines-plugin';
import { useVisible } from './use-visible';
import { IconPlusCircle } from './button';
import { useCallback } from 'react';

/**
 * 连线上的+号按钮（一般用于在线条中间添加过程）
 * @param props
 * @returns
 */
export const LineAddButton: React.FC<LineRenderProps> = (props) => {
  const { line, selected, hovered, color } = props;
  const visible = useVisible({ line, selected, hovered });

  /**
   * 连接线上的图标点击
   */
  const onClick = useCallback(() => {}, []);

  if (!visible) {
    return <></>;
  }
  return (
    <div data-line-id={line.id} onClick={onClick}>
      <IconPlusCircle />
    </div>
  );
};
