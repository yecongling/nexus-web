import { useClientContext } from '@flowgram.ai/free-layout-editor';
import AutoLayout from './auto-layout';
import FitView from './fit-view';
import SwitchLine from './switch-line';
import ZoomSelect from './zoom-select';
import { useEffect, useState } from 'react';
import MinimapSwitch from './minimap-switch';
import MiniMap from './minimap';
import { Readonly } from './readonly';
import { Comment } from './comment';

/**
 * 流程编排工具组件
 * @returns
 */
const WorkflowTools: React.FC = () => {
  const { history, playground } = useClientContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [minimapVisible, setMinimapVisible] = useState(true);

  useEffect(() => {}, [history]);

  return (
    <div className="absolute bottom-4 flex justify-start min-w-[360px] pointer-none gap-2 z-99">
      <div className="flex items-center bg-[#fff] rounded-[10px]">
        {/* 自动布局 */}
        <AutoLayout />
        {/* 切换线条样式 */}
        <SwitchLine />
        {/* 切换大小 */}
        <ZoomSelect />
        {/* 视图自适应 */}
        <FitView />
        {/* 显示隐藏缩略图 */}
        <MinimapSwitch
          minimapVisible={minimapVisible}
          setMinimapVisible={setMinimapVisible}
        />
        {/* 缩略图 */}
        <MiniMap visible={minimapVisible} />
        {/* 切换只读模式 */}
        <Readonly />
        {/* 添加注释组件 */}
        <Comment />
      </div>
    </div>
  );
};
export default WorkflowTools;
