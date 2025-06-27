import { useMenuStore } from '@/stores/store';
import { useUserStore } from '@/stores/userStore';
import { useCurrentMenuKey } from './useCurrentMenuKey';

/**
 * 结合当前菜单权限，判断用户是否有权限
 * @param requiredPermissions 需要检查的权限数组
 * @param mode "AND"（必须全部匹配） | "OR"（只需匹配一个）
 * @returns {boolean} 是否有权限
 */
export function usePermission(requiredPermissions: string[], mode: 'AND' | 'OR' = 'OR'): boolean {
  const { menus } = useMenuStore();
  const { loginUser } = useUserStore();
  const currentMenuKey = useCurrentMenuKey();
  // 获取当前菜单的权限（如果传入了 currentMenuKey）
  const currentMenu = findMenuByKey(menus, currentMenuKey);
  const menuPermission = currentMenu?.meta?.permissionList || []; // 例如："user:view"
  // 判断是否是管理员
  const isAdmin = loginUser === 'admin';
  if (isAdmin) {
    return true;
  }
  if (mode === 'AND') {
    return requiredPermissions.every((perm) => menuPermission.includes(perm));
  }
  return requiredPermissions.some((perm) => menuPermission.includes(perm));
}

/**
 * 递归查找菜单
 * @param menus 菜单数组
 * @param key 要查找的菜单的 key
 * @returns 找到的菜单对象或 null
 */
function findMenuByKey(menus: any[], key: string | undefined): any | null {
  for (const menu of menus) {
    if (menu.id === key) {
      return menu; // 找到匹配的菜单项
    }
    if (menu.children) {
      const found = findMenuByKey(menu.children, key);
      if (found) return found; // 递归查找子菜单
    }
  }
  return null;
}
