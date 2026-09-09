import { type ClassValue, cn } from 'cn';

/**
 * tailwindcss 合并类名工具函数
 * @param cls
 * @returns
 */
const classNames = (...cls: ClassValue[]) => {
  return cn(...cls);
};

export default classNames;
