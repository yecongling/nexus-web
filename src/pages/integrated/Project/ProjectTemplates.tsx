import DragModal from '@/components/modal/DragModal';
import type React from 'react';
import type { ProjectModalState } from './types';
import { memo } from 'react';

/**
 * 模版中心
 * @returns
 */
const ProjectTemplates: React.FC<ProjectTemplateModelProps> = memo(({
  open,
  onClose,
}) => {
  return (
    <DragModal centered open={open} title="模板中心" onCancel={onClose}>
      <h1>ProjectTemplates</h1>
    </DragModal>
  );
});
export default ProjectTemplates;

/**
 * 模版中心弹窗参数
 */
export interface ProjectTemplateModelProps {
  open: boolean;
  dispatch: React.Dispatch<Partial<ProjectModalState>>;
  onClose: () => void;
}
