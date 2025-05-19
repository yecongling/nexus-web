import {
  EditOutlined,
  EllipsisOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExportOutlined,
  SwitcherOutlined,
} from '@ant-design/icons';
import { Divider } from 'antd';
import './apps.scss';
import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import type { App, Tag } from '@/services/integrated/apps/types';
import clsx from 'clsx';
import { usePermission } from '@/hooks/usePermission';
import CustomPopover, { type HtmlContentProps } from '@/components/popover';
import DuplicateAppModal from './DuplicateAppModal';
import { useTranslation } from 'react-i18next';
import EditAppModal from './components/edit-app-modal';

/**
 * 应用
 * @returns
 */
const AppCard: React.FC<AppCardProps> = memo(({ app, onRefresh }) => {
  const { id, name, type, remark = '' } = app;
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  // 复制弹窗
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>(app.tags || []);
  // 是否有编辑权限
  const hasEditorPermission = usePermission(['engine.app.edit']);
  const { t } = useTranslation();

  /**
   * 应用流程设计
   */
  const redirectWorkflow = () => {
    // 跳转到流程编排界面
    navigate(`/app/${id}/workflow`);
  };

  /**
   * 确认删除应用
   */
  const onConfirmDelete = useCallback(() => {}, [app.id]);

  /**
   * 编辑应用
   */
  const onEdit = useCallback(() => {}, [app.id]);

  /**
   * 复制应用(有一个复制弹窗)
   */
  const onCopy = async () => {};

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
      setShowConfirmDelete(true);
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
            {t('apps.editApp')}
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
            {t('apps.duplicate')}
          </span>
        </button>
        <button
          type="button"
          className="mx-1 flex h-8 w-[calc(100%_-_8px)] cursor-pointer items-center gap-2 rounded-lg px-3 py-[6px] hover:bg-[#c8ceda33]"
          onClick={onClickExport}
        >
          <span className="text-[13px] text-zinc-500">
            <ExportOutlined className="w-4 h-4  mr-2" />
            {t('apps.export')}
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
                {t('apps.switch')}
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
      <div className="group relative col-span-1 inline-flex h-[160px] cursor-pointer bg-[#fcfcfd] border-[#fff] flex-col rounded-xl border-[1px] border-solid shadow-sm transition-all duration-200 ease-in-out hover:shadow-lg">
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
                  标签过滤器
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
      {showEditModal && <EditAppModal open={showEditModal} />}
      {/* 复制框 */}
      {showDuplicateModal && <DuplicateAppModal />}
      {/* 切换应用类型弹窗 */}
      {showSwitchModal && <div>切换应用类型弹窗</div>}
      {/* 确认删除弹窗 */}
      {showConfirmDelete && <div>确认删除弹窗</div>}
    </>
  );
});
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
