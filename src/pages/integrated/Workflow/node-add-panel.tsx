import {
  useService,
  WorkflowDragService,
} from '@flowgram.ai/free-layout-editor';

/**
 * 左边可添加的节点面板
 * 显示所有的节点，可拖动到右边画布上
 * @returns
 */
const NodeAddPanel: React.FC = () => {
  // 拖拽服务
  const startDragService = useService<WorkflowDragService>(WorkflowDragService);

  return (
    <div className="workflow-sidebar">
      <div className="workflow-sidebar-header">
        <div className="workflow-sidebar-header-title">节点</div>
      </div>
      <div
        className="w-[100px] h-[100px] bg-amber-300"
        onMouseDown={(e) =>
          startDragService.startDragCard('card', e, {
            data: {
              type: 'card',
              title: '卡片',
              content: '卡片内容',
            },
          })
        }
      />
    </div>
  );
};
export default NodeAddPanel;
