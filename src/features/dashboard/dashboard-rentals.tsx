import { Card } from "antd";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { COLORS, rentalData } from "../../utils/dummyData";

export const DashboardRentals = () => {
    return (
        <Card
            title="Rentals"
            style={{
                width: "65%"
            }}
            styles={{ header: { minHeight: "48px" } }}
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
                        dataKey={key.toLowerCase()}
                        stroke={COLORS[index % COLORS.length]}
                    />
                ))}
            </LineChart>
        </Card>
    );
}
