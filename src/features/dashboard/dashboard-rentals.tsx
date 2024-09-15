import { Card, Tabs, TabsProps } from "antd";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { COLORS, rentalData } from "../../utils/dummyData";

const chartViewItems: TabsProps['items'] = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
];

export const DashboardRentals = () => {

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <Card
            title="Rentals"
            style={{
                width: "65%"
            }}
            styles={{ header: { minHeight: "48px" } }}
            extra={<Tabs defaultActiveKey="1" items={chartViewItems} onChange={onChange} className="tab-item-ripple" />}
        >
            <LineChart width={730} height={250} data={rentalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend
                    layout="horizontal"
                    verticalAlign="top"
                />
                {['Reserved', 'Rental', 'Done', 'Cancel'].map((key, index) => (
                    <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={COLORS[index % COLORS.length]}
                    />
                ))}
            </LineChart>
        </Card>
    );
}
