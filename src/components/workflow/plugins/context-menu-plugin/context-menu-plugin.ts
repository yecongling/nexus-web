import {
  definePluginCreator,
  type FreeLayoutPluginContext,
  type PluginCreator,
} from '@flowgram.ai/free-layout-editor';
import { ContextMenuLayer } from './context-menu-layer';

export interface ContextMenuPluginOptions {
  name?: string;
}

/**
 * A plugin that adds a context menu to the playground.
 */
export const createContextMenuPlugin: PluginCreator<ContextMenuPluginOptions> =
  definePluginCreator<ContextMenuPluginOptions, FreeLayoutPluginContext>({
    onInit(ctx, opts) {
      ctx.playground.registerLayer(ContextMenuLayer);
    },
  });
