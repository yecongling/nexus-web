import { Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import WorkflowEditor from '@/components/workflow';
import { usePreferencesStore } from '@/stores/store';
import NodeAddPanel from './node-add-panel';
import './workflow.module.scss';

/**
 * 流程编排
 * @returns
 */
const Workflow: React.FC = () => {
  // 获取数据的钩子函数
  const { preferences } = usePreferencesStore();
  const { theme } = preferences;
  // 获取路由参数（应用ID）
  const { appId } = useParams();
  // 路由跳转
  const navigate = useNavigate();

  const redirectApps = () => {
    navigate('/integrated/apps');
  };

  useEffect(() => {
    // 监听主题变化
    document.documentElement.style.setProperty('--g-workflow-line-color-default', theme.colorPrimary);
  }, [theme.colorPrimary]);

  return (
    <div className="w-full flex h-full">
      <div className="w-[220px] h-full flex flex-col justify-between border-r-[1px] border-solid border-[#ddd] bg-white">
        <div className="flex justify-center align-middle">
          <Button type="text" onClick={redirectApps}>
            应用中心
          </Button>
        </div>
        <div className="flex-auto">
          <NodeAddPanel />
        </div>
      </div>

      <div className="w-full flex flex-auto">
        {/* 左边可收缩部分 */}
        <div className="w-[300px] h-full border-r-[1px] border-solid border-[#ddd] fixed z-20 hidden">
          上面一栏的各种操作按钮和功能
        </div>
        {/* 右边设计部分 */}
        <div className="w-full h-full">
          {/* 画布 */}
          <div className="w-full h-full">
            <WorkflowEditor id={appId} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Workflow;
