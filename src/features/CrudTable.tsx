import { Button, message, Space, Table, Typography, Modal, Input, Form, Row, Col } from 'antd';
import type { TableProps } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface CrudTableProps<T> {
  entityName: string;
  useFetchHook: any;
  useCreateHook: any;
  useUpdateHook: any;
  useDeleteHook: any;
  columns: TableProps<T>['columns'];
  idKey: keyof T;
}

export function CrudTable<T extends Record<string, any>>({
  entityName,
  useFetchHook,
  useCreateHook,
  useUpdateHook,
  useDeleteHook,
  columns,
  idKey
}: CrudTableProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');

  const { data, isLoading, isError, error } = useFetchHook({ page: 1, size: 10, search });
  const createMutation = useCreateHook();
  const updateMutation = useUpdateHook();
  const deleteMutation = useDeleteHook();

  const handleCreate = () => {
    form.validateFields().then((values) => {
      createMutation.mutate(values, {
        onSuccess: () => {
          message.success(`${entityName} created successfully`);
          setIsModalOpen(false);
          form.resetFields();
        },
      });
    });
  };

  const handleEdit = (item: T) => {
    console.log("Editing Item:", item);  // ✅ Debugging log
  
    if (!item || item[idKey] === undefined) {
      message.error(`Error: Selected item is missing the expected identifier (${String(idKey)}).`);
      return;
    }
  
    setSelectedItem(item);
    form.setFieldsValue(item);
    setIsEditModalOpen(true);
  };
  

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      if (!selectedItem || !Object.prototype.hasOwnProperty.call(selectedItem, idKey)) {
        message.error(`Error: Selected item is missing ${String(idKey)}.`);
        return;
      }
  
      const itemId = selectedItem[idKey];
  
      updateMutation.mutate(
        { [idKey]: itemId, updatedData: values },
        {
          onSuccess: () => {
            message.success(`${entityName} updated successfully`);
            setIsEditModalOpen(false);
            setSelectedItem(null);
            form.resetFields();
          },
          onError: () => {
            message.error(`Failed to update ${entityName}.`);
          },
        }
      );
    });
  };
  
  
  

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: `Are you sure you want to delete this ${entityName}?`,
      content: "This action cannot be undone.",
      onOk: () => {
        deleteMutation.mutate(id, {
          onSuccess: () => message.success(`${entityName} deleted successfully`),
        });
      },
    });
  };

  if (isLoading) return <div>Loading {entityName}s...</div>;
  if (isError) return <div>Error: {String(error)}</div>;

  const tableData = data?.data?.data?.map((item: T) => ({
    key: String(item[idKey] ?? item.id),
    ...item,
  })) || [];

  return (
    <>
      <Typography.Title level={3}>{entityName} Management</Typography.Title>

      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder={`Search ${entityName}s...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Button type="primary" shape="circle" icon={<Plus size={20} />} onClick={() => setIsModalOpen(true)} />
        </Col>
      </Row>

      <Table
        columns={[
          ...(columns ?? []),
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <Space size="small">
                <Button type="text" icon={<Pencil size={18} />} onClick={() => handleEdit(record)} />
                <Button type="text" icon={<Trash2 size={18} />} onClick={() => handleDelete(record.id)} />
              </Space>
            ),
          },
        ]}
        dataSource={tableData}
        pagination={{
          current: data?.data?.page,
          pageSize: data?.data?.size,
          total: data?.data?.totalSize,
        }}
      />

      <Modal
        title={selectedItem ? `Edit ${entityName}` : `Add ${entityName}`}
        open={isModalOpen || isEditModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setIsEditModalOpen(false);
        }}
        onOk={() => (selectedItem ? handleUpdate() : handleCreate())}
      >

    <Form form={form} layout="vertical">
    {(columns || [])
        .filter((col): col is ColumnType<T> => 'dataIndex' in col && col.dataIndex !== undefined) 
        .filter((col) => col.dataIndex !== 'id' && col.dataIndex !== 'createdAt' && col.key !== 'actions') 
        .map((col) => (
        <Form.Item
            key={String(col.key)}
            label={typeof col.title === 'string' ? col.title : String(col.key)} 
            name={Array.isArray(col.dataIndex) ? col.dataIndex.join('.') : String(col.dataIndex)} 
            rules={[{ required: true }]}
        >
            <Input />
        </Form.Item>
        ))}
    </Form>

      </Modal>
    </>
  );
}
