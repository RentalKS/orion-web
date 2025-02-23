import { Button, Col, Form, Input, message, Modal, Row, Space, Table, TableProps, Typography, Avatar, Tag } from "antd";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useCreateCompany } from "../../hooks/operations/useCreate";
import { useDeleteCompany } from "../../hooks/operations/useDelete";
import { useCompanies } from "../../hooks/operations/useFetch";
import { useUpdateCompany } from "../../hooks/operations/useUpdate";

const { Text } = Typography;

export const Companies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');

  const { data, isLoading, isError, error } = useCompanies({ page: 1, size: 10, search: '' });

  const createCompanyMutation = useCreateCompany();
  const updateCompanyMutation = useUpdateCompany();
  const deleteCompanyMutation = useDeleteCompany();

  const tableData = data?.data?.map((company) => ({
    key: String(company.id),
    id: company.id,
    name: company.name,
    address: company.address,
    email: company.email,
    phone: company.phone || "—",
    logoUrl: company.logoUrl,
    zipCode: company.zipCode || "—",
    city: company.city,
    state: company.state,
    userId: company.userId,
    categories: company.categories.map((m) => m.categoryName).join(", "),
    createdAt: dayjs(company.createdAt).format("YYYY-MM-DD HH:mm"),
  })) || [];

  const handleCreateCompany = () => {
    form.validateFields().then((values) => {
      createCompanyMutation.mutate(values, {
        onSuccess: () => {
          message.success("Company created successfully");
          setIsModalOpen(false);
          form.resetFields();
        },
      });
    });
  };

  const handleEditCompany = (company: any) => {
    setSelectedCompany(company);
    form.setFieldsValue(company);
    setIsEditModalOpen(true);
  };

  const handleUpdateCompany = () => {
    form.validateFields().then((values) => {
      updateCompanyMutation.mutate(
        { companyId: selectedCompany.id, updatedData: values },
        {
          onSuccess: () => {
            message.success("Company updated successfully");
            setIsEditModalOpen(false);
            form.resetFields();
          },
        }
      );
    });
  };

  if (isLoading) return <div>Loading companies...</div>;
  if (isError) return <div>Error: {String(error)}</div>;

  const handleDeleteCompany = (companyId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this company?",
      content: "This action cannot be undone.",
      onOk: () => {
        deleteCompanyMutation.mutate(companyId, {
          onSuccess: () => message.success("Company deleted successfully"),
        });
      },
    });
  };

  const columns: TableProps<typeof tableData[number]>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { title: "Name", dataIndex: "name", key: "name", render: (val) => <Text strong>{val || "—"}</Text> },
    { title: "Address", dataIndex: "address", key: "address", render: (val) => val || "—" },
    { title: "Phone", dataIndex: "phone", key: "phone", render: (val) => val || "—" },
    { title: "Email", dataIndex: "email", key: "email", render: (val) => <a href={`mailto:${val}`}>{val}</a> },
    { title: "State", dataIndex: "state", key: "state", render: (val) => val || "—" },
    { title: "City", dataIndex: "city", key: "city", render: (val) => val || "—" },
    {
      title: "Logo",
      dataIndex: "logoUrl",
      key: "logoUrl",
      render: (val) => <Avatar size={40} src={val} />,
    },
    { title: "AgencyId", dataIndex: "userId", key: "userId", render: (val) => val || "—" },
    { title: "ZipCode", dataIndex: "zipCode", key: "zipCode", render: (val) => val || "—" },
    { title: "Categories", dataIndex: "categories", key: "categories", render: (val) => <Tag color="blue">{val}</Tag> },
    { title: "Created at", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button type="text" icon={<Pencil size={18} />} onClick={() => handleEditCompany(record)} />
          <Button type="text" icon={<Trash2 size={18} />} danger onClick={() => handleDeleteCompany(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Button type="primary" icon={<Plus size={20} />} onClick={() => setIsModalOpen(true)}>
            Add Company
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 10 }} />

      <Modal title="Add Company" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleCreateCompany}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Logo URL" name="logoUrl">
            <Input />
          </Form.Item>
          <Form.Item label="Zip Code" name="zipCode">
            <Input />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>
          <Form.Item label="State" name="state">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Edit Company" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} onOk={handleUpdateCompany}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
