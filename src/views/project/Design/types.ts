/**
 * 项目
 */
export interface Project {
  // 项目id
  id: string;
  // 项目名称
  name: string;
  // 项目类型
  type: number;
  // 项目状态
  status: number;
  // 项目优先级
  priority: number;
  // 日志级别
  logLevel: number;
  // 背景图
  background?: string;
  // 备注
  remark?: string;
  // 创建时间
  createTime?: string;
  // 更新时间
  updateTime?: string;
  // 创建人
  createBy?: string;
  // 更新人
  updateBy?: string;
}
