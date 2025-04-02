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

/**
 * 字典模型
 */
export interface DictModel {
  
  id: string;
}

/**
 * 字典项模型
 */
export interface DictItemModel {
  id: string;
}