import { menuApis } from './menuApi';
import type { MenuModel } from './menuModel';

/**
 * 菜单管理业务相关操作
 */
export const menuService = {
  /**
   * 查询所有菜单(配合useQuery使用的)
   * @param queryKey 查询参数
   * @returns 菜单列表
   */
  async getAllMenus({ queryKey }: any): Promise<MenuModel[]> {
    const [, params] = queryKey;
    const data = await menuApis.getAllMenus(params);
    // 转换数据
    return menuService.transformMenuData(data);
  },

  /**
   * 转换菜单数据，children没有数据的转换为null
   * @param data
   */
  transformMenuData(data: any) {
    return data.map((item: any) => ({
      ...item,
      children: item.children?.length
        ? menuService.transformMenuData(item.children)
        : null,
    }));
  },
};
