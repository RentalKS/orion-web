import { Card, Flex, Statistic, Tabs, TabsProps } from "antd";
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import './styles.css';
import { adjustedPaymentData, COLORS, profitData } from "../../utils/dummyData";

const chartViewItems: TabsProps['items'] = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
];

export const DashboardRevenue = () => {
    const [activeSeries, setActiveSeries] = useState<string[]>([]);

    const onChange = (key: string) => {
        console.log(key);
    };

    const handleLegendClick = (dataKey: any) => {
        setActiveSeries(prev =>
            prev.includes(dataKey) ? prev.filter(el => el !== dataKey) : [...prev, dataKey]
        );
    };

    return (
        <Card
            title="Revenue"
            extra={<Tabs defaultActiveKey="1" items={chartViewItems} onChange={onChange} className="tab-item-ripple" />}
            styles={{ header: { minHeight: "48px" } }}
        >
            <Flex justify="space-between" align="center" style={{ height: "280px" }}>
                <Flex vertical style={{ alignSelf: "flex-start" }}>
                    <Statistic title="Payment" value={0} suffix="€" />
                    <Statistic title="Deposit" value={0} suffix="€" />
                </Flex>
                <ResponsiveContainer width="30%" height="100%">
                    <PieChart>
                        <Pie dataKey="value" data={adjustedPaymentData} innerRadius={50} outerRadius={80}>
                            {adjustedPaymentData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            payload={adjustedPaymentData.map((item, index) => ({
                                id: item.name,
                                type: "square",
                                value: item.name,
                                color: COLORS[index % COLORS.length],
                            }))}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <LineChart width={730} height={250} data={profitData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                        layout="horizontal"
                        verticalAlign="top"
                        onClick={(props) => handleLegendClick(props.dataKey)}
                    />
                    {['Rentals', 'Expenses', 'Extras', 'Deposit', 'Insurance', 'Taxes'].map((key, index) => (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={COLORS[index % COLORS.length]}
                            hide={activeSeries.includes(key)}
                        />
                    ))}
                </LineChart>
            </Flex>
        </Card>
    );
};
