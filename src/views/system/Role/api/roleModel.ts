/**
 * 系统角色
 */
export interface SysRole {
  /**
   * 角色ID
   */
  id: string;

  /**
   * 角色编码
   */
  roleCode: string;

  /**
   * 角色名称
   */
  roleName: string;

  /**
   * 角色类型
   */
  roleType: string;

  /**
   * 角色状态
   */
  status: string;

  /**
   * 角色描述
   */
  remark?: string;
}

/**
 * 角色查询参数
 */
export interface RoleSearchParams {
  /**
   * 角色编码
   */
  roleCode?: string;
  /**
   * 角色名称
   */
  roleName?: string;
  /**
   * 角色状态
   */
  status?: string;
}
