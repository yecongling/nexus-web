import { useService } from '@flowgram.ai/free-layout-editor';
import { FlowMinimapService, MinimapRender } from '@flowgram.ai/minimap-plugin';

/**
 * 缩略图
 * @param param0
 * @returns
 */
const MiniMap: React.FC<MiniMapProps> = ({ visible }) => {
  if (visible) {
    return <></>;
  }
  const minimapService = useService(FlowMinimapService);
  return (
    <div className="absolute bottom-14 w-[198px]">
      <MinimapRender
        service={minimapService}
        panelStyles={{}}
        containerStyles={{
          pointerEvents: 'auto',
          position: 'relative',
          top: 'unset',
          right: 'unset',
          bottom: 'unset',
          left: 'unset',
        }}
        inactiveStyle={{
          opacity: 1,
          scale: 1,
          translateX: 0,
          translateY: 0,
        }}
      />
    </div>
  );
};
export default MiniMap;

type MiniMapProps = {
  visible: boolean;
};
