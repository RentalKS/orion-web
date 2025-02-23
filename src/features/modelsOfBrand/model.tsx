import { Button, Col, Form, Input, message, Modal, Row, Space, Table, TableProps, Typography } from "antd";
import { useState } from "react";
import { Pencil, Plus, ReceiptText, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useModels } from "../../hooks/operations/useFetch";
import { useCreateModel } from "../../hooks/operations/useCreate";
import { useUpdateModel } from "../../hooks/operations/useUpdate";
import { useDeleteModel } from "../../hooks/operations/useDelete";

const {Text} = Typography;

export const Models = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');
  const { 
    data,
    isLoading,
    isError,
    error
  } = useModels({page:1, size:10, search: ''});

  const createModelMutation = useCreateModel();
  const updateModelMutation = useUpdateModel();
  const deleteModelMutation = useDeleteModel();

  const tableData = data?.data?.data.map((model) => ({
    key: String(model.id),
    id: model.id,
    name: model?.name,
    type: model.type,
    brandId: model?.brandId,
    seatingCapacity: model.seatingCapacity,
    fuelEfficiency: model.fuelEfficiency,
    modelImageUrl: model?.modelImageUrl,
    // vehicles: model.vehicles,
  
  })) || [];

  const handleCreateModel = () => {
    form.validateFields().then((values) => {
      createModelMutation.mutate(values, {
        onSuccess: () => {
          message.success('Customer created succesfully');
          setIsModalOpen(false);
          form.resetFields();
        },
      });
    });
  };

  const handleEditModel = (model: any) => {
    setSelectedModel(model);
    form.setFieldsValue(model);
    setIsEditModalOpen(true);
  };

  const handleUpdateModel = () => {
    form.validateFields().then((values) => {
      updateModelMutation.mutate(
        { modelId: selectedModel.id, updatedData: values },
        {
          onSuccess: () => {
            message.success('Model updated successfully');
            setIsEditModalOpen(false);
            form.resetFields();
          },
        }
      );
    });
  };

  if (isLoading) return <div>Loading models...</div>;
  if (isError) return <div>Error: {String(error)}</div>;

  const handleDeleteModel = (modelId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this customer?",
      content: "This action cannot be undone.",
      onOk: () => {
        deleteModelMutation.mutate(modelId, {
          onSuccess: () => message.success("Customer deleted successfully"),
        });
      },
    });
  };

  const columns: TableProps<typeof tableData[number]>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name', render: (val: string) => val || '—' },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (val: string | null) => val || '—' },
    { title: 'Seating Capacity', dataIndex: 'seatingCapacity', key: 'seatingCapacity', render: (val: string | null) => val || '—' },
    { title: 'Fuel Efficiency', dataIndex: 'fuelEfficiency', key: 'fuelEfficiency', render: (val: string | null) => val || '—' },
    { title: 'Image', dataIndex: 'modelImageUrl', key: 'modelImageUrl', render: (val: string | null) => val || '—' },
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
            onClick={() => handleEditModel(record)}
          />
          <Button type="text" icon={<Trash2 size={18} />} onClick={() => handleDeleteModel(record.id)} />
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
      <Modal title="Add Model" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleCreateModel}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Seating Capacity" name="seatingCapacity" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Fuel Efficiency" name="fuelEfficiency" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Model Image" name="modelImage">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

            {/* Edit Customer Modal */}
      <Modal title="Edit Model" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} onOk={handleUpdateModel}>
        <Form form={form} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Seating Capacity" name="seatingCapacity" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Fuel Efficiency" name="fuelEfficiency" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Model Image" name="modelImage">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};