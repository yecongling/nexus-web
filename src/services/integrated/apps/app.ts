import type { Tag } from '@/services/common/tags/tagsModel';

/**
 * 项目
 */
export interface App {
  // 项目id
  id: string;
  // 项目名称
  name: string;
  // 项目类型
  type: number;
  // 项目状态
  status?: number;
  // 项目优先级
  priority?: number;
  // 日志级别
  logLevel: number;
  // 备注
  remark?: string;
  // 创建时间
  createTime?: string;
  // 更新时间
  updateTime?: string;
  // 创建人
  createBy?: string;
  createUser?: string;
  // 更新人
  updateBy?: string;
  updateUser?: string;
  // 标签
  tags: Tag[];

  /**
   * Icon
   */
  icon_type: AppIconType | null;
  icon: string;
  iconBg: string | null;
  icon_url: string | null;
}

export type AppIconType = 'image' | 'emoji';

export interface AppModalState {
  // 打开新增项目弹窗
  openAddModal: boolean;
  // 打开模板项目弹窗
  openTemplateModal: boolean;
  // 打开上传项目弹窗
  openImportModal: boolean;
}

/**
 * 项目查询参数
 */
export interface AppSearchParams {
  // 项目名称
  name?: string;
  // 项目类型
  type?: number;
  // 页码
  pageNum: number;
  // 每页条数
  pageSize: number;
  // 是否是我创建的
  isMine?: boolean;
  // 标签
  tags?: string[];
}
