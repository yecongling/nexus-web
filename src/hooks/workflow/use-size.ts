import { HistoryService, useCurrentEntity, usePlayground, useService } from "@flowgram.ai/free-layout-editor"

/**
 * 判定尺寸
 */
export const useSize = () => {

    // 当前节点
    const node = useCurrentEntity();
    const nodeMeta = node.getNodeMeta();

    const playground = usePlayground();
    const historyService = useService(HistoryService);
    
    const { size = {width: 240, height: 150} } = nodeMeta;
    
    
}