import { useEditorProps } from '@/hooks/workflow/use-editor-props';
import { nodeRegistries } from './nodes';
import { initData } from './init-data';
import {
  EditorRenderer,
  FreeLayoutEditorProvider,
} from '@flowgram.ai/free-layout-editor';
import { SidebarProvider } from './sidebar/sidebar-provider';
import '@flowgram.ai/free-layout-editor/index.css';
import SidebarRenderer from './sidebar/sidebar-renderer';
import WorkflowTools from './tools';
import './workflow.scss';

/**
 * 流程编排组件
 */
const Workflow: React.FC<WorkflowProps> = (props) => {
  // 定义流程编辑器属性
  const editorProps = useEditorProps(initData, nodeRegistries);
  // 根据应用ID查询流程数据
  if (props.id) {
    // TODO: 根据应用ID查询流程数据
  }

  return (
    <div className="workflow-feature-overview">
      <FreeLayoutEditorProvider {...editorProps}>
        <SidebarProvider>
          <div className="workflow-container">
            <EditorRenderer className="workflow-editor" />
          </div>
          <WorkflowTools />
          <SidebarRenderer />
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
