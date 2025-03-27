import { Card, Segmented, type SegmentedProps, Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import './design.scss';
import { PlusOutlined } from '@ant-design/icons';
import ProjectCard from './ProjectCard';
import { projectService } from '@/api/project/design/designApi';
import ProjectInfoModal from './ProjectInfoModal';
import type { ProjectModel } from './api/types';
import { usePreferencesStore } from '@/stores/store';
import { usePermission } from '@/hooks/usePermission';
const { Search } = Input;

/**
 * 项目设计
 */
const Project: React.FC = () => {
  // 选中的分类
  const [type, setType] = useState<string>('');
  const { preferences } = usePreferencesStore();
  const { theme } = preferences;
  // 新增弹窗
  const [openAddProject, setOpenAddProject] = useState<boolean>(false);
  // 搜索框聚焦
  const searchRef = useCallback((node: any) => node?.focus(), []);
  // 是否有新增权限
  const hasAddPermission = usePermission(['engine:project:add']);

  // 分段控制器选项
  const segmentedOptions: SegmentedProps['options'] = [
    {
      label: '全部',
      value: '',
    },
    {
      label: '集成项目',
      value: '1',
    },
    {
      label: '接口项目',
      value: '2',
    },
    {
      label: '三方项目',
      value: '3',
    },
  ];

  // 项目列表数据
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  // 编辑的项目数据
  const [project, setProject] = useState<ProjectModel>();

  // 根据类型进行检索
  useEffect(() => {
    queryProject();
  }, [type]);

  /**
   * 查询项目
   * @param projectName 项目名称
   */
  const queryProject = (projectName?: string) => {
    // 构建查询条件
    const queryCondition: Record<string, any> = {
      type,
      name: projectName,
    };
    projectService.getProjectList(queryCondition).then((res) => {
      setProjects(res);
    });
  };

  /**
   * 分段控制器切换
   * @param value 值
   */
  const onSegmentedChange = (value: string) => {
    setType(value);
  };

  /**
   * 新增项目
   */
  const addProject = () => {
    setOpenAddProject(true);
  };

  /**
   * 编辑项目
   * @param projectId 项目ID
   */
  const editProject = (projectId: string) => {
    // 根据ID从列表中获取项目具体信息
    const project = projects.find((item) => item.id === projectId);
    setProject(project);
    setOpenAddProject(true);
  };

  /**
   * 新增（编辑）项目确认
   */
  const onModalOk = (project: ProjectModel) => {
    // 首先确定是新增还是修改(有没有项目ID)
    if (project.id) {
      // 修改
      projectService.updateProject(project).then((success: boolean) => {
        if (success) {
          queryProject();
          setOpenAddProject(false);
        }
      });
    } else {
      // 新增
      projectService.addProject(project).then((success: boolean) => {
        if (success) {
          queryProject();
          setOpenAddProject(false);
        }
      });
    }
  };

  /**
   * 新增项目取消
   */
  const onModalCancel = () => {
    setOpenAddProject(false);
  };

  return (
    <>
      <div className="flex-1 pt-6 pr-6 pl-6 overflow-y-scroll bg-[#f5f6f7]">
        <div className="mb-[20px] text-[18px] font-bold">项目列表</div>
        {/* 卡片列表和筛选框 */}
        <div className="mb-[20px]">
          <div className="w-[600px] my-4 mx-auto">
            {/* 检索 */}
            <Search
              enterButton="检索"
              allowClear
              placeholder="请输入检索内容"
              ref={searchRef}
              size="large"
              onSearch={queryProject}
            />
          </div>
          <Segmented<any>
            options={segmentedOptions}
            onChange={onSegmentedChange}
            value={type}
          />
        </div>
        {/* 项目列表 */}
        <div className="flex flex-wrap mt-2">
          {/* 新建项目 */}
          {hasAddPermission && (
            <Card
              styles={{ body: { padding: '0px' } }}
              className="projectList addProject"
              onClick={addProject}
            >
              <p>
                <PlusOutlined
                  className="text-[64px]"
                  style={{ color: theme.colorPrimary }}
                />
                <span className="addTitle">新增项目</span>
              </p>
            </Card>
          )}
          {/* 项目列表 */}
          {projects.map((item) => (
            <ProjectCard
              key={item.id}
              id={item.id}
              name={item.name}
              background={item.background}
              type={item.type}
              onEditProject={editProject}
            />
          ))}
        </div>
      </div>
      {/* 新增弹窗 */}
      <ProjectInfoModal
        open={openAddProject}
        type={type}
        onOk={onModalOk}
        onCancel={onModalCancel}
        project={project}
      />
    </>
  );
};
export default Project;
