import { Button, Col, Form, Input, message, Modal, Row, Space, Table, TableProps, Typography } from "antd";
import { useState } from "react";
import { Pencil, Plus, ReceiptText, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useCreateLocation } from "../../hooks/operations/useCreate";
import { useLocations } from "../../hooks/operations/useFetch";
import { useUpdateLocation } from "../../hooks/operations/useUpdate";
import { useDeleteLocation } from "../../hooks/operations/useDelete";


const {Text} = Typography;

export const Locations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');
  const { 
    data,
    isLoading,
    isError,
    error
  } = useLocations({page:1, size:10, search: ''});

  const createLocationMutation = useCreateLocation();
  const updateLocationMutation = useUpdateLocation();
  const deleteLocationMutation = useDeleteLocation();

  const tableData = data?.data?.data.map((location) => ({
    key: String(location.id),
    id: location.id,
    tables: location.tables,
    address: location.address,
    city: location.city,
    country: location.country,
    state: location.state,
    zipCode: location.zipCode,
  
  })) || [];

  const handleCreateLocation = () => {
    form.validateFields().then((values) => {
      createLocationMutation.mutate(values, {
        onSuccess: () => {
          message.success('Customer created succesfully');
          setIsModalOpen(false);
          form.resetFields();
        },
      });
    });
  };

  const handleEditLocation = (location: any) => {
    setSelectedLocation(location);
    form.setFieldsValue(location);
    setIsEditModalOpen(true);
  };

  const handleUpdateLocation = () => {
    form.validateFields().then((values) => {
      updateLocationMutation.mutate(
        { locationId: selectedLocation.id, updatedData: values },
        {
          onSuccess: () => {
            message.success('Location updated successfully');
            setIsEditModalOpen(false);
            form.resetFields();
          },
        }
      );
    });
  };

  if (isLoading) return <div>Loading locations...</div>;
  if (isError) return <div>Error: {String(error)}</div>;

  const handleDeleteLocation = (locationId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this customer?",
      content: "This action cannot be undone.",
      onOk: () => {
        deleteLocationMutation.mutate(locationId, {
          onSuccess: () => message.success("Customer deleted successfully"),
        });
      },
    });
  };

  const columns: TableProps<typeof tableData[number]>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tables', dataIndex: 'tables', key: 'tables', render: (val: string) => val || '—' },
    { title: 'Address', dataIndex: 'address', key: 'address', render: (val: string | null) => val || '—' },
    { title: 'City', dataIndex: 'city', key: 'city', render: (val: string | null) => val || '—' },
    { title: 'Country', dataIndex: 'country', key: 'country', render: (val: string | null) => val || '—' },
    { title: 'State', dataIndex: 'state', key: 'state', render: (val: string | null) => val || '—' },
    { title: 'ZipCode', dataIndex: 'zipCode', key: 'zipCode', render: (val: string | null) => val || '—' },
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
            onClick={() => handleEditLocation(record)}
          />
          <Button type="text" icon={<Trash2 size={18} />} onClick={() => handleDeleteLocation(record.id)} />
        </Space>
      ),
    },
  ];


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
      <Modal title="Add Location" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleCreateLocation}>
        <Form form={form} layout="vertical">
          <Form.Item label="Tables" name="tables" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="City" name="city" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item label="State" name="state" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item label="ZipCode" name="zipCode" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Country" name="country" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

            {/* Edit Customer Modal */}
      <Modal title="Edit Location" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} onOk={handleUpdateLocation}>
        <Form form={form} layout="vertical">
        <Form.Item label="Tables" name="tables" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="City" name="city" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item label="State" name="state" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item label="ZipCode" name="zipCode" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Country" name="country" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};