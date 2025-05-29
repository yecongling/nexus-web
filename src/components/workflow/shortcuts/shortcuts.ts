import type {
  FreeLayoutPluginContext,
  ShortcutsRegistry,
} from '@flowgram.ai/free-layout-editor';
import { CopyShortcut } from './copy';

/**
 * 注册快捷键
 *
 * @param shortcutsRegistry 快捷键注册器
 * @param ctx 编辑器上下文
 */
export function shortcuts(
  shortcutsRegistry: ShortcutsRegistry,
  ctx: FreeLayoutPluginContext,
) {
  shortcutsRegistry.addHandlers(new CopyShortcut(ctx));
}
