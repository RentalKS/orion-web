import { Button, Flex, Typography, Spin, message, DatePicker } from "antd";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardDailyPlan, DashboardRentals, DashboardRevenue } from ".";
import { DashboardVehicles } from "./dashboard-vehicles"; // New component
import { api } from "../../lib/api-client";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const STATIC_TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvcmlvbkBkZXYuY29tIiwiaWF0IjoxNzQwMzQzMjU5LCJleHAiOjE3NDA0Mjk2NTl9.4q8eZ3RcZMaItyhL8SqQPaEYwnYtrGR9Yw7C8yaaTRw";

// Define API Response Types
interface ReservationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  customerId: number;
  totalReservations: number;
  totalAmount: number;
  completedReservations: number;
  pendingReservations: number;
  canceledReservations: number;
  completedAmount: number;
  pendingAmount: number;
  waitingForPayment: number;
  onGoing: number;
  createdAt: number;
}

interface VehicleData {
  totalVehicles: number;
  availableVehicles: number;
  waitingToStart: number;
  rentedVehicles: number;
  underMaintenance: number;
  reservedVehicles: number;
  outOfServiceVehicles: number;
  category: string;
  categoryCount: number;
}

interface PaymentData {
  totalBookings: number;
  totalCustomers: number;
  successfulPayments: number;
  processedPayments: number;
  pendingPayments: number;
  failedPayments: number;
  totalPayments: number;
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<ReservationData[]>([]);
  const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);
  const [paymentsData, setPaymentsData] = useState<PaymentData[]>([]);
  const [dateRange, setDateRange] = useState<[number | null, number | null]>([
    null,
    null,
  ]);

  // Fetch Dashboard Data
  const fetchDashboardData = async (from?: number, to?: number) => {
    try {
      setLoading(true);

      const requestBody: Record<string, number> = {};
      if (from && to) {
        requestBody.from = from;
        requestBody.to = to;
      }

      const headers = {
        Authorization: `Bearer ${STATIC_TEST_TOKEN}`,
        "Content-Type": "application/json",
      };

      const [dashboardRes, vehiclesRes, paymentsRes] = await Promise.all([
        api.post<{ data: ReservationData[] }>("/api/dashboard", requestBody, {
          headers,
        }),
        api.post<{ data: VehicleData[] }>(
          "/api/dashboard/vehicles",
          requestBody,
          { headers }
        ),
        api.post<{ data: PaymentData[] }>(
          "/api/dashboard/payments",
          requestBody,
          { headers }
        ),
      ]);

      setDashboardData(dashboardRes.data || []);
      setVehiclesData(vehiclesRes.data || []);
      setPaymentsData(paymentsRes.data || []);
    } catch (error) {
      message.error("Failed to fetch dashboard data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Handle Date Range Selection
  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      const from = dayjs(dateStrings[0]).valueOf();
      const to = dayjs(dateStrings[1]).valueOf();
      setDateRange([from, to]);
      fetchDashboardData(from, to);
    } else {
      setDateRange([null, null]);
      fetchDashboardData(); // Fetch without filtering
    }
  };

  if (loading)
    return (
      <Spin
        size="large"
        style={{ display: "block", margin: "auto", marginTop: "5rem" }}
      />
    );

  return (
    <Flex gap="middle" vertical>
      <Flex justify="space-between" align="center">
        <Title level={2} type="secondary">
          Dashboard
        </Title>
        <Flex gap="small">
          <RangePicker onChange={handleDateChange} />
          <Button type="primary" icon={<Plus />}>
            Add reserve
          </Button>
        </Flex>
      </Flex>

      <Flex justify="space-between">
        <Title level={5}>
          {dateRange[0] && dateRange[1]
            ? `Showing data from ${dayjs(dateRange[0]).format(
                "YYYY-MM-DD"
              )} to ${dayjs(dateRange[1]).format("YYYY-MM-DD")}`
            : "Showing all data"}
        </Title>
      </Flex>

      <Flex justify="space-between">
        <DashboardDailyPlan reservations={dashboardData} />
        <DashboardRevenue paymentsData={paymentsData} />
      </Flex>

      <Flex justify="space-between">
        <DashboardRentals reservations={dashboardData} />
        <DashboardVehicles vehiclesData={vehiclesData} />
      </Flex>

    </Flex>
  );
};
