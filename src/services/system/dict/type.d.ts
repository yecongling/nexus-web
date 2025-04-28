/**
 * @description: 数据字典模块检索参数
 */
export interface DictSearchParams {
  // 字典名称
  dictName?: string;
  // 字典编码
  dictCode?: string;
  pageNum: number;
  pageSize: number;
}

export interface DictItemSearchParams {
  // 字典项名称
  itemText?: string;
  pageNum: number;
  pageSize: number;
}

/**
 * 字典模型
 */
export interface DictModel {
  // 唯一标识
  id: string;
  dictCode: string;
  dictName: string;
  type: number;
  remark?: string;
  delFlag: boolean;
  // 具体字典项
  items: DictItemModel[];
}

/**
 * 字典项模型
 */
export interface DictItemModel {
  id: string;
  dictId: string;
  itemText: string;
  itemValue: string;
  itemColor: string;
  itemSort: number;
  isDefault: boolean;
  remark?: string;
  status: number;
}

// 定义state类型
export interface DictState {
  // 编辑窗口的打开状态
  openEditModal: boolean;
  // 当前编辑的行数据
  editRow?: DictModel | null;
  // 当前选中的行数据
  selectRow?: DictModel[];
  // 当前操作
  action?: string;
}
