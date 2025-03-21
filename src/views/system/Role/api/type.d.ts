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
  pageNum: number;
  pageSize: number;
}

// 定义 state 的类型
export interface RoleState {
  // 编辑窗口的打开状态
  openEditModal: boolean;
  // 角色用户分配窗口的打开状态
  openRoleUserModal: boolean;
  // 角色菜单分配窗口的打开状态
  openRoleMenuModal: boolean;
  // 当前编辑的行数据
  currentRow: any | null;
  // 当前选中的行数据
  selectedRows: any[];
  // 当前操作
  action: string;
}

// 定义 action 的类型
export interface RoleAction {
  [key: string]: any;
}
