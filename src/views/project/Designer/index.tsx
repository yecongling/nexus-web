import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./designer.scss";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

/**
 * 项目设计界面
 * @returns
 */
const Designer: React.FC = () => {
  // 路由跳转
  const navigate = useNavigate();
  // 逻辑流程图对象
  const refContainer = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  useEffect(() => {
    if (!refContainer.current) {
      return;
    }
  }, []);

  return (
    <div className="w-full flex flex-auto">
      {/* 左边可收缩部分 */}
      <div className="w-[300px] h-full border-r-[1px] border-solid border-[#ddd] fixed z-20 hidden">
        左边列表，可收缩
      </div>
      {/* 右边设计部分 */}
      <div className="w-full h-full">
        {/* 画布 */}
        <div className="w-full h-full" ref={refContainer}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};
export default Designer;
