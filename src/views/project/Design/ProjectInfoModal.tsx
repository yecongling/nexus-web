import DragModal from '@/components/modal/DragModal';
import type { Project } from './types';
import { Form, Input, Select, type InputRef } from 'antd';
import { useEffect, useRef } from 'react';

/**
 * 添加项目弹窗
 * @returns
 */
const ProjectInfoModal: React.FC<ProjectInfoModalProps> = (props) => {
  const { open, onOk, onCancel, project } = props;
  // 项目表单数据
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (open) {
      // 聚焦第一个输入框
      inputRef.current?.focus();
      // 如果传输了数据则填充表单
      if (project) {
        form.setFieldsValue(project);
      }
    }
  }, [open]);

  /**
   * 点击确认的回调
   */
  const handleOk = () => {
    // 先保存数据
    form
      .validateFields()
      .then((values) => {
        // 然后调用ok
        onOk(values);
      })
      .catch((errorInfo) => {
        // 滚动并聚焦到第一个错误字段
        form.scrollToField(errorInfo.errorFields[0].name);
        form.focusField(errorInfo.errorFields[0].name);
      });
  };
  return (
    <DragModal
      title={project ? '编辑项目' : '新增项目'}
      onCancel={onCancel}
      onOk={handleOk}
      open={open}
      width={650}
    >
      <Form form={form} initialValues={{ type: '1' }} labelCol={{ span: 4 }}>
        {/* 项目ID */}
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        {/* 项目名称 */}
        <Form.Item
          label="项目名称"
          name="name"
          rules={[{ required: true, message: '项目名称必填' }]}
        >
          <Input ref={inputRef} autoComplete="off" allowClear autoFocus />
        </Form.Item>
        {/* 项目类型 */}
        <Form.Item
          label="项目类型"
          name="type"
          rules={[{ required: true, message: '请选择项目类型' }]}
        >
          <Select
            options={[
              { label: '集成项目', value: '1' },
              { label: '接口项目', value: '2' },
              { label: '三方项目', value: '3' },
            ]}
            allowClear
          />
        </Form.Item>
        {/* 日志级别 */}
        <Form.Item
          label="日志级别"
          name="logLevel"
          rules={[{ required: true, message: '请选择日志级别' }]}
        >
          <Select
            options={[
              { label: 'INFO', value: '1' },
              { label: 'WARN', value: '2' },
              { label: 'ERROR', value: '3' },
            ]}
            allowClear
          />
        </Form.Item>
        {/* 优先级 */}
        <Form.Item
          label="优先级"
          name="priority"
          rules={[{ required: true, message: '请选择优先级' }]}
        >
          <Select
            options={[
              { label: '高', value: '1' },
              { label: '中', value: '2' },
              { label: '低', value: '3' },
            ]}
            allowClear
          />
        </Form.Item>
        {/* 背景 */}
        <Form.Item label="背景" name="background">
          <Input allowClear />
        </Form.Item>
        {/* 备注 */}
        <Form.Item label="备注" name="remark">
          <Input.TextArea allowClear />
        </Form.Item>
      </Form>
    </DragModal>
  );
};
export default ProjectInfoModal;

/**
 * 项目弹窗属性
 */
export interface ProjectInfoModalProps {
  /**
   * 窗口是否打开
   */
  open: boolean;
  /**
   * 窗口确认按钮点击回调
   * @returns
   */
  onOk: (project: Project) => void;
  /**
   * 窗口取消按钮点击回调
   * @returns
   */
  onCancel: () => void;

  /**
   * 项目类型
   */
  type?: string;

  /**
   * 项目数据
   */
  project?: Project;
}
