import { assignRoleUser, getRoleUser } from '@/api/system/role/roleApi';
import {
  CloseOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  ManOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import {
  App,
  Button,
  Card,
  Col,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  type InputRef,
  Row,
  Select,
  Space,
  Table,
  type TableProps,
} from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import AddUser from './AddUser';

/**
 * 给角色分配用户
 * @returns
 */
const RoleUserDrawer: React.FC<RoleUserDrawerProps> = ({
  open,
  roleId,
  onCancel,
}) => {
  const { modal } = App.useApp();
  // 用户表格数据
  const [tableData, setTableData] = useState<any[]>([]);
  // 添加用户弹窗的打开关闭
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);
  // 检索表单
  const [form] = Form.useForm();
  // 当前选中的行数据
  const [selRows, setSelectedRows] = useState<any[]>([]);
  // 数据总条数
  const [total, setTotal] = useState<number>(0);
  // 第一个检索框
  const ref = useRef<InputRef>(null);
  // 分页参数
  const [pagination, setPagination] = useState<{
    pageNumber: number;
    pageSize: number;
  }>({
    pageNumber: 1,
    pageSize: 20,
  });

  useEffect(() => {
    if (!open) return;
    // 获取当前角色已经分配的用户
    getRoleUserByPage();
    setSelectedRows([]);
  }, [open]);

  /**
   * 分页查询数据
   * @param params 查询参数
   */
  const getRoleUserByPage = useCallback(() => {
    getRoleUser({
      roleId,
      // 表单数据
      searchParams: form.getFieldsValue(),
      pageNum: pagination.pageNumber,
      pageSize: pagination.pageSize,
    }).then((resp) => {
      // 设置表格数据
      setTableData(resp.data);
      // 设置数据总条数
      resp.total && setTotal(resp.total);
      ref.current?.focus();
    });
  }, [pagination]);

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
      width: 80,
      align: 'center',
      hidden: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: 80,
      align: 'left',
    },
    {
      title: '实名',
      dataIndex: 'realName',
      width: 80,
      align: 'left',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 80,
      align: 'center',
      render: (text) => {
        return text === 1 ? (
          <ManOutlined className="text-blue-400" />
        ) : (
          <WomanOutlined className="text-pink-400" />
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 80,
      fixed: 'right',
      align: 'center',
      render: (_text, record) => {
        return (
          <Button
            type="link"
            danger
            size="small"
            onClick={() => deleteBatch(record.id)}
          >
            移除
          </Button>
        );
      },
    },
  ];

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
   * 表单检索
   */
  const onFinish = () => {
    getRoleUserByPage();
  };

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
    selectedRowKeys: selRows.map((item) => item.id),
  };

  /**
   * 打开添加用户弹窗
   */
  const addUser = () => {
    setOpenAddUser(true);
  };

  /**
   * 取消添加用户
   */
  const cancelAddUser = () => {
    setOpenAddUser(false);
    ref.current?.focus();
  };

  /**
   * 批量删除用户
   * @param id 用户ID
   */
  const deleteBatch = (id?: string) => {
    // 删除操作需要二次确定
    modal.confirm({
      title: '批量删除',
      icon: <ExclamationCircleFilled />,
      content: '确定批量删除用户吗？数据删除后将无法恢复！',
      onOk() {
        // 调用删除接口，删除成功后刷新页面数据
        const ids = selRows.map((item: any) => item.id);
        id && ids.push(id);
        assignRoleUser({
          roleId,
          ids,
          operate: 'delete',
        }).then(() => {
          // 刷新表格数据
          getRoleUserByPage();
          // 清空选择项
          setSelectedRows([]);
        });
      },
    });
  };

  /**
   * 处理确定按钮的点击事件
   * @param count 选中的数量
   */
  const handleOk = (count: number) => {
    // 如果选中的数量为0，则直接关闭弹窗，不刷新表格，否则刷新表格
    if (count === 0) {
      cancelAddUser();
      return;
    }
    getRoleUserByPage();
    cancelAddUser();
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 0,
            },
          },
        }}
      >
        <Drawer
          title="分配用户"
          width={920}
          open={open}
          closeIcon={false}
          extra={
            <Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
          }
          onClose={onCancel}
          classNames={{ footer: 'text-right', body: 'flex flex-col' }}
        >
          <Card className='mb-2!'>
            <Form form={form} onFinish={onFinish}>
              <Row gutter={12}>
                <Col span={6}>
                  <Form.Item
                    className="mb-0"
                    name="username"
                    label="用户名"
                    colon={false}
                  >
                    <Input autoFocus allowClear autoComplete="off" ref={ref} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    className="mb-0"
                    name="realName"
                    label="实际名"
                    colon={false}
                  >
                    <Input allowClear autoComplete="off" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    className="mb-0"
                    name="sex"
                    label="性别"
                    colon={false}
                  >
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
          <Card
            className="mt-2 flex-1 min-h-0"
            styles={{ body: { height: '100%' } }}
          >
            <Space>
              <Button type="primary" onClick={addUser} icon={<PlusOutlined />}>
                添加用户
              </Button>
              <Button
                icon={<DeleteOutlined />}
                danger
                disabled={selRows.length === 0}
                onClick={() => deleteBatch()}
              >
                批量删除
              </Button>
            </Space>
            {/* 表格数据 */}
            <Table
              className="mt-2"
              size="small"
              columns={columns}
              dataSource={tableData}
              bordered
              rowKey="id"
              pagination={{
                pageSize: pagination.pageSize,
                current: pagination.pageNumber,
                showQuickJumper: true,
                hideOnSinglePage: false,
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 条`,
                total: total,
                onChange(page, pageSize) {
                  onPageSizeChange(page, pageSize);
                },
              }}
              scroll={{ x: 'max-content' }}
              rowSelection={{ ...rowSelection }}
            />
          </Card>
        </Drawer>
        {/* 添加用户弹窗 */}
        <AddUser
          roleId={roleId}
          open={openAddUser}
          onCancel={cancelAddUser}
          onOk={handleOk}
        />
      </ConfigProvider>
    </>
  );
};

export default RoleUserDrawer;

export interface RoleUserDrawerProps {
  open: boolean;
  // 角色id
  roleId: string;
  // 点击取消的回调
  onCancel: (e: any) => void;
}
