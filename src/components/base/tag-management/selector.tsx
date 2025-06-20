import type { HtmlContentProps } from '@/components/popover';
import CustomPopover from '@/components/popover';
import { tagsService } from '@/services/common/tags/tagsApi';
import type { Tag } from '@/services/common/tags/tagsModel';
import { useTagStore } from '@/stores/useTagStore';
import cn from '@/utils/classnames';
import { TagOutlined } from '@ant-design/icons';
import type React from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type TagSelectorProps = {
  // 对应的应用ID
  targetID: string;
  isPopover?: boolean;
  position?: 'bl' | 'br';
  type: string;
  value: string[];
  selectedTags: Tag[];
  onCacheUpdate: (tags: Tag[]) => void;
  onChange?: () => void;
};

type PanelProps = {
  onCreate: () => void;
} & HtmlContentProps &
  TagSelectorProps;

/**
 * 标签面板
 */
const Panel: React.FC<PanelProps> = (props) => {
  return <div>标签面板</div>;
};

/**
 * 标签选择器
 */
const TagSelector: React.FC<TagSelectorProps> = ({
  targetID,
  isPopover = true,
  position,
  type,
  value,
  selectedTags,
  onCacheUpdate,
  onChange,
}) => {
  const { t } = useTranslation();
  const { tagList, setTagList } = useTagStore();

  /**
   * 获取标签列表
   * @returns 标签列表
   */
  const getTagList = async () => {
    const tags = await tagsService.getTagsList(type);
    setTagList(tags);
  };

  /**
   * 用于显示选中标签的内容
   */
  const triggerContent = useMemo(() => {
    if (selectedTags?.length) {
      return selectedTags
        .filter((tag) => tagList.find((t) => t.id === tag.id))
        .map((tag) => tag.name)
        .join(', ');
    }
    return '';
  }, [selectedTags, tagList]);

  /**
   * 触发器内容
   * @returns 触发器内容
   */
  const Trigger = () => {
    return (
      <div
        className={cn(
          'relative flex w-full cursor-pointer items-center gap-1 rounded-md px-2 py-[7px] hover:bg-[#c8ceda33]',
        )}
      >
        <TagOutlined className="h-3 w-3 shrink-0" />
        <div className="text-[#98a2b2] grow truncate text-start text-[13px] font-[400] leading-4">
          {!triggerContent ? t('common.tag.addTag') : triggerContent}
        </div>
      </div>
    );
  };

  return (
    <>
      {isPopover && (
        <CustomPopover
          htmlContent={
            <Panel
              type={type}
              targetID={targetID}
              value={value}
              selectedTags={selectedTags}
              onCacheUpdate={onCacheUpdate}
              onChange={onChange}
              onCreate={getTagList}
            />
          }
          position={position}
          trigger="click"
          btnElement={<Trigger />}
          btnClassName={(open) =>
            cn(
              open ? '!bg-[#c8ceda33] !text-[#101828]' : '!bg-transparent',
              '!w-full !border-0 !p-0 !text-[#101828] hover:!bg-[#c8ceda33] hover:!text-[#101828]',
            )
          }
          popupClassName="!w-full !ring-0"
          className="!z-20 h-fit !w-full"
        />
      )}
    </>
  );
};
export default TagSelector;
