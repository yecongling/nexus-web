/**
 * 字典相关接口
 */
export enum DictApi {
  /**
   * 查询字典数据
   */
  getDictList = '/system/dict/getDictList',

  /**
   * 创建字典
   */
  addDict = '/system/dict/addDict',
  /**
   * 删除字典
   */
  deleteDict = '/system/dict/deleteDict',
  /**
   * 更新字典
   */
  updateDict = '/system/dict/updateDict',

  /**
   * 查询字典条目
   */
  getDictItemList = '/system/dict/getDictItemList',
  /**
   * 创建字典条目
   */
  addDictItem = '/system/dict/addDictItem',
  /**
   * 删除字典条目
   */
  deleteDictItem = '/system/dict/deleteDictItem',
  /**
   * 更新字典条目
   */
  updateDictItem = '/system/dict/updateDictItem',
}
