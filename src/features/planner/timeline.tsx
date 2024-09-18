import { GanttComponent, ColumnsDirective, ColumnDirective, TaskFieldsModel } from '@syncfusion/ej2-react-gantt';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-react-gantt/styles/material.css';
import { Layout, Card, Row, Col, Flex } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Content } = Layout;

export const Baseline: React.FC = () => {
    const taskValues: TaskFieldsModel = {
        id: 'CarID',
        name: 'CarName',
        startDate: 'RentalStart',
        endDate: 'RentalEnd',
    };

    const carData = [
        { CarID: 1, CarName: 'Audi A5', RentalStart: new Date('2024-09-01'), RentalEnd: new Date('2024-09-05') },
        { CarID: 2, CarName: 'BMW M3', RentalStart: new Date('2024-09-02'), RentalEnd: new Date('2024-09-06') },
        { CarID: 3, CarName: 'Mercedes C-Class', RentalStart: new Date('2024-09-04'), RentalEnd: new Date('2024-09-08') },
        { CarID: 4, CarName: 'Tesla Model 3', RentalStart: new Date('2024-09-03'), RentalEnd: new Date('2024-09-07') },
        { CarID: 5, CarName: 'Audi A3', RentalStart: new Date('2024-09-01'), RentalEnd: new Date('2024-09-05') },
        { CarID: 6, CarName: 'BMW 118d', RentalStart: new Date('2024-09-02'), RentalEnd: new Date('2024-09-06') },
        { CarID: 7, CarName: 'Mercedes C220', RentalStart: new Date('2024-09-04'), RentalEnd: new Date('2024-09-08') },
        { CarID: 8, CarName: 'Tesla Model S', RentalStart: new Date('2024-09-03'), RentalEnd: new Date('2024-09-07') },
        { CarID: 9, CarName: 'Audi Q8', RentalStart: new Date('2024-09-01'), RentalEnd: new Date('2024-09-13') },
        { CarID: 10, CarName: 'BMW M4', RentalStart: new Date('2024-09-02'), RentalEnd: new Date('2024-09-15') },
        { CarID: 11, CarName: 'Mercedes S-Class', RentalStart: new Date('2024-09-04'), RentalEnd: new Date('2024-09-05') },
        { CarID: 12, CarName: 'Tesla Model X', RentalStart: new Date('2024-09-03'), RentalEnd: dayjs(new Date('2024-10-04')).toDate() },
        { CarID: 13, CarName: 'Tesla Model S', RentalStart: new Date('2024-09-01'), RentalEnd: new Date('2024-09-20') },
    ];

    return (
        <Layout>
            <Content style={{ padding: '24px' }}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card
                            title={
                                <Flex justify="space-between">
                                    <div>
                                        <CarOutlined style={{ marginRight: 8 }} />Rental Timeline
                                    </div>
                                </Flex>
                            }
                            bordered={false}
                            style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                        >
                            <GanttComponent
                                dataSource={carData}
                                taskFields={taskValues}
                                includeWeekend
                                timelineSettings={{
                                    timelineViewMode: "Week",
                                    timelineUnitSize: 40,
                                    topTier: { unit: 'Month' },
                                    bottomTier: { unit: 'Day', format: 'd' },
                                }}
                            >
                                <ColumnsDirective>
                                    <ColumnDirective field='CarName' headerText='Car Name' width='250' />
                                </ColumnsDirective>
                            </GanttComponent>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};
