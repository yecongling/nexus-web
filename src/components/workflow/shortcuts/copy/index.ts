import {
  type FreeLayoutPluginContext,
  type ShortcutsHandler,
  WorkflowDocument,
  WorkflowSelectService,
} from '@flowgram.ai/free-layout-editor';
import { FlowCommandId } from '../constants';

/**
 * 复制快捷键
 */
export class CopyShortcut implements ShortcutsHandler {
  // 快捷键id
  public commandId = FlowCommandId.Copy;

  // 快捷键
  public shortcuts = ['meta c', 'ctrl c'];

  // 文档对象
  private document: WorkflowDocument;

  // 节点选中服务
  private selectService: WorkflowSelectService;

  constructor(context: FreeLayoutPluginContext) {
    this.document = context.get(WorkflowDocument);
    this.selectService = context.get(WorkflowSelectService);
    this.execute = this.execute.bind(this);
  }

  /**
   * 判定快捷键是否可用
   */
  isEnabled?: ((...args: any[]) => boolean) | undefined;

  /**
   * 快捷键按下后执行的操作
   */
  public async execute(): Promise<void> {
    console.log('执行复制操作');
  }
}
