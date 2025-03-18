import DragModal from '@/components/modal/DragModal';
import {
  assignRoleUser,
  getUserNotInRoleByPage,
} from '@/api/system/role/roleApi';
import {
  SearchOutlined,
  RedoOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  type InputRef,
  Row,
  Select,
  Space,
  Table,
  type TableProps,
} from 'antd';
import { useEffect, useRef, useState } from 'react';

/**
 * 添加用户弹窗
 * @returns
 */
const AddUser: React.FC<AddUserProps> = ({ open, onOk, onCancel, roleId }) => {
  const [form] = Form.useForm();
  // 当前选中的行数据
  const [selRows, setSelectedRows] = useState<any[]>([]);
  // 表格数据
  const [tableData, setTableData] = useState<any[]>([]);
  // 数据总条数
  const [total, setTotal] = useState<number>(0);
  const ref = useRef<InputRef>(null);
  // 分页参数
  const [pagination, setPagination] = useState<{
    pageNumber: number;
    pageSize: number;
  }>({
    pageNumber: 1,
    pageSize: 10,
  });

  useEffect(() => {
    if (!open) return;
    // 获取没有当前角色权限的所有用户
    getUserData();
    // 重置选中的行
    setSelectedRows([]);
  }, [open, pagination]);

  /**
   * 获取用户数据
   */
  const getUserData = () => {
    getUserNotInRoleByPage({
      roleId,
      // 表单数据
      searchParams: form.getFieldsValue(),
      pageNum: pagination.pageNumber,
      pageSize: pagination.pageSize,
    }).then((resp) => {
      setTableData(resp.data);
      resp.total && setTotal(resp.total);
      ref.current?.focus();
    });
  };

  /**
   * 检索表单提交
   */
  const onFinish = () => {
    getUserData();
  };

  /**
   * 定义表格的列
   */
  const columns: TableProps['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      hidden: true,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      width: 120,
      align: 'center',
      hidden: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: 120,
      align: 'left',
    },
    {
      title: '实名',
      dataIndex: 'realName',
      width: 120,
      align: 'left',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 60,
      align: 'center',
      render: (text) => {
        return text === 1 ? (
          <ManOutlined className="text-blue-400" />
        ) : (
          <WomanOutlined className="text-pink-400" />
        );
      },
    },
  ];

  /**
   * 多行选中的配置
   */
  const rowSelection: TableProps['rowSelection'] = {
    // 行选中的回调
    onChange(_selectedRowKeys, selectedRows) {
      setSelectedRows(selectedRows);
    },
    columnWidth: 32,
    fixed: true,
  };

  /**
   * 分页改变事件
   * @param page 页数
   * @param pageSize 每页数量
   */
  const onPageSizeChange = (page: number, pageSize: number) => {
    setPagination({
      pageNumber: page,
      pageSize: pageSize,
    });
  };

  /**
   * 点击确定的操作
   */
  const handleOk = () => {
    if (selRows.length === 0) {
      onOk(0);
      return;
    }
    const userIds = selRows.map((item: any) => item.id);
    // 分配用户
    assignRoleUser({
      roleId,
      ids: userIds,
      operate: 'add',
    }).then(() => {
      onOk(selRows.length);
      // 清空选择项
      setSelectedRows([]);
    });
  };

  return (
    <DragModal
      open={open}
      onCancel={onCancel}
      title="添加用户"
      width={{ xl: 800, xxl: 1000 }}
      onOk={handleOk}
    >
      <Card className='mb-2!'>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={12}>
            <Col span={6}>
              <Form.Item className="mb-0" label="用户名" name="username">
                <Input
                  placeholder="请输入用户名"
                  autoFocus
                  allowClear
                  autoComplete="off"
                  ref={ref}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item className="mb-0" label="真实姓名" name="realName">
                <Input
                  placeholder="请输入真实姓名"
                  allowClear
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item className="mb-0" label="性别">
                <Select
                  allowClear
                  options={[
                    { value: '', label: '请选择', disabled: true },
                    { value: 1, label: '男' },
                    { value: 0, label: '女' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6} style={{ textAlign: 'right' }}>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                >
                  检索
                </Button>
                <Button
                  type="default"
                  icon={<RedoOutlined />}
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card className="mt-2">
        <Table
          size="small"
          title={() => '用户列表'}
          bordered
          rowKey="id"
          columns={columns}
          pagination={{
            pageSize: pagination.pageSize,
            current: pagination.pageNumber,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            total: total,
            onChange(page, pageSize) {
              onPageSizeChange(page, pageSize);
            },
          }}
          dataSource={tableData}
          rowSelection={rowSelection}
        />
      </Card>
    </DragModal>
  );
};
export default AddUser;

export interface AddUserProps {
  open: boolean;
  // 当前角色
  roleId: string;
  // 点击确定(选中的数量)
  onOk: (params: number) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
