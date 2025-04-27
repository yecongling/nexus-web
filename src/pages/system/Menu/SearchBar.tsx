import { Form, Input, Select, Button, Row, Col, Space } from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';

type SearchBarProps = {
  onFinish: (values: any) => void;
};

/**
 * 检索表单
 */
const SearchBar: React.FC<SearchBarProps> = ({ onFinish }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item name="name" label="菜单名称" colon={false}>
            <Input autoFocus allowClear autoComplete="off" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="menuType" label="菜单类型" colon={false}>
            <Select
              allowClear
              options={[
                { value: '', label: '请选择', disabled: true },
                { value: 0, label: '一级菜单' },
                { value: 1, label: '子菜单' },
                { value: 2, label: '按钮权限' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="status" label="状态" colon={false}>
            <Select
              allowClear
              options={[
                { value: '', label: '请选择', disabled: true },
                { value: 1, label: '启用' },
                { value: 0, label: '停用' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              检索
            </Button>
            <Button type="default" icon={<RedoOutlined />}>
              重置
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
