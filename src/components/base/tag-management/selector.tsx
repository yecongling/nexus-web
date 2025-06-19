import type { HtmlContentProps } from '@/components/popover';
import { tagsService } from '@/services/common/tags/tagsApi';
import type { Tag } from '@/services/common/tags/tagsModel';
import { useTagStore } from '@/stores/useTagStore';
import cn from '@/utils/classnames';
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
  const trigger = () => {
    return (
      <div className={cn(
        'relative'
      )}>

      </div>
    )
  }

  return <div>标签选择器</div>;
};
export default TagSelector;
