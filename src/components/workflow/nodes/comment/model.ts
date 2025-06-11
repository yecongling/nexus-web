import { Emitter } from "@flowgram.ai/free-layout-editor";
import { CommentEditorDefaultValue } from "./constant";

/**
 * 注释节点编辑模型
 */
export class CommentEditorModel {
    private innerValue: string = CommentEditorDefaultValue;

    private emitter: Emitter = new Emitter();
}