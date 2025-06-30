import { EditorRenderer, FreeLayoutEditorProvider } from '@flowgram.ai/free-layout-editor';

import { useEditorProps } from '@/hooks/workflow/use-editor-props';
import { SidebarProvider } from './sidebar/sidebar-provider';
import SidebarRenderer from './sidebar/sidebar-renderer';
import WorkflowTools from './tools';
import './workflow.scss';
import '@flowgram.ai/free-layout-editor/index.css';
import { NodeModalProvider } from './node-modal/node-modal-provider';
import ModalRenderer from './node-modal/modal-renderer';
import { nodeRegistries } from './nodes';
import { initialData } from './init-data';

/**
 * 流程编排组件
 */
const Workflow: React.FC<WorkflowProps> = (props) => {
  // 定义流程编辑器属性
  const editorProps = useEditorProps(initialData, nodeRegistries);
  // 根据应用ID查询流程数据
  if (props.id) {
    // TODO: 根据应用ID查询流程数据
  }

  return (
    <div className="workflow-feature-overview">
      <FreeLayoutEditorProvider {...editorProps}>
        <SidebarProvider>
          <NodeModalProvider>
            <div className="workflow-container">
              <EditorRenderer className="workflow-editor" />
            </div>
            <WorkflowTools />
            {/* 侧边栏 */}
            <SidebarRenderer />
            {/* 弹窗 */}
            <ModalRenderer />
          </NodeModalProvider>
        </SidebarProvider>
      </FreeLayoutEditorProvider>
    </div>
  );
};

export default Workflow;

/**
 * 定义流程组件的属性
 */
export interface WorkflowProps {
  // 应用ID
  id: string | undefined;
}
