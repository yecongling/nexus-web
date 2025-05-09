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
import { useEffect, useReducer, useRef, useState } from 'react';
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
import ProjectCreate from './ProjectCreate';
import type {
  ProjectModel,
  ProjectSearchParams,
} from '@/services/integrated/project/types';
import { usePreferencesStore } from '@/stores/store';
import { usePermission } from '@/hooks/usePermission';
import { projectService } from '@/services/integrated/project/projectApi';
import { useQuery } from '@tanstack/react-query';
import ImportDsl from './ImportDsl';
import React from 'react';
import type { ProjectModalState } from './types';
import { isEqual } from 'lodash-es';
const { Search } = Input;
// 模版中心
const ProjectTemplate = React.lazy(() => import('./ProjectTemplates'));

// 提取关闭弹窗的逻辑
const closeAllModals = (
  dispatch: React.Dispatch<Partial<ProjectModalState>>,
) => {
  dispatch({
    openAddModal: false,
    openTemplateModal: false,
    openImportModal: false,
  });
};

/**
 * 项目设计
 */
const Project: React.FC = () => {
  const { preferences } = usePreferencesStore();
  const { theme } = preferences;

  // 新增弹窗、模版弹窗、导入弹窗
  const [state, dispatch] = useReducer(
    (prev: ProjectModalState, action: Partial<ProjectModalState>) => ({
      ...prev,
      ...action,
    }),
    {
      // 新增窗口的打开状态
      openAddModal: false,
      // 模版窗口的打开状态
      openTemplateModal: false,
      // 导入窗口的打开状态
      openImportModal: false,
    },
  );

  // 搜索框聚焦
  const searchRef = useRef<InputRef>(null);
  // 是否有新增权限
  const hasAddPermission = usePermission(['engine:project:add']);

  // 分段控制器选项
  const segmentedOptions: SegmentedProps<number>['options'] = [
    {
      label: '全部',
      value: 0,
      icon: <AppstoreOutlined />,
    },
    {
      label: '集成项目',
      value: 1,
      icon: <ApartmentOutlined />,
    },
    {
      label: '接口项目',
      value: 2,
      icon: <ApiOutlined />,
    },
    {
      label: '三方项目',
      value: 3,
      icon: <SolutionOutlined />,
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
    if (isEqual(search, searchParams)) {
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
    dispatch({
      openAddModal: true,
    });
  };

  /**
   * 打开模版中心
   */
  const openTemplate = () => {
    dispatch({
      openAddModal: false,
      openTemplateModal: true,
      openImportModal: false,
    });
  };

  /**
   * 关闭模版中心
   */
  const closeTemplate = () => {
    closeAllModals(dispatch);
  };

  /**
   * 打开文件导入弹窗
   */
  const openImport = () => {
    dispatch({
      openAddModal: false,
      openTemplateModal: false,
      openImportModal: true,
    });
  };

  /**
   * 从模版创建项目
   */
  const onCreateFromTemplate = () => {
    dispatch({
      openAddModal: false,
      openTemplateModal: true,
      openImportModal: false,
    });
  };

  /**
   * 从空白创建项目
   */
  const onCreateFromBlank = () => {
    dispatch({
      openAddModal: true,
      openTemplateModal: false,
      openImportModal: false,
    });
  };

  /**
   * 关闭文件导入弹窗
   */
  const closeImport = () => {
    closeAllModals(dispatch);
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
    dispatch({
      openAddModal: true,
    });
  };

  /**
   * 新增（编辑）项目确认
   */
  const onModalOk = (project: Partial<ProjectModel>) => {
    // 首先确定是新增还是修改(有没有项目ID)
    if (project.id) {
      // 修改
      projectService.updateProject(project).then((success: boolean) => {
        if (success) {
          refetch();
          dispatch({
            openAddModal: false,
          });
        }
      });
    } else {
      // 新增
      projectService.addProject(project).then((success: boolean) => {
        if (success) {
          refetch();
          dispatch({
            openAddModal: false,
          });
        }
      });
    }
  };

  /**
   * 新增项目取消
   */
  const onModalCancel = () => {
    dispatch({
      openAddModal: false,
    });
  };

  return (
    <>
      <div className="flex flex-col h-full pt-2 pr-4 pl-4 bg-[#f5f6f7]">
        <div className="mb-[8px] text-[18px] font-bold">项目列表</div>
        {/* 卡片列表和筛选框 */}
        <div className="mb-[8px]">
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
            <Segmented<number>
              options={segmentedOptions}
              onChange={onSegmentedChange}
              value={searchParams.type}
            />
            <div>
              {/* 区分我创建的、标签页 */}
              <Checkbox>我创建的</Checkbox>
              <Dropdown popupRender={renderDropDown} trigger={['click']}>
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
        <div className="flex-1 overflow-x-hidden overflow-y-auto grid content-start grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 2k:grid-cols-6 gap-4 pt-2 grow relative">
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
                onClick={openTemplate}
                type="button"
              >
                <FileAddFilled className="text-[#676f83] shrink-0 mr-2 w-4 h-4" />
                从应用模板创建
              </button>
              <button
                className="w-full flex items-center px-6 py-[7px] rounded-lg text-[13px] font-medium leading-[18px] text-[#676f83] cursor-pointer hover:bg-[#f5f6f7] hover:text-[#1e1e2d] transition-all duration-200 ease-in-out"
                onClick={openImport}
                type="button"
              >
                <ExportOutlined className="text-[#676f83] shrink-0 mr-2 w-4 h-4" />
                导入DSL文件
              </button>
            </Card>
          )}
          {/* 项目列表 */}
          {(result || []).map((item: ProjectModel) => (
            <ProjectCard key={item.id} project={item} onRefresh={refetch} />
          ))}
        </div>
      </div>
      {/* 新增弹窗 */}
      <ProjectCreate
        open={state.openAddModal}
        onOk={onModalOk}
        onCancel={onModalCancel}
        onCreateFromTemplate={onCreateFromTemplate}
      />
      {/* 模版中心 */}
      <ProjectTemplate
        open={state.openTemplateModal}
        onClose={closeTemplate}
        onCreateFromBlank={onCreateFromBlank}
      />
      {/* 导入DSL */}
      <ImportDsl open={state.openImportModal} onClose={closeImport} />
    </>
  );
};
export default Project;
