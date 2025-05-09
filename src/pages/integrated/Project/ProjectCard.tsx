import {
  EditOutlined,
  NodeIndexOutlined,
  EllipsisOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExportOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { Card, Button, Dropdown, type MenuProps } from 'antd';
import './project.scss';
import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import type { ProjectModel } from '@/services/integrated/project/types';

/**
 * 项目组件
 * @returns
 */
const ProjectCard: React.FC<ProjectCardProps> = memo(
  ({ project, onRefresh }: ProjectCardProps) => {
    const { id, name, type, remark = '' } = project;
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    /**
     * 下拉菜单
     */
    const dropdownItems: MenuProps['items'] = [
      {
        label: '复制',
        icon: <CopyOutlined className="text-blue-500" />,
        key: 'copy',
        onClick: () => {
          console.log('复制');
        },
      },
      {
        label: '导出',
        icon: <ExportOutlined className="text-orange-400" />,
        key: 'export',
        onClick: () => {
          console.log('导出');
        },
      },
      {
        label: '删除',
        icon: <DeleteOutlined className="text-red-500" />,
        key: 'delete',
        danger: true,
        onClick: () => {
          console.log('删除');
        },
      },
    ];

    /**
     * 确认删除项目
     */
    const onConfirmDelete = useCallback(() => {}, [project.id]);

    /**
     * 项目流程设计
     */
    const designProject = () => {
      // 跳转到流程编排界面
      navigate(`/project/${id}/workflow`);
    };

    /**
     * 编辑项目
     */
    const editProject = useCallback(() => {}, [project.id]);

    /**
     * 删除项目
     */
    const deleteProject = useCallback(() => {
      // 调用后台删除
      //刷新列表
      onRefresh?.();
    }, [project.id]);

    return (
      <>
        <div className="group relative col-span-1 inline-flex h-[160px] cursor-pointer bg-[#fcfcfd] border-[#fff] flex-col rounded-xl border-[1px] border-solid shadow-sm transition-all duration-200 ease-in-out hover:shadow-lg">
          <div className="flex h-[66px] shrink-0 grow-0 items-center gap-3 px-[14px] pb-3 pt-[14px]">
            {/* icon */}
            <div className="relative shrink-0">icon</div>
            {/* 项目名称 */}
            <div className="w-0 grow py-[1px]">
              <div className="flex items-center text-sm font-semibold leading-5 text-[#354052]">
                <div className="truncate" title="工作流测试">
                  {name}
                </div>
              </div>
              <div className="flex items-center text-[10px] font-medium leading-[18px] text-[#676f83]">
                <div className="truncate">{type}</div>
              </div>
            </div>
          </div>
          <div className="title-wrapper h-[90px] px-[14px] text-xs leading-normal text-[#676f83]">
            <div className="line-clamp-4 group-hover:line-clamp-2" title="">
              细致描述
            </div>
          </div>
          {/* 隐藏部分 标签、操作按钮 */}
        </div>
        {/* 编辑框 */}
        {showEditModal && <div>编辑弹窗</div>}
        {/* 确认删除弹窗 */}
        {showConfirmDelete && <div>确认删除弹窗</div>}
      </>
    );
  },
);
export default ProjectCard;

/**
 * 项目组件属性
 */
export interface ProjectCardProps {
  /**
   * 项目数据
   */
  project: ProjectModel;

  /**
   * 刷新项目列表
   * @returns
   */
  onRefresh?: () => void;
}
