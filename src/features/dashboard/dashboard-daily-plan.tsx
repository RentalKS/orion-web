import { Button, Card, List, Typography } from "antd";
import { COLORS, Segment, StatusLine } from "../../components/ui/charts";

const segments = [
    { title: "Rentals", value: 5 },
    { title: "Returns", value: 3 },
];

const { Text } = Typography;
const { Item: ListItem } = List;

export const DashboardDailyPlan = () => {
    return (
        <Card
            title="Daily plan"
            style={{
                width: "35%",
                marginRight: '2rem'
            }}
            styles={{ header: { minHeight: "48px" } }}
        >
            <StatusLine segments={segments} />
            <List
                dataSource={segments}
                style={{
                    marginTop: "1rem"
                }}
                renderItem={(item: Segment, index: number) => (
                    <ListItem style={{ borderBottom: 'none' }}>
                        <Text className="daily-plan-item-title">{item.title}</Text>
                        <div
                            className="daily-plan-item-status"
                            style={{
                                backgroundColor: item.color || COLORS[index % COLORS.length],
                            }}
                        ></div>
                        <Text className="daily-plan-item-value">{item.value}</Text>
                    </ListItem>
                )}
            />
            <Button>Open Daily plan</Button>
        </Card>
    );
}
