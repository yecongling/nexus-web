import {
  EditOutlined,
  NodeIndexOutlined,
  EllipsisOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExportOutlined,
  FileOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Card, Button, Dropdown, type MenuProps } from 'antd';
import './apps.scss';
import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import type { App, Tag } from '@/services/integrated/apps/types';
import clsx from 'clsx';
import { usePermission } from '@/hooks/usePermission';
import CustomPopover, { type HtmlContentProps } from '@/components/popover';
import DuplicateAppModal from './DuplicateAppModal';

/**
 * 项目组件
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

  /**
   * 项目流程设计
   */
  const redirectWorkflow = () => {
    // 跳转到流程编排界面
    navigate(`/app/${id}/workflow`);
  };

  /**
   * 确认删除项目
   */
  const onConfirmDelete = useCallback(() => {}, [app.id]);

  /**
   * 编辑项目
   */
  const onEdit = useCallback(() => {}, [app.id]);

  /**
   * 复制项目(有一个复制弹窗)
   */
  const onCopy = async () => {};

  /**
   * 导出项目
   */
  const onExport = async () => {};

  /**
   * 切换项目
   * @param type 项目类型
   */
  const onSwitch = (type?: number) => {};

  /**
   * 操作部分
   * @param props
   */
  const Operations = (props: HtmlContentProps): React.ReactNode => {
    return <>编辑</>;
  };

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
                  position="bottomRight"
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
      {showEditModal && <div>编辑弹窗</div>}
      {/* 复制框 */}
      {showDuplicateModal && <DuplicateAppModal />}
      {/* 确认删除弹窗 */}
      {showConfirmDelete && <div>确认删除弹窗</div>}
    </>
  );
});
export default AppCard;

/**
 * 项目组件属性
 */
export interface AppCardProps {
  /**
   * 项目数据
   */
  app: App;

  /**
   * 刷新项目列表
   * @returns
   */
  onRefresh?: () => void;
}
