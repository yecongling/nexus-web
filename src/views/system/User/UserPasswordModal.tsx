import type React from 'react';
import { memo } from 'react';
import { Input, Form, Progress, Row, Col } from 'antd';
import DragModal from '@/components/modal/DragModal';
import styles from './strengthMeter.module.scss';
import { keys, values } from 'lodash-es';
import { strengthMeterOptions } from './config';
import zxcvbn from 'zxcvbn';

interface UserPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (username: string, password: string) => void;
}

/**
 * 更新用户密码弹窗
 */
const UserPasswordModal: React.FC<UserPasswordModalProps> = memo(
  ({ open, onClose, onSubmit }) => {
    const [form] = Form.useForm();

    // 监听密码改变
    const password = Form.useWatch('password', form);

    /**
     * 监听密码强度
     * @param password 密码
     */
    const watchStrength = (password: string) => {
      const analysisValue = zxcvbn(password);
      // score得分只有0~4，且只有整数范围并没有小数
      return (analysisValue.score + 1) * 20;
    };

    const handleOk = () => {
      // 调用表单验证
      form
        .validateFields()
        .then((values) => {
          const { username, password } = values;
          onSubmit(username, password);
        })
        .catch((errorInfo) => {
          // 滚动并聚焦到第一个错误字段
          form.scrollToField(errorInfo.errorFields[0].name);
          form.focusField(errorInfo.errorFields[0].name);
        });
    };

    return (
      <DragModal
        title="更新用户密码"
        open={open}
        onCancel={onClose}
        onOk={handleOk}
      >
        <Form layout="vertical" form={form}>
          {/* 隐藏的用户ID */}
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="用户名" name="username">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true }, { min: 8, message: '密码至少8个字符' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[
              { required: true },
              { min: 8, message: '密码至少8个字符' },
              {
                validator(_, value) {
                  if (!value || form.getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
        {/* 显示密码强度 */}
        <div className={styles['process-steps']}>
          <Progress
            percent={password ? watchStrength(password) : 0}
            steps={5}
            strokeColor={values(strengthMeterOptions)}
            showInfo={false}
          />
        </div>
        <Row justify="space-around" className={styles['process-steps']}>
          {keys(strengthMeterOptions).map((value: string) => (
            <Col span={4} key={value}>
              {/* 这里后续改造国际化的时候替换 */}
              {value}
            </Col>
          ))}
        </Row>
      </DragModal>
    );
  },
);

export default UserPasswordModal;
