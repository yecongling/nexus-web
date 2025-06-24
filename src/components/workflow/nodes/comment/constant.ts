export type CommentEditorFormField = {
  Size: 'size';
  Note: 'note';
};

/** 编辑器事件 */
export type CommentEditorEvent = {
  /** 内容变更事件 */
  Change: 'change';
  /** 多选事件 */
  MultiSelect: 'multiSelect';
  /** 单选事件 */
  Select: 'select';
  /** 失焦事件 */
  Blur: 'blur';
};

export const CommentEditorDefaultValue = '';
