import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Table,
  TableProps,
  Tag,
  Typography,
  Drawer,
  Space,
  DatePicker,
  Select,
  Descriptions,
  Modal,
} from "antd";
import { useState } from "react";
import {
  EyeOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  useReservations,
  useReservationDetails,
} from "../../hooks/operations/useFetch";
import { useDeleteReservation } from "../../hooks/operations/useDelete";
import { processPayment } from "../payments/api";
import { Banknote } from "lucide-react";

const { RangePicker } = DatePicker;

export const Reservations = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | null
  >(null);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );
  const { data, isLoading } = useReservations({
    page: 1,
    size: 10,
    search: "",
  });
  const { data: reservationDetails, isLoading: detailsLoading } =
    useReservationDetails(selectedBookingId);
  const deleteReservationMutation = useDeleteReservation();

  const bookingStatusColors: Record<string, string> = {
    RESERVED: "orange",
    AVAILABLE: "blue",
    RENTED: "green",
    OUT_OF_SERVICE: "red",
    WAITING_TO_START: "yellow",
    UNDER_MAINTENANCE: "grey",
  };

  const paymentMethods = [
    { label: "Credit Card", value: "CREDIT_CARD" },
    { label: "Debit Card", value: "DEBIT_CARD" },
    { label: "PayPal", value: "PAYPAL" },
    { label: "Bank Transfer", value: "BANK_TRANSFER" },
    { label: "Cash", value: "CASH" },
  ];

  const statusColors: Record<string, string> = {
    ONGOING: "orange",
    COMPLETED: "green",
    CANCELLED: "red",
    PENDING: "yellow",
    WAITING_FOR_PAYMENT: "grey",
    WAITING_FOR_START: "brown",
  };

  const handleProcessPayment = async () => {
    if (!selectedReservationId || !selectedPaymentMethod) {
      message.error("Please select a payment method.");
      return;
    }

    try {
      const paymentData = {
        rentalId: selectedReservationId,
        paymentMethod: selectedPaymentMethod,
      };

      await processPayment(paymentData);
      message.success("Payment processed successfully!");
      setIsPaymentModalOpen(false);
      setSelectedPaymentMethod(null);
    } catch (error) {
      message.error("Failed to process payment.");
      console.error("Error processing payment:", error);
    }
  };

  const openPaymentModal = (reservationId: number) => {
    setSelectedReservationId(reservationId);
    setIsPaymentModalOpen(true);
  };

  const tableData =
    data?.data?.data.map((reservation) => ({
      key: String(reservation.id),
      id: reservation.id,
      startDate: dayjs(reservation.startDate).format("YYYY-MM-DD HH:mm"),
      endDate: dayjs(reservation.endDate).format("YYYY-MM-DD HH:mm"),
      bookingStatus: reservation.bookingStatus,
      status: reservation.status,
      vehicleNumber: reservation.contractVehicleNumber,
      customer: reservation.fullName || "—",
      createdAt: dayjs(reservation.createdAt).format("YYYY-MM-DD HH:mm"),
    })) || [];

  const handleDeleteReservation = (reservationId: number) => {
    deleteReservationMutation.mutate(reservationId, {
      onSuccess: () => message.success("Reservation deleted successfully"),
    });
  };

  const columns: TableProps<(typeof tableData)[number]>["columns"] = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    {
      title: "Booking Status",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      render: (val: string) => (
        <Tag color={bookingStatusColors[val] || "default"}>{val}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val: string) => (
        <Tag color={statusColors[val] || "default"}>{val}</Tag>
      ),
    },
    {
      title: "Contract Vehicle",
      dataIndex: "vehicleNumber",
      key: "vehicleNumber",
    },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => setSelectedBookingId(record.id)}
          />
          <Button type="text" icon={<EditOutlined />} />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteReservation(record.id)}
          />
          <Button onClick={() => openPaymentModal(record.id)}>
            <Banknote style={{ color: "darkblue" }} />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col span={16}>
          <Form layout="inline">
            <Form.Item label="Date Range">
              <RangePicker />
            </Form.Item>
            <Form.Item label="Status">
              <Select
                placeholder="Select Status"
                options={Object.keys(statusColors).map((s) => ({
                  label: s,
                  value: s,
                }))}
                allowClear
              />
            </Form.Item>
            <Form.Item label="Search">
              <Input
                placeholder="Search by contract number or customer"
                allowClear
              />
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Reservation
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 10 }}
        loading={isLoading}
      />

      <Drawer
        title="Reservation Details"
        width={700}
        open={!!selectedBookingId}
        onClose={() => setSelectedBookingId(null)}
        footer={
          <Button type="primary" onClick={() => setSelectedBookingId(null)}>
            Close
          </Button>
        }
      >
        {detailsLoading ? (
          <div>Loading details...</div>
        ) : reservationDetails?.data ? (
          <>
            <Typography.Title level={4}>
              Contract #{reservationDetails.data.vehicleContractNumber}
            </Typography.Title>
            <Descriptions column={1} bordered size="middle">
              <Descriptions.Item label="Customer">
                {reservationDetails.data?.customerDetails.name}{" "}
                {reservationDetails.data.customerDetails.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {reservationDetails.data.customerDetails.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {reservationDetails.data.customerDetails.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="License Number">
                {reservationDetails.data.customerDetails.licenseNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Booking Status">
                <Tag color={statusColors[reservationDetails.data.status]}>
                  {reservationDetails.data.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Total Cost">
                ${reservationDetails.data.totalCost}
              </Descriptions.Item>
              <Descriptions.Item label="Total Days">
                {reservationDetails.data.totalDays} days
              </Descriptions.Item>
              <Descriptions.Item label="Vehicle Status">
                <Tag
                  color={
                    bookingStatusColors[reservationDetails.data.vehicleStatus]
                  }
                >
                  {reservationDetails.data.vehicleStatus}
                </Tag>
              </Descriptions.Item>
              {reservationDetails.data.signature && (
                <Descriptions.Item label="Signature">
                  <img
                    src={reservationDetails.data.signature}
                    alt="Customer Signature"
                    style={{
                      width: "200px",
                      height: "100px",
                      objectFit: "contain",
                      border: "1px solid #ddd",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  />
                </Descriptions.Item>
              )}
            </Descriptions>
          </>
        ) : (
          <div>No details found.</div>
        )}
      </Drawer>
      <Modal
        title="Process Payment"
        open={isPaymentModalOpen}
        onCancel={() => setIsPaymentModalOpen(false)}
        onOk={handleProcessPayment}
        okText="Process Payment"
      >
        <Form layout="vertical">
          <Form.Item label="Select Payment Method" required>
            <Select
              placeholder="Choose a payment method"
              options={paymentMethods}
              value={selectedPaymentMethod}
              onChange={setSelectedPaymentMethod}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
