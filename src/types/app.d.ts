/**
 * 主题模式
 * @default light
 */
export type ThemeModeType = 'light' | 'dark' | 'auto';

/**
 * 内容紧凑类型
 * @default wide
 */
export type ContentCompactType = 'compact' | 'wide';

/**
 * 布局类型
 */
export type LayoutType =
  | 'full-content'
  | 'header-mixed-nav'
  | 'header-nav'
  | 'header-sidebar-nav'
  | 'mixed-nav'
  | 'sidebar-mixed-nav'
  | 'sidebar-nav';

/**
 * 登录过期模式
 * modal 弹窗模式
 * page 页面模式
 */
export type LoginExpiredModeType = 'modal' | 'page';

/**
 * 偏好设置按钮位置
 * fixed 固定在右侧
 * header 顶栏
 * auto 自动
 */
export type PreferencesButtonPositionType = 'auto' | 'fixed' | 'header';

/**
 * 面包屑样式
 * background 背景
 * normal 默认
 */
export type BreadcrumbStyleType = 'background' | 'normal';

/**
 * 顶栏菜单对齐方式
 */
export type LayoutHeaderMenuAlignType = 'center' | 'end' | 'start';

/**
 * 顶栏菜单风格
 */
export type LayoutHeaderModeType = 'auto' | 'auto-scroll' | 'fixed' | 'static';

/**
 * 标签栏风格
 * brisk 轻快
 * card 卡片
 * chrome 谷歌
 * plain 朴素
 */
export type TabsStyleType = 'brisk' | 'card' | 'chrome' | 'plain';

/**
 * 内置主题类型
 */
export type BuiltinThemeType =
  | 'custom'
  | 'deep-blue'
  | 'deep-green'
  | 'default'
  | 'gray'
  | 'green'
  | 'neutral'
  | 'orange'
  | 'pink'
  | 'red'
  | 'rose'
  | 'sky-blue'
  | 'slate'
  | 'stone'
  | 'violet'
  | 'yellow'
  | 'zinc'
  | (Record<never, never> & string);

/**
 * 预设的内置主题
 */
export interface BuiltinThemePreset {
  // 主题颜色
  color: string;
  // dark模式的初始颜色
  darkPrimaryColor?: string;
  // 初始颜色
  primaryColor?: string;
  type: BuiltinThemeType;
}

/**
 * 页面切换动画
 */
export type PageAnimationType = 'fade' | 'fade-down' | 'fade-slide' | 'fade-up';

/**
 * 导航风格
 * plain 朴素
 * rounded 圆润
 */
export type NavigationStyleType = 'plain' | 'rounded';
