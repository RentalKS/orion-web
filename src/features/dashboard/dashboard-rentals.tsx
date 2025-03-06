import { Card, Tabs, TabsProps } from "antd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Define the type for a reservation object based on API response
interface Reservation {
  fullName: string;
  totalReservations: number;
  onGoing: number;
  completedReservations: number;
  pendingReservations: number;
  canceledReservations: number;
  waitingForPayment: number;
}

// Define the props type
interface DashboardRentalsProps {
  reservations: Reservation[];
}

const chartViewItems: TabsProps["items"] = [
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
];

export const DashboardRentals: React.FC<DashboardRentalsProps> = ({
  reservations = [],
}) => {
  const onChange = (key: string) => console.log(key);

  // Transform API data into chart format
  const rentalData = reservations.map((customer) => ({
    name: customer.fullName,
    Reserved: customer.totalReservations,
    Ongoing: customer.onGoing,
    Completed: customer.completedReservations,
    Canceled: customer.canceledReservations,
    Pending: customer.pendingReservations,
    WaitingPayment: customer.waitingForPayment,
  }));

  return (
    <Card
      title="Rental Overview"
      style={{ width: "49%" }}
      extra={
        <Tabs
          items={chartViewItems}
          onChange={onChange}
          className="tab-item-ripple"
        />
      }
    >
      <LineChart
        width={730}
        height={250}
        data={rentalData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="top" />
        <Line type="monotone" dataKey="Reserved" stroke="#8884d8" />
        <Line type="monotone" dataKey="Ongoing" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Completed" stroke="#ffc658" />
        <Line type="monotone" dataKey="Pending" stroke="#ff7300" />
        <Line type="monotone" dataKey="WaitingPayment" stroke="#2196F3" />
      </LineChart>
    </Card>
  );
};
