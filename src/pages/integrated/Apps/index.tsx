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
  App as AntdApp,
} from 'antd';
import { useEffect, useReducer, useRef, useState } from 'react';
import './apps.scss';
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
import type { App, AppSearchParams } from '@/services/integrated/apps/app';
import { usePermission } from '@/hooks/usePermission';
import { appsService } from '@/services/integrated/apps/appsApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ImportDsl from './create-from-dsl-modal';
import React from 'react';
import type { AppModalState } from '@/services/integrated/apps/app';
import { isEqual } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import AppCreate from './create-app-modal';
import AppCard from './AppCard';
const { Search } = Input;
// 模版中心
const AppTemplates = React.lazy(
  () => import('./create-app-template/index.tsx'),
);

// 提取关闭弹窗的逻辑
const closeAllModals = (dispatch: React.Dispatch<Partial<AppModalState>>) => {
  dispatch({
    openAddModal: false,
    openTemplateModal: false,
    openImportModal: false,
  });
};

/**
 * 应用设计
 */
const Apps: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { modal } = AntdApp.useApp();

  // 新增弹窗、模版弹窗、导入弹窗
  const [state, dispatch] = useReducer(
    (prev: AppModalState, action: Partial<AppModalState>) => ({
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
  const hasAddPermission = usePermission(['engine:apps:add']);

  // 分段控制器选项
  const segmentedOptions: SegmentedProps<number>['options'] = [
    {
      label: t('apps.segment.all'),
      value: 0,
      icon: <AppstoreOutlined />,
    },
    {
      label: t('apps.segment.integrated'),
      value: 1,
      icon: <ApartmentOutlined />,
    },
    {
      label: t('apps.segment.interface'),
      value: 2,
      icon: <ApiOutlined />,
    },
    {
      label: t('apps.segment.tripartite'),
      value: 3,
      icon: <SolutionOutlined />,
    },
  ];

  // 编辑的应用数据
  const [app, setApp] = useState<App>();

  // 查询参数（包含分页参数）
  const [searchParams, setSearchParams] = useState<AppSearchParams>({
    type: 0,
    pageNum: 1,
    pageSize: 20,
  });

  // 查询应用数据
  const { data: result, refetch } = useQuery({
    queryKey: ['integrated_app', searchParams],
    queryFn: () => appsService.getApps(searchParams),
  });

  // 处理应用新增
  const addAppMutation = useMutation({
    mutationFn: (app: Partial<App>) => appsService.addApp(app),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['integrated_app', searchParams],
      });
    },
    onError: (error) => {
      modal.error({
        title: t('apps.addApp.error.title'),
        content: t('apps.addApp.error.content', { error: error.message }),
      });
    },
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

  /**
   * 我的应用切换
   * @param value 值
   */
  const onCreatedChange = (value: boolean) => {
    setSearchParams({
      ...searchParams,
      isMine: value,
    });
  };

  /**
   * 标签切换
   * @param value 标签值
   */
  const onTagsChange = (value: string[]) => {};

  /**
   * 渲染标签
   * @returns 渲染下拉框
   */

  const renderDropDown = () => {
    return (
      <Card>
        <div className="flex flex-col gap-4">更多标签</div>
      </Card>
    );
  };

  /**
   * 新增应用
   */
  const addApp = () => {
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
   * 从模版创建应用
   */
  const onCreateFromTemplate = () => {
    dispatch({
      openAddModal: false,
      openTemplateModal: true,
      openImportModal: false,
    });
  };

  /**
   * 从空白创建应用
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
   * 新增（编辑）应用确认
   */
  const onModalOk = (app: Partial<App>) => {
    addAppMutation.mutate(app);
  };

  /**
   * 新增应用取消
   */
  const onModalCancel = () => {
    dispatch({
      openAddModal: false,
    });
  };

  return (
    <>
      <div className="flex flex-col h-full pt-2 pr-4 pl-4 bg-[#f5f6f7]">
        <div className="mb-[8px] text-[18px] font-bold">{t('apps.list')}</div>
        {/* 卡片列表和筛选框 */}
        <div className="mb-[8px]">
          <div className="w-[600px] my-4 mx-auto">
            {/* 检索 */}
            <Search
              enterButton={t('common.operation.search')}
              allowClear
              placeholder={t('common.placeholder')}
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
              <Checkbox onChange={(e) => onCreatedChange(e.target.checked)}>
                {t('apps.createBy')}
              </Checkbox>
              <Dropdown popupRender={renderDropDown} trigger={['click']}>
                <Button color="default" variant="filled">
                  <Space>
                    <TagOutlined />
                    {t('apps.allTags')}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
        {/* 应用列表 */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto grid content-start grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 2k:grid-cols-6 gap-4 pt-2 grow relative">
          {/* 数据查询中 */}
          {hasAddPermission && (
            <Card
              className="relative col-span-1 inline-flex flex-col justify-between h-[160px] bg-components-card-bg rounded-xl"
              classNames={{ body: 'grow p-2! rounded-t-xl' }}
            >
              <div className="px-6 pt-2 pb-1 text-xs font-medium leading-[18px] text-[#676f83]">
                {t('apps.newApp.createApp')}
              </div>
              <button
                className="w-full flex items-center mb-1 px-6 py-[7px] rounded-lg text-[13px] font-medium leading-[18px] text-[#676f83] cursor-pointer hover:bg-[#f5f6f7] hover:text-[#1e1e2d] transition-all duration-200 ease-in-out"
                onClick={addApp}
                type="button"
              >
                <PlusOutlined className="text-[#676f83] shrink-0 mr-2 w-4 h-4" />
                {t('apps.newApp.startFromBlank')}
              </button>
              <button
                className="w-full flex items-center px-6 py-[7px] rounded-lg text-[13px] font-medium leading-[18px] text-[#676f83] cursor-pointer hover:bg-[#f5f6f7] hover:text-[#1e1e2d] transition-all duration-200 ease-in-out"
                onClick={openTemplate}
                type="button"
              >
                <FileAddFilled className="text-[#676f83] shrink-0 mr-2 w-4 h-4" />
                {t('apps.newApp.startFromTemplate')}
              </button>
              <button
                className="w-full flex items-center px-6 py-[7px] rounded-lg text-[13px] font-medium leading-[18px] text-[#676f83] cursor-pointer hover:bg-[#f5f6f7] hover:text-[#1e1e2d] transition-all duration-200 ease-in-out"
                onClick={openImport}
                type="button"
              >
                <ExportOutlined className="text-[#676f83] shrink-0 mr-2 w-4 h-4" />
                {t('apps.newApp.importFromDSL')}
              </button>
            </Card>
          )}
          {/* 应用列表 */}
          {(result || []).map((item: App) => (
            <AppCard key={item.id} app={item} onRefresh={refetch} />
          ))}
        </div>
      </div>
      {/* 新增弹窗 */}
      <AppCreate
        open={state.openAddModal}
        onOk={onModalOk}
        onCancel={onModalCancel}
        onCreateFromTemplate={onCreateFromTemplate}
      />
      {/* 模版中心 */}
      <AppTemplates
        open={state.openTemplateModal}
        onClose={closeTemplate}
        onCreateFromBlank={onCreateFromBlank}
      />
      {/* 导入DSL */}
      <ImportDsl open={state.openImportModal} onClose={closeImport} />
    </>
  );
};
export default Apps;
