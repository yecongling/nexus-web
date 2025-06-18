import {
  EditOutlined,
  EllipsisOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExportOutlined,
  SwitcherOutlined,
} from '@ant-design/icons';
import { Divider, App as AntdApp } from 'antd';
import './apps.scss';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { App } from '@/services/integrated/apps/app';
import clsx from '@/utils/classnames';
import { usePermission } from '@/hooks/usePermission';
import CustomPopover, { type HtmlContentProps } from '@/components/popover';
import DuplicateAppModal, {
  type DuplicateAppModalProps,
} from './duplicate-modal';
import { useTranslation } from 'react-i18next';
import EditAppModal from './edit-app-modal';
import { appsService } from '@/services/integrated/apps/appsApi';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import TagSelector from '@/components/base/tag-management/selector';
import SwitchAppModal from './swith-app-modal';
import type { Tag } from '@/services/common/tags/tagsModel';

/**
 * 应用
 * @returns
 */
const AppCard: React.FC<AppCardProps> = ({ app, onRefresh }) => {
  const { id, name, type, remark = '' } = app;
  const navigate = useNavigate();
  const { message, modal } = AntdApp.useApp();
  const [showEditModal, setShowEditModal] = useState(false);
  // 复制弹窗
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>(app.tags);
  // 是否有编辑权限
  const hasEditorPermission = usePermission(['engine.app.edit']);
  const { t } = useTranslation();

  // 这个会在应用卡片编辑了标签后，去更新右上角的全部标签列表数据
  const queryClient = useQueryClient();
  // 这里是编辑了标签后调用
  // queryClient.invalidateQueries({
  //   queryKey: ['integrated_apps_tagsFilter'],
  // });

  useEffect(() => {
    setTags(app.tags);
  }, [app.tags]);

  /**
   * 应用流程设计
   */
  const redirectWorkflow = (e: React.MouseEvent) => {
    e.preventDefault();
    // 跳转到流程编排界面
    navigate(`/integrated/app/${id}/workflow`);
  };

  // 处理应用修改
  const updateAppMutation = useMutation({
    mutationFn: (app: Partial<App>) => appsService.updateApp(app),
    onSuccess: () => {
      message.success(t('app.updateApp.success'));
      onRefresh?.();
      // 关闭编辑弹窗
      setShowEditModal(false);
    },
    onError: (error) => {
      modal.error({
        title: t('app.updateApp.error.title'),
        content: t('app.updateApp.error.content', { error: error.message }),
      });
    },
  });

  // 处理应用删除
  const deleteAppMutation = useMutation({
    mutationFn: (id: string) => appsService.deleteApp(id),
    onSuccess: () => {
      message.success(t('app.deleteApp.success'));
      onRefresh?.();
    },
    onError: (error) => {
      modal.error({
        title: t('app.deleteApp.error.title'),
        content: t('app.deleteApp.error.content', { error: error.message }),
      });
    },
  });

  /**
   * 复制应用
   */
  const copyAppMutation = useMutation({
    mutationFn: (app: Partial<App>) => appsService.copyApp(app),
    onSuccess: () => {
      message.success(t('app.copyApp.success'));
      // 刷新列表
      onRefresh?.();
      // 关闭复制弹窗
      setShowDuplicateModal(false);
      // 考虑是否跳转到应用编排页面
    },
    onError: (error) => {
      modal.error({
        title: t('app.copyApp.error.title'),
        content: t('app.copyApp.error.content', { error: error.message }),
      });
    },
  });

  /**
   * 确认删除应用
   */
  const onConfirmDelete = useCallback(() => {
    deleteAppMutation.mutate(id);
  }, [app.id, onRefresh]);

  /**
   * 编辑应用
   */
  const onEdit = useCallback(async () => {
    updateAppMutation.mutate(app);
  }, [app.id]);

  /**
   * 复制应用(有一个复制弹窗)
   */
  const onCopy: DuplicateAppModalProps['onConfirm'] = async ({
    name,
    icon_type,
    icon,
    icon_background,
  }) => {
    copyAppMutation.mutate({
      name,
      icon_type,
      icon,
      icon_background,
    });
  };

  /**
   * 导出应用
   */
  const onExport = async () => {};

  /**
   * 导出检测
   */
  const exportCheck = async () => {};

  /**
   * 切换应用
   * @param type 应用类型
   */
  const onSwitch = (type?: number) => {};

  /**
   * 操作部分
   * @param props
   */
  const Operations = (props: HtmlContentProps): React.ReactNode => {
    const onMouseLeave = async () => {
      props.onClose?.();
    };

    // 点击设置
    const onClickSetting = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      props.onClick?.();
      e.preventDefault();
      setShowEditModal(true);
    };

    // 点击复制
    const onClickDuplicate = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      props.onClick?.();
      e.preventDefault();
      setShowDuplicateModal(true);
    };

    // 点击导出
    const onClickExport = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      props.onClick?.();
      e.preventDefault();
      exportCheck();
    };

    // 点击切换
    const onClickSwitch = async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      props.onClick?.();
      e.preventDefault();
      setShowSwitchModal(true);
    };

    // 点击删除
    const onClickDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      props.onClick?.();
      e.preventDefault();
      // 询问是否删除
      modal.confirm({
        title: t('app.deleteAppConfirmTitle'),
        content: t('app.deleteAppConfirmContent'),
        width: 480,
        onOk: onConfirmDelete,
      });
    };
    return (
      <div className="relative w-full py-1" onMouseLeave={onMouseLeave}>
        <button
          type="button"
          className="mx-1 flex h-8 w-[calc(100%_-_8px)] cursor-pointer items-center gap-2 rounded-lg px-3 py-[6px] hover:bg-[#c8ceda33]"
          onClick={onClickSetting}
        >
          <span className="text-[13px] text-zinc-500">
            <EditOutlined className="w-4 h-4 mr-2" />
            {t('app.editApp')}
          </span>
        </button>
        <Divider className="!my-1" />
        <button
          type="button"
          className="mx-1 flex h-8 w-[calc(100%_-_8px)] cursor-pointer items-center gap-2 rounded-lg px-3 py-[6px] hover:bg-[#c8ceda33]"
          onClick={onClickDuplicate}
        >
          <span className="text-[13px] text-zinc-500">
            <CopyOutlined className="w-4 h-4  mr-2" />
            {t('app.duplicate')}
          </span>
        </button>
        <button
          type="button"
          className="mx-1 flex h-8 w-[calc(100%_-_8px)] cursor-pointer items-center gap-2 rounded-lg px-3 py-[6px] hover:bg-[#c8ceda33]"
          onClick={onClickExport}
        >
          <span className="text-[13px] text-zinc-500">
            <ExportOutlined className="w-4 h-4  mr-2" />
            {t('app.export')}
          </span>
        </button>
        {app.type === 1 && (
          <>
            <Divider className="!my-1" />
            <div
              className="mx-1 flex h-9 cursor-pointer items-center rounded-lg px-3 py-2 hover:bg-[#c8ceda33]"
              onClick={onClickSwitch}
            >
              <span className="text-sm leading-5 text-zinc-500">
                <SwitcherOutlined className="w-4 h-4 mr-2" />
                {t('app.switch')}
              </span>
            </div>
          </>
        )}
        <Divider className="!my-1" />
        <div
          className="group mx-1 flex h-8 w-[calc(100%_-_8px)] cursor-pointer items-center gap-2 rounded-lg px-3 py-[6px] hover:bg-[#fef3f2]"
          onClick={onClickDelete}
        >
          <span className="text-[13px] text-zinc-500 group-hover:text-red-500">
            <DeleteOutlined className="w-4 h-4 mr-2" />
            {t('common.operation.delete')}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        onClick={(e) => redirectWorkflow(e)}
        className="group relative col-span-1 inline-flex h-[160px] cursor-pointer bg-[#fcfcfd] border-[#fff] flex-col rounded-xl border-[1px] border-solid shadow-sm transition-all duration-200 ease-in-out hover:shadow-lg"
      >
        <div className="flex h-[66px] shrink-0 grow-0 items-center gap-3 px-[14px] pb-3 pt-[14px]">
          {/* icon */}
          <div className="relative shrink-0">icon</div>
          {/* 应用名称 */}
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
        <div
          className={clsx(
            'absolute bottom-1 left-0 right-0 h-[42px] shrink-0 items-center pb-[6px] pl-[14px] pr-[6px] pt-1',
            tags.length ? 'flex' : '!hidden group-hover:!flex',
          )}
        >
          {hasEditorPermission && (
            <>
              <div
                className="flex w-0 grow items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <div
                  className={clsx(
                    'mr-[41px] w-full grow group-hover:!mr-0 group-hover:!block',
                    tags.length ? '!block' : '!hidden',
                  )}
                >
                  {/* 标签过滤器 */}
                  <TagSelector
                    position="bl"
                    type="app"
                    targetID={id}
                    value={tags.map((tag) => tag.id)}
                    selectedTags={tags}
                    onCacheUpdate={setTags}
                    onChange={onRefresh}
                  />
                </div>
              </div>
              <div className="mx-1 !hidden h-[14px] w-[1px] shrink-0 group-hover:!flex" />
              <div className="!hidden shrink-0 group-hover:!flex">
                {/* 这里是下拉选择编辑 */}
                <CustomPopover
                  htmlContent={<Operations />}
                  position="br"
                  trigger="click"
                  btnElement={
                    <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md">
                      <EllipsisOutlined className="h-4 w-4" />
                    </div>
                  }
                  btnClassName={(open) =>
                    clsx(
                      open ? '!bg-black/5 !shadow-none' : '!bg-transparent',
                      'h-8 w-8 rounded-md border-none !p-2 hover:!bg-black/5',
                    )
                  }
                  popupClassName={
                    app.type === 1
                      ? '!w-[256px] translate-x-[-224px]'
                      : '!w-[160px] translate-x-[-128px]'
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
      {/* 编辑框 */}
      {showEditModal && (
        <EditAppModal
          open={showEditModal}
          appName={name}
          appIcon={app.icon}
          appMode={type}
          appDescription={remark || ''}
          onCancel={() => {
            setShowEditModal(false);
          }}
          onConfirm={onEdit}
        />
      )}
      {/* 复制框 */}
      {showDuplicateModal && (
        <DuplicateAppModal
          appName={name}
          icon_type={app.icon_type}
          icon={app.icon}
          icon_url={app.icon_url}
          icon_background={app.icon_background}
          show={showDuplicateModal}
          onCancel={() => {
            setShowDuplicateModal(false);
          }}
          onConfirm={onCopy}
        />
      )}
      {/* 切换应用类型弹窗 */}
      {showSwitchModal && <SwitchAppModal />}
    </>
  );
};
export default AppCard;

/**
 * 应用组件属性
 */
export interface AppCardProps {
  /**
   * 应用数据
   */
  app: App;

  /**
   * 刷新应用列表
   * @returns
   */
  onRefresh?: () => void;
}
