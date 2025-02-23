import { Button, Col, Form, Input, message, Modal, Row, Space, Table, TableProps, Typography } from "antd";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useCreateBrand } from "../../hooks/operations/useCreate";
import { useDeleteBrand } from "../../hooks/operations/useDelete";
import { useBrands } from "../../hooks/operations/useFetch";
import { useUpdateBrand } from "../../hooks/operations/useUpdate";

const { Text } = Typography;

export const Brands = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  
  const { data, isLoading, isError, error } = useBrands({ page: 1, size: 10, search });

  const createBrandMutation = useCreateBrand();
  const updateBrandMutation = useUpdateBrand();
  const deleteBrandMutation = useDeleteBrand();

  const handleCreateBrand = () => {
    form.validateFields().then((values) => {
      createBrandMutation.mutate(values, {
        onSuccess: () => {
          message.success("Brand created successfully");
          setIsModalOpen(false);
          form.resetFields();
        },
      });
    });
  };

  const handleEditBrand = (brand: any) => {
    setSelectedBrand(brand);
    form.setFieldsValue(brand);
    setIsEditModalOpen(true);
  };

  const handleUpdateBrand = () => {
    form.validateFields().then((values) => {
      updateBrandMutation.mutate(
        { brandId: selectedBrand.id, updatedData: values },
        {
          onSuccess: () => {
            message.success("Brand updated successfully");
            setIsEditModalOpen(false);
            form.resetFields();
          },
        }
      );
    });
  };

  const handleDeleteBrand = (brandId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this brand?",
      content: "This action cannot be undone.",
      onOk: () => {
        deleteBrandMutation.mutate(brandId, {
          onSuccess: () => message.success("Brand deleted successfully"),
        });
      },
    });
  };


  const tableData = data?.data
  ? data.data.map((brand) => ({
      key: String(brand.id),
      id: brand.id,
      name: brand.name,
      description: brand?.description ?? "—",
      logo: brand?.logo ?? brand?.logo ?? "—",
      createdAt: brand?.createdAt ?? null,
    }))
  : [];

  const columns: TableProps<typeof tableData[number]>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name", render: (val: string) => val || "—" },
    { title: "Description", dataIndex: "description", key: "description", render: (val: string | null) => val || "—" },
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
          <Button type="text" icon={<Pencil size={18} />} onClick={() => handleEditBrand(record)} />
          <Button type="text" icon={<Trash2 size={18} />} onClick={() => handleDeleteBrand(record.id)} />
        </Space>
      ),
    },
  ];

  if (isLoading) return <div>Loading brands...</div>;
  if (isError) return <div>Error: {String(error)}</div>;

  return (
    <>
      {/* Top Section: Search + Add Button */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="Search brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Button type="primary" shape="circle" icon={<Plus size={20} />} onClick={() => setIsModalOpen(true)} />
        </Col>
      </Row>

      {/* Brands Table */}
      <Table
        columns={columns}
        dataSource={tableData}
      />

      {/* Add Brand Modal */}
      <Modal title="Add Brand" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleCreateBrand}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item label="Logo" name="logo">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Brand Modal */}
      <Modal title="Edit Brand" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} onOk={handleUpdateBrand}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item label="Logo" name="logo">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
