import { useHotkeys } from 'react-hotkeys-hook';

type PlatformHotkeyOptions = {
  mac: string;
  windows: string;
  handler: (event: KeyboardEvent) => void;
};

/**
 * 使用平台相关的快捷键
 * @param mac MacOS 快捷键
 * @param windows Windows 快捷键
 * @param handler 快捷键触发时的处理函数
 * @returns 返回当前使用的快捷键
 */
export const usePlatformHotkey = ({ mac, windows, handler }: PlatformHotkeyOptions) => {
  const isMacOS = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const hotkey = isMacOS ? mac : windows;

  useHotkeys(hotkey, handler);

  return hotkey;
};
