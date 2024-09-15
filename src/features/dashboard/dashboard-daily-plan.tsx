import { Button, Card, DatePicker, DatePickerProps, List, Typography } from "antd";
import { COLORS, Segment, StatusLine } from "../../components/ui/charts";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { getRandomSegments } from "../../utils/dummyData";

const { Text } = Typography;
const { Item: ListItem } = List;


export const DashboardDailyPlan = () => {
    const [segments, setSegments] = useState<Segment[]>(getRandomSegments());
    const onChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        setSegments(getRandomSegments());
    };

    return (
        <Card
            title={"Daily plan"}
            extra={<DatePicker onChange={onChange} />}
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
