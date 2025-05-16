type TagFilterProps = {
  type: 'app';
  value: string[];
  onChange: (tag: string[]) => void;
};

/**
 * 标签过滤
 */
const TagFilter: React.FC<TagFilterProps> = ({ type, value, onChange }) => {
  return (
    <div>
      标签过滤
    </div>
  );
}
export default TagFilter;
