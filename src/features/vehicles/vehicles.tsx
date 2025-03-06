import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography,
  Drawer,
  Descriptions,
  Tag,
  MenuProps,
  Dropdown,
  Space,
} from "antd";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  EditOutlined,
  DeleteOutlined,
  FileExcelTwoTone,
  FilePdfTwoTone,
  DownOutlined,
} from "@ant-design/icons";

import {
  useVehicles,
  useModels,
  useRateDates,
  useLocations,
} from "../../hooks/operations/useFetch";
import { useCreateVehicle } from "../../hooks/operations/useCreate";
import { useUpdateVehicle } from "../../hooks/operations/useUpdate";
import { useDeleteVehicle } from "../../hooks/operations/useDelete";
import { downloadExcelReport, downloadPdfReport } from "./api";

const { Title } = Typography;

export const Vehicles = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useVehicles({
    page: 1,
    size: 10,
    search,
  });

  const { data: modelsData } = useModels({ page: 1, size: 100 });
  const { data: rateDatesData } = useRateDates({ page: 1, size: 100 });
  const { data: locationsData } = useLocations({ page: 1, size: 100 });

  const createVehicleMutation = useCreateVehicle();
  const updateVehicleMutation = useUpdateVehicle();
  const deleteVehicleMutation = useDeleteVehicle();

  const modelOptions =
    modelsData?.data?.data?.map((m) => ({ label: m.name, value: m.id })) || [];
  const rateDateOptions =
    rateDatesData?.data?.map((r) => ({ label: r.name, value: r.id })) || [];
  const locationOptions =
    locationsData?.data?.data?.map((l) => ({
      label: l.address,
      value: l.id,
    })) || [];

  // Placeholder vehicle image
  const defaultImage = "https://via.placeholder.com/300x200?text=Vehicle";

  // Card data mapping
  const cardData =
    data?.data?.data.map((vehicle) => ({
      key: String(vehicle.id),
      id: vehicle.id,
      registrationNumber: vehicle.registrationNumber,
      year: vehicle.year,
      fuelType: vehicle.fuelType,
      mileage: vehicle.mileage,
      transmission: vehicle.transmission,
      color: vehicle.color,
      description: vehicle.description,
      vehicleStatus: vehicle.vehicleStatus,
      model: vehicle.model?.name || "—",
      insuranceId: vehicle.insuranceId,
      location: vehicle.locationId,
      rateDate: vehicle.rateId,
      contractVehicleNumber: vehicle?.contractVehicleNumber,
      placeholderImage: vehicle.imageUrl,
    })) || [];

  // Create vehicle
  const handleCreateVehicle = () => {
    form.validateFields().then((values) => {
      createVehicleMutation.mutate(values, {
        onSuccess: () => {
          message.success("Vehicle created successfully");
          setIsDrawerOpen(false);
          form.resetFields();
        },
      });
    });
  };

  // Edit vehicle
  const handleEditVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    form.setFieldsValue(vehicle);
    setIsEditDrawerOpen(true);
  };

  // Update vehicle
  const handleUpdateVehicle = () => {
    form.validateFields().then((values) => {
      updateVehicleMutation.mutate(
        { vehicleId: selectedVehicle.id, updatedData: values },
        {
          onSuccess: () => {
            message.success("Vehicle updated successfully");
            setIsEditDrawerOpen(false);
            form.resetFields();
          },
        }
      );
    });
  };

  // Delete vehicle
  const handleDeleteVehicle = (vehicleId: number) => {
    deleteVehicleMutation.mutate(vehicleId, {
      onSuccess: () => message.success("Vehicle deleted successfully"),
    });
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "xlxs":
        downloadExcelReport();
        break;
      case "pdf":
        downloadPdfReport();
        break;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Excel",
      key: "xlxs",
      icon: <FileExcelTwoTone />,
    },
    {
      label: "PDF",
      key: "pdf",
      icon: <FilePdfTwoTone />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  if (isLoading) return <div>Loading vehicles...</div>;
  if (isError) return <div>Error: {String(error)}</div>;

  return (
    <>
      {/* Top Section: Search + Add Button */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="Search vehicles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Dropdown menu={menuProps}>
            <Button style={{ marginRight: "1rem", padding: "1rem" }}>
              <Space>
                Export
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Button
            type="primary"
            icon={<Plus size={20} />}
            onClick={() => setIsDrawerOpen(true)}
          >
            Add Vehicle
          </Button>
        </Col>
      </Row>

      {/* Vehicle Cards */}
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: 16 }}
      ></Row>

      {/* Vehicle Cards */}
      <Row gutter={[16, 16]}>
        {cardData.map((vehicle) => (
          <Col key={vehicle.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              cover={
                <div
                  style={{
                    width: "100%",
                    height: "130px",
                    background:
                      "linear-gradient(135deg,rgba(74, 108, 141, 0.47),rgba(169, 183, 204, 0.14))", // Gradient from dark blue to lighter blue
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    alt="Vehicle"
                    src={vehicle.placeholderImage || defaultImage}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              }
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => handleEditVehicle(vehicle)}
                />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleDeleteVehicle(vehicle.id)}
                />,
              ]}
              hoverable
              style={{
                borderRadius: 10,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Title level={4} style={{ textAlign: "center" }}>
                {vehicle.model}
              </Title>

              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Registration">
                  {vehicle.registrationNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Year">
                  <span style={{ fontWeight: "lighter", fontSize: 13 }}>
                    {vehicle.year}
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="Contract Number">
                  {vehicle?.contractVehicleNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Fuel">
                  <Tag
                    color={vehicle.fuelType === "DIESEL" ? "volcano" : "green"}
                  >
                    {vehicle.fuelType}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Mileage">
                  <span style={{ fontWeight: "lighter", fontSize: 13 }}>
                    {vehicle.mileage.toLocaleString()} km
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="Transmission">
                  <span
                    style={{
                      fontWeight: "lighter",
                      color: "grey",
                      fontSize: 12,
                    }}
                  >
                    {vehicle.transmission}
                  </span>
                </Descriptions.Item>

                <Descriptions.Item label="Color">
                  <Tag color="blue">{vehicle.color}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag
                    color={
                      vehicle.vehicleStatus === "RESERVED" ? "orange" : "green"
                    }
                  >
                    {vehicle.vehicleStatus}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Vehicle Drawer (Add/Edit) */}
      <Drawer
        title={selectedVehicle ? "Edit Vehicle" : "Add Vehicle"}
        width={900} // Increased width for better layout
        open={isDrawerOpen || isEditDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setIsEditDrawerOpen(false);
        }}
        footer={
          <Button
            type="primary"
            onClick={
              selectedVehicle ? handleUpdateVehicle : handleCreateVehicle
            }
          >
            {selectedVehicle ? "Update Vehicle" : "Create Vehicle"}
          </Button>
        }
      >
        <Form form={form} layout="vertical">
          <Title level={4} style={{ color: "#1890ff", marginBottom: 10 }}>
            Basic Information
          </Title>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                label="Registration Number"
                name="registrationNumber"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter registration number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Model"
                name="modelId"
                rules={[{ required: true }]}
              >
                <Select options={modelOptions} placeholder="Select Model" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Year" name="year" rules={[{ required: true }]}>
                <Input placeholder="Enter year" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Fuel Type"
                name="fuelType"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter fuel type" />
              </Form.Item>
            </Col>
          </Row>

          <Title level={4} style={{ color: "#1890ff", marginBottom: 10 }}>
            Technical Specifications
          </Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mileage"
                name="mileage"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter mileage (e.g., 2600000 km)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Transmission"
                name="transmission"
                rules={[{ required: true }]}
              >
                <Input placeholder="Manual / Automatic" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Color"
                name="color"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter color" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Description" name="description">
                <Input placeholder="Enter description (optional)" />
              </Form.Item>
            </Col>
          </Row>

          <Title level={4} style={{ color: "#1890ff", marginBottom: 10 }}>
            Location & Rate
          </Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Rate Date"
                name="rateId"
                rules={[{ required: true }]}
              >
                <Select
                  options={rateDateOptions}
                  placeholder="Select Rate Date"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Location"
                name="locationId"
                rules={[{ required: true }]}
              >
                <Select
                  options={locationOptions}
                  placeholder="Select Location"
                />
              </Form.Item>
            </Col>
          </Row>
          <Title level={4} style={{ color: "#1890ff", marginBottom: 10 }}>
            Insurance Details
          </Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Policy Number"
                name={["insurancePolicy", "policyNumber"]}
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter policy number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Provider Name"
                name={["insurancePolicy", "providerName"]}
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter insurance provider" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Coverage Details"
            name={["insurancePolicy", "coverageDetails"]}
          >
            <Input.TextArea rows={3} placeholder="Enter coverage details" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
