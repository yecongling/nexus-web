import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

/**
 * tailwindcss 合并类名工具函数
 * @param cls 
 * @returns 
 */
const classNames = (...cls: ClassValue[]) => {
  return twMerge(clsx(cls));
};

export default classNames;
