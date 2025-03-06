import { Card, Flex, Statistic, Tabs, TabsProps } from "antd";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Define the TypeScript interface based on the API response
interface PaymentData {
  totalBookings: number;
  totalCustomers: number;
  successfulPayments: number;
  processedPayments: number;
  pendingPayments: number;
  failedPayments: number;
  totalPayments: number;
}

// Define the props type for the component
interface DashboardRevenueProps {
  paymentsData: PaymentData[];
}

const chartViewItems: TabsProps["items"] = [
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
];

export const DashboardRevenue: React.FC<DashboardRevenueProps> = ({
  paymentsData,
}) => {
  // Extract the first object (assuming single object array response)
  const paymentData = paymentsData?.[0] || {
    totalBookings: 0,
    totalCustomers: 0,
    successfulPayments: 0,
    processedPayments: 0,
    pendingPayments: 0,
    failedPayments: 0,
    totalPayments: 0,
  };

  // Prepare chart data
  const paymentChartData = [
    { name: "Successful Payments", value: paymentData.successfulPayments || 0 },
    { name: "Processed Payments", value: paymentData.processedPayments || 0 },
    { name: "Pending Payments", value: paymentData.pendingPayments || 0 },
    { name: "Failed Payments", value: paymentData.failedPayments || 0 },
  ];

  return (
    <Card
      title="Revenue Overview"
      extra={<Tabs items={chartViewItems} className="tab-item-ripple" />}
      styles={{
        body: { display: "flex" },
        header: { minHeight: "48px", width: "75% !important" },
      }}
      style={{ width: "75%" }}
    >
      <Flex gap={8} style={{ flexDirection: "column", minWidth: "100px" }}>
        <Statistic
          title="Total Payments"
          value={paymentData.totalPayments || 0}
          suffix="€"
        />
        <Statistic
          title="Total Bookings"
          value={paymentData.totalBookings || 0}
        />
        <Statistic
          title="Total Customers"
          value={paymentData.totalCustomers || 0}
        />
      </Flex>

      <ResponsiveContainer
        width="100%"
        height={300}
        style={{ marginTop: "-45px" }}
      >
        <PieChart>
          <Pie
            dataKey="value"
            data={paymentChartData}
            innerRadius={50}
            outerRadius={80}
          >
            {paymentChartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["#4CAF50", "#2196F3", "#FFC107", "#F44336"][index]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};
