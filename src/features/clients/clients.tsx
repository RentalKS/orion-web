import { Button, Col, Form, Input, message, Modal, Row, Space, Table, TableProps, Typography } from "antd";
import { useState } from "react";
import { useCustomers } from "./hooks/useCustomers";
import { useCreateCustomer } from "./hooks/useCreateCustomer";
import { Pencil, Plus, ReceiptText, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useUpdateCustomer } from "./hooks/useUpdateCustomer";

const {Text} = Typography;

export const Clients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');
  const { 
    data,
    isLoading,
    isError,
    error
  } = useCustomers({page:1, size:10, search: ''});

  const createCustomerMutation = useCreateCustomer();
  const updateCustomerMutation = useUpdateCustomer();

  const tableData = data?.data?.data.map((customer) => ({
    key: String(customer.id),
    id: customer.id,
    name: customer.name,
    lastName: customer.lastName,
    email: customer.email,
    createdAt: customer.createdAt,
  
  })) || [];

  const columns: TableProps<typeof tableData[number]>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name', render: (val: string) => val || '—' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName', render: (val: string | null) => val || '—' },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val) => <Text>{dayjs(val).format('YYYY-MM-DD HH:mm')}</Text>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="text" icon={<ReceiptText size={18} />} />
          <Button
            type="text"
            icon={<Pencil size={18} />}
            onClick={() => handleEditCustomer(record)}
          />
          <Button type="text" icon={<Trash2 size={18} />} />
        </Space>
      ),
    },
  ];

  const handleCreateCustomer = () => {
    form.validateFields().then((values) => {
      createCustomerMutation.mutate(values, {
        onSuccess: () => {
          message.success('Customer created succesfully');
          setIsModalOpen(false);
          form.resetFields();
        },
      });
    });
  };

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    form.setFieldsValue(customer);
    setIsEditModalOpen(true);
  };

  const handleUpdateCustomer = () => {
    form.validateFields().then((values) => {
      updateCustomerMutation.mutate(
        { customerId: selectedCustomer.id, updatedData: values },
        {
          onSuccess: () => {
            message.success('Customer updated successfully');
            setIsEditModalOpen(false);
            form.resetFields();
          },
        }
      );
    });
  };

  if (isLoading) return <div>Loading customers...</div>;
  if (isError) return <div>Error: {String(error)}</div>;

  return (
    <>
      {/* Top Section: Search + Add Button */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Button type="primary" shape="circle" icon={<Plus size={20} />} onClick={() => setIsModalOpen(true)} />
        </Col>
      </Row>

      {/* Customers Table */}
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{
          current: data?.data.page,
          pageSize: data?.data.size,
          total: data?.data.totalSize,
        }}
      />

      {/* Add Customer Modal */}
      <Modal title="Add Customer" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleCreateCustomer}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

            {/* Edit Customer Modal */}
      <Modal title="Edit Customer" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} onOk={handleUpdateCustomer}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>

  );
};