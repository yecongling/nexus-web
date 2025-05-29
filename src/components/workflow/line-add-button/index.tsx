import type { LineRenderProps } from '@flowgram.ai/free-lines-plugin';
import { Button } from 'antd';

/**
 * 连线上的+号按钮（一般用于在线条中间添加过程）
 * @param props
 * @returns
 */
export const LineAddButton: React.FC<LineRenderProps> = (props) => {
  return (
    <div>
      <Button type="primary">新增</Button>
    </div>
  );
};
