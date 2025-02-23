import { Button, Col, Form, Input, message, Modal, Row, Space, Table, TableProps, Typography } from "antd";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useRateDates } from "../../hooks/operations/useFetch";
import { useDeleteRateDate } from "../../hooks/operations/useDelete";
import { useCreateRateDate } from "../../hooks/operations/useCreate";
import { useUpdateRateDate } from "../../hooks/operations/useUpdate";

const { Text } = Typography;

export const RateDates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRateDate, setSelectedRateDate] = useState<any>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  
  const { data, isLoading, isError, error } = useRateDates({ page: 1, size: 10, search });

  const createRateDateMutation = useCreateRateDate();
  const updateRateDateMutation = useUpdateRateDate();
  const deleteRateDateMutation = useDeleteRateDate();

  const handleCreateRateDate = () => {
    form.validateFields().then((values) => {
      createRateDateMutation.mutate(values, {
        onSuccess: () => {
          message.success("RateDate created successfully");
          setIsModalOpen(false);
          form.resetFields();
        },
      });
    });
  };

  const handleEditRateDate = (brand: any) => {
    setSelectedRateDate(brand);
    form.setFieldsValue(brand);
    setIsEditModalOpen(true);
  };

  const handleUpdateRateDate = () => {
    form.validateFields().then((values) => {
      updateRateDateMutation.mutate(
        { rateDateId: selectedRateDate.id, updatedData: values },
        {
          onSuccess: () => {
            message.success("RateDate updated successfully");
            setIsEditModalOpen(false);
            form.resetFields();
          },
        }
      );
    });
  };

  const handleDeleteRateDate = (rateDateId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this brand?",
      content: "This action cannot be undone.",
      onOk: () => {
        deleteRateDateMutation.mutate(rateDateId, {
          onSuccess: () => message.success("RateDate deleted successfully"),
        });
      },
    });
  };


  const tableData = data?.data
  ? data.data.map((brand) => ({
      key: String(brand.id),
      id: brand.id,
      name: brand?.name,
      dailyRate: brand.dailyRate,
      weeklyRate: brand.weeklyRate,
      monthlyRate: brand.monthlyRate,
    }))
  : [];

  const columns: TableProps<typeof tableData[number]>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name", render: (val: string) => val || "—" },
    { title: "Daily Rate", dataIndex: "dailyRate", key: "dailyRate", render: (val: string | null) => val || "—" },
    { title: "Weekly Rate", dataIndex: "weeklyRate", key: "weeklyRate", render: (val: string | null) => val || "—" },
    { title: "Monthly Rate", dataIndex: "monthlyRate", key: "monthlyRate", render: (val: string | null) => val || "—" },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => (val ? <Text>{dayjs(val).format("YYYY-MM-DD HH:mm")}</Text> : "—"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button type="text" icon={<Pencil size={18} />} onClick={() => handleEditRateDate(record)} />
          <Button type="text" icon={<Trash2 size={18} />} onClick={() => handleDeleteRateDate(record.id)} />
        </Space>
      ),
    },
  ];

  if (isLoading) return <div>Loading rate dates...</div>;
  if (isError) return <div>Error: {String(error)}</div>;

  return (
    <>
      {/* Top Section: Search + Add Button */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="Search rate dates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Button type="primary" shape="circle" icon={<Plus size={20} />} onClick={() => setIsModalOpen(true)} />
        </Col>
      </Row>

      {/* RateDates Table */}
      <Table
        columns={columns}
        dataSource={tableData}
      />

      {/* Add RateDate Modal */}
      <Modal title="Add RateDate" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleCreateRateDate}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Daily Rate" name="dailyRate" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Weekly Rate" name="weeklyRate" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Monthly Rate" name="monthlyRate" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit RateDate Modal */}
      <Modal title="Edit RateDate" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} onOk={handleUpdateRateDate}>
        <Form form={form} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Daily Rate" name="dailyRate" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Weekly Rate" name="weeklyRate" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Monthly Rate" name="monthlyRate" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

