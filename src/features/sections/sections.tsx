import { Button, Col, Form, Input, message, Modal, Row, Select, Space, Table, TableProps, Typography, Avatar } from "antd";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useCreateSection } from "../../hooks/operations/useCreate";
import { useDeleteSection } from "../../hooks/operations/useDelete";
import { useCategories, useSections } from "../../hooks/operations/useFetch";
import { useUpdateSection } from "../../hooks/operations/useUpdate";

const { Text } = Typography;

export const Sections = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useSections({ page: 1, size: 10, search: "" });
  const { data: categoriesData } = useCategories({ page: 1, size: 1000, search: "" });

  const createSectionMutation = useCreateSection();
  const updateSectionMutation = useUpdateSection();
  const deleteSectionMutation = useDeleteSection();

  const categoryMap = categoriesData?.data?.reduce((acc, category) => {
    acc[category.id] = category.categoryName;
    return acc;
  }, {} as Record<number, string>) || {};

  const categoryOptions = categoriesData?.data?.map((c) => ({
    label: c.categoryName,
    value: c.id,
  })) || [];

  const tableData = data?.data?.map((section) => ({
    key: String(section.id),
    id: section.id,
    sectionName: section.sectionName,
    sectionDescription: section.sectionDescription,
    categoryName: categoryMap[section.categoryId] || "Unknown",
    sectionImage: section.sectionImageUrl,
    createdAt: dayjs(section.createdAt).format("YYYY-MM-DD HH:mm"),
  })) || [];

  const handleCreateSection = () => {
    form.validateFields().then((values) => {
      createSectionMutation.mutate(values, {
        onSuccess: () => {
          message.success("Section created successfully");
          setIsModalOpen(false);
          form.resetFields();
        },
      });
    });
  };

  const handleEditSection = (section: any) => {
    setSelectedSection(section);
    form.setFieldsValue({
      ...section,
      categoryId: categoryOptions.find((c) => c.label === section.categoryName)?.value,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateSection = () => {
    form.validateFields().then((values) => {
      updateSectionMutation.mutate(
        { sectionId: selectedSection.id, updatedData: values },
        {
          onSuccess: () => {
            message.success("Section updated successfully");
            setIsEditModalOpen(false);
            form.resetFields();
          },
        }
      );
    });
  };

  if (isLoading) return <div>Loading sections...</div>;
  if (isError) return <div>Error: {String(error)}</div>;

  const handleDeleteSection = (sectionId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this section?",
      content: "This action cannot be undone.",
      onOk: () => {
        deleteSectionMutation.mutate(sectionId, {
          onSuccess: () => message.success("Section deleted successfully"),
        });
      },
    });
  };

  const columns: TableProps<typeof tableData[number]>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { title: "Name", dataIndex: "sectionName", key: "sectionName", render: (val) => <Text strong>{val || "—"}</Text> },
    { title: "Description", dataIndex: "sectionDescription", key: "sectionDescription", render: (val) => val || "—" },
    { title: "Category", dataIndex: "categoryName", key: "categoryName", render: (val) => <Text>{val}</Text> },
    {
      title: "Image",
      dataIndex: "sectionImage",
      key: "sectionImage",
      render: (val) => (val ? <Avatar size={40} src={val} /> : "—"),
    },
    { title: "Created at", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button type="text" icon={<Pencil size={18} />} onClick={() => handleEditSection(record)} />
          <Button type="text" icon={<Trash2 size={18} />} danger onClick={() => handleDeleteSection(record.id)} />
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
            placeholder="Search sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Button type="primary" icon={<Plus size={20} />} onClick={() => setIsModalOpen(true)}>
            Add Section
          </Button>
        </Col>
      </Row>

      {/* Sections Table */}
      <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 10 }} />

      {/* Add Section Modal */}
      <Modal title="Add Section" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleCreateSection}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="sectionName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="sectionDescription" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="categoryId" rules={[{ required: true }]}>
            <Select options={categoryOptions} placeholder="Select category" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Section Modal */}
      <Modal title="Edit Section" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} onOk={handleUpdateSection}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="sectionName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="sectionDescription" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="categoryId" rules={[{ required: true }]}>
            <Select options={categoryOptions} placeholder="Select category" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
