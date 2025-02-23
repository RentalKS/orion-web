import { Button, Col, Form, Input, message, Modal, Row, Space, Table, TableProps, Typography } from "antd";
import { useState } from "react";
import { Pencil, Plus, ReceiptText, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useCreateCategory } from "../../hooks/operations/useCreate";
import { useDeleteCategory } from "../../hooks/operations/useDelete";
import { useCategories } from "../../hooks/operations/useFetch";
import { useUpdateCategory } from "../../hooks/operations/useUpdate";


const {Text} = Typography;

export const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');
  const { 
    data,
    isLoading,
    isError,
    error
  } = useCategories({page:1, size:10, search: ''});

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const tableData = data?.data?.map((company) => ({
    key: String(company.id),
    id: company.id,
    categoryName: company.categoryName,
    categoryDescription: company.categoryDescription,
    companyId: company.companyId,
    // sections: company.sections,
  
  })) || [];

  const handleCreateCategory = () => {
    form.validateFields().then((values) => {
      createCategoryMutation.mutate(values, {
        onSuccess: () => {
          message.success('Category created succesfully');
          setIsModalOpen(false);
          form.resetFields();
        },
      });
    });
  };

  const handleEditCategory = (company: any) => {
    setSelectedCategory(company);
    form.setFieldsValue(company);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = () => {
    form.validateFields().then((values) => {
      updateCategoryMutation.mutate(
        { categoryId: selectedCategory.id, updatedData: values },
        {
          onSuccess: () => {
            message.success('Category updated successfully');
            setIsEditModalOpen(false);
            form.resetFields();
          },
        }
      );
    });
  };

  if (isLoading) return <div>Loading companies...</div>;
  if (isError) return <div>Error: {String(error)}</div>;

  const handleDeleteCategory = (categoryId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this company?",
      content: "This action cannot be undone.",
      onOk: () => {
        deleteCategoryMutation.mutate(categoryId, {
          onSuccess: () => message.success("Category deleted successfully"),
        });
      },
    });
  };

  const columns: TableProps<typeof tableData[number]>['columns'] = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'categoryName', key: 'categoryName', render: (val: string) => val || '—' },
    { title: 'Description', dataIndex: 'categoryDescription', key: 'categoryDescription', render: (val: string | null) => val || '—' },
    { title: 'Company', dataIndex: 'companyId', key: 'companyId', render: (val: string | null) => val || '—' },
    // { title: 'Section', dataIndex: 'sections', key: 'sections', render: (val: string | null) => val || '—' },
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
            onClick={() => handleEditCategory(record)}
          />
          <Button type="text" icon={<Trash2 size={18} />} onClick={() => handleDeleteCategory(record.id)} />
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
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Button type="primary" shape="circle" icon={<Plus size={20} />} onClick={() => setIsModalOpen(true)} />
        </Col>
      </Row>

      {/* Categorys Table */}
      <Table
        columns={columns}
        dataSource={tableData}
        // pagination={{
        //   current: data?.data.page,
        //   pageSize: data?.data.size,
        //   total: data?.data.totalSize,
        // }}
      />

      {/* Add Category Modal */}
      <Modal title="Add Category" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={handleCreateCategory}>
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="categoryName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="categoryDescription" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Company" name="companyId" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

            {/* Edit Category Modal */}
      <Modal title="Edit Category" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} onOk={handleUpdateCategory}>
        <Form form={form} layout="vertical">
        <Form.Item label="Name" name="categoryName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="categoryDescription" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Company" name="companyId" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};