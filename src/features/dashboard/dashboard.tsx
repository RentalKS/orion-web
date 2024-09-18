import { Button, Flex, Typography } from "antd";
import { Plus } from "lucide-react";
import { DashboardDailyPlan, DashboardRentals, DashboardRevenue } from ".";


const { Title } = Typography;

export const Dashboard = () => {
    return (
        <Flex gap="middle" vertical>
            <Flex justify={'space-between'}>
                <Title level={2} type="secondary">Dashboard</Title>
                <Button type="primary" icon={<Plus />}>Add reserve</Button>
            </Flex>
            <DashboardRevenue />
            <Flex justify="space-between">
                <DashboardDailyPlan />
                <DashboardRentals />
            </Flex>
        </Flex>
    );
}
