import {
  Card,
  Segmented,
  type SegmentedProps,
  Input,
  type InputRef,
  Checkbox,
  Dropdown,
  Button,
  Space,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import './project.scss';
import {
  ApartmentOutlined,
  ApiOutlined,
  AppstoreOutlined,
  DownOutlined,
  ExportOutlined,
  FileAddFilled,
  PlusOutlined,
  SolutionOutlined,
  TagOutlined,
} from '@ant-design/icons';
import ProjectCard from './ProjectCard';
import ProjectInfoModal from './ProjectInfoModal';
import type {
  ProjectModel,
  ProjectSearchParams,
} from '@/services/integrated/project/types';
import { usePreferencesStore } from '@/stores/store';
import { usePermission } from '@/hooks/usePermission';
import { projectService } from '@/services/integrated/project/projectApi';
import { useQuery } from '@tanstack/react-query';
const { Search } = Input;

/**
 * 项目设计
 */
const Project: React.FC = () => {
  const { preferences } = usePreferencesStore();
  const { theme } = preferences;
  // 新增弹窗
  const [openAddProject, setOpenAddProject] = useState<boolean>(false);
  // 搜索框聚焦
  const searchRef = useRef<InputRef>(null);
  // 是否有新增权限
  const hasAddPermission = usePermission(['engine:project:add']);

  // 分段控制器选项
  const segmentedOptions: SegmentedProps['options'] = [
    {
      label: '全部',
      value: 0,
      icon: <AppstoreOutlined />
    },
    {
      label: '集成项目',
      value: 1,
      icon: <ApartmentOutlined />
    },
    {
      label: '接口项目',
      value: 2,
      icon: <ApiOutlined />
    },
    {
      label: '三方项目',
      value: 3,
      icon: <SolutionOutlined />
    },
  ];

  // 编辑的项目数据
  const [project, setProject] = useState<ProjectModel>();

  // 查询参数（包含分页参数）
  const [searchParams, setSearchParams] = useState<ProjectSearchParams>({
    type: 0,
    pageNum: 1,
    pageSize: 20,
  });

  // 查询项目数据
  const { data: result, refetch } = useQuery({
    queryKey: ['integrated_project', searchParams],
    queryFn: () => projectService.getProjectList(searchParams),
  });

  // 处理搜索
  const handleSearch = (value: string) => {
    const search = {
      name: value,
      type: searchParams.type,
      pageNum: searchParams.pageNum,
      pageSize: searchParams.pageSize,
    };
    // 判断参数是否发生变化
    if (JSON.stringify(search) === JSON.stringify(searchParams)) {
      // 参数没有变化，手动刷新数据
      refetch();
      return;
    }
    setSearchParams((prev) => ({ ...prev, ...search }));
  };

  useEffect(() => {
    // 搜索框聚焦
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  /**
   * 分段控制器切换
   * @param value 值
   */
  const onSegmentedChange = (value: number) => {
    setSearchParams({
      ...searchParams,
      type: value,
    });
  };

  const renderDropDown = () => {
    return (
      <Card>
        <div className="flex flex-col gap-4">更多标签</div>
      </Card>
    );
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
    const project = (result?.data || []).find(
      (item: ProjectModel) => item.id === projectId,
    );
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
          refetch();
          setOpenAddProject(false);
        }
      });
    } else {
      // 新增
      projectService.addProject(project).then((success: boolean) => {
        if (success) {
          refetch();
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
              onSearch={handleSearch}
            />
          </div>
          <div className="w-full flex justify-between items-center">
            <Segmented<any>
              options={segmentedOptions}
              onChange={onSegmentedChange}
              value={searchParams.type}
            />
            <div>
              {/* 区分我创建的、标签页 */}
              <Checkbox>我创建的</Checkbox>
              <Dropdown dropdownRender={renderDropDown} trigger={['click']}>
                <Button color="default" variant="filled">
                  <Space>
                    <TagOutlined />
                    全部标签
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
        {/* 项目列表 */}
        <div className="grid content-start grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 2k:grid-cols-6 gap-4 pt-2 grow relative">
          {/* 数据查询中 */}
          {hasAddPermission && (
            <Card
              className="relative col-span-1 inline-flex flex-col justify-between h-[160px] bg-components-card-bg rounded-xl"
              classNames={{ body: 'grow p-2! rounded-t-xl' }}
            >
              <div className="px-6 pt-2 pb-1 text-xs font-medium leading-[18px] text-[#676f83]">
                创建应用
              </div>
              <button
                className="w-full flex items-center mb-1 px-6 py-[7px] rounded-lg text-[13px] font-medium leading-[18px] text-[#676f83] cursor-pointer hover:bg-[#f5f6f7] hover:text-[#1e1e2d] transition-all duration-200 ease-in-out"
                onClick={addProject}
                type="button"
              >
                <PlusOutlined className="text-[#676f83] shrink-0 mr-2 w-4 h-4" />
                创建空白应用
              </button>
              <button
                className="w-full flex items-center px-6 py-[7px] rounded-lg text-[13px] font-medium leading-[18px] text-[#676f83] cursor-pointer hover:bg-[#f5f6f7] hover:text-[#1e1e2d] transition-all duration-200 ease-in-out"
                onClick={addProject}
                type="button"
              >
                <FileAddFilled className="text-[#676f83] shrink-0 mr-2 w-4 h-4" />
                从应用模板创建
              </button>
              <button
                className="w-full flex items-center px-6 py-[7px] rounded-lg text-[13px] font-medium leading-[18px] text-[#676f83] cursor-pointer hover:bg-[#f5f6f7] hover:text-[#1e1e2d] transition-all duration-200 ease-in-out"
                onClick={addProject}
                type="button"
              >
                <ExportOutlined className="text-[#676f83] shrink-0 mr-2 w-4 h-4" />
                导入DSL文件
              </button>
            </Card>
          )}
          {/* 项目列表 */}
          {(result?.data || []).map((item: ProjectModel) => (
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
        type={searchParams.type}
        onOk={onModalOk}
        onCancel={onModalCancel}
        project={project}
      />
    </>
  );
};
export default Project;
