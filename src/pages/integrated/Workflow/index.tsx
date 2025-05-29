import { useNavigate, useParams } from 'react-router';
import './workflow.module.scss';

import { useRef } from 'react';
import { Button } from 'antd';

/**
 * 流程编排
 * @returns
 */
const Workflow: React.FC = () => {
  // 获取路由参数（应用ID）
  const { appId } = useParams();

  // 路由跳转
  const navigate = useNavigate();
  // 逻辑流程图对象
  const refContainer = useRef(null);

  const redirectApps = () => {
    navigate('/integrated/apps');
  };

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex justify-center align-middle">
        <div>
          <Button type="text" onClick={redirectApps}>
            应用中心
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-auto">
        {/* 左边可收缩部分 */}
        <div className="w-[300px] h-full border-r-[1px] border-solid border-[#ddd] fixed z-20 hidden">
          左边列表，可收缩 应用ID: {appId}
        </div>
        {/* 右边设计部分 */}
        <div className="w-full h-full">
          {/* 画布 */}
          <div className="w-full h-full" ref={refContainer}>
            画布
          </div>
        </div>
      </div>
    </div>
  );
};
export default Workflow;
