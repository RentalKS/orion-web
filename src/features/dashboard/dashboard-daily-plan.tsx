import { Card, DatePicker, List, Typography } from "antd";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const { Text } = Typography;
const { Item: ListItem } = List;

// Define the type for reservation data
interface Reservation {
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

interface DashboardDailyPlanProps {
    reservations: Reservation[];
}

export const DashboardDailyPlan: React.FC<DashboardDailyPlanProps> = ({ reservations }) => {
    const [date, setDate] = useState<Dayjs | null>(null);

    const handleDateChange = (selectedDate: Dayjs | null) => {
        setDate(selectedDate);
    };

    const filteredReservations = date
        ? reservations.filter(res => dayjs(res.createdAt).isSame(date, "day") && res.onGoing > 0)
        : reservations.filter(res => res.onGoing > 0);

    return (
        <Card title="Daily Plan" extra={<DatePicker onChange={handleDateChange} />} style={{ width: "35%", marginRight: "2rem" }}>
            <List
                dataSource={filteredReservations}
                renderItem={(item) => (
                    <ListItem>
                        <Text>{item.fullName}</Text>
                        <Text style={{ marginLeft: "auto" }}>{item.onGoing} Ongoing</Text>
                    </ListItem>
                )}
            />
        </Card>
    );
};
