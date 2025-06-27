import { matchRoutes, useLocation } from 'react-router';
import { dynamicRoutes } from '@/router/router';

/**
 * 获取当前路由的匹配菜单 key
 * @returns 当前菜单 key（如果找不到，则返回 undefined）
 */
export function useCurrentMenuKey(): string | undefined {
  const location = useLocation();

  // 解析匹配的路由
  const matchedRoutes = matchRoutes(dynamicRoutes as any, location.pathname);
  // 获取最后一个匹配的路由（通常是最具体的路由）
  return matchedRoutes?.[matchedRoutes.length - 1]?.route?.handle?.menuKey;
}
