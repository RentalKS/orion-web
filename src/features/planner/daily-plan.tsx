import { Button, Flex, Space, Table, Tag, Typography } from 'antd';
import type { TableProps } from 'antd';
import { reserveData } from '../../utils/dummyData';
import { ChevronsDown, ChevronsUp, Pencil, ReceiptText, Trash2 } from 'lucide-react';
import dayjs from 'dayjs';

const { Text } = Typography;

export interface DataType {
    key: string;
    id: string;
    dates: string;
    client: string;
    vehicle: string;
    amount: string;
    status: string[];
    expendable?: boolean;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'From/To',
        dataIndex: 'dates',
        key: 'dates',
        render: () => {
            return (
                <Flex vertical={true}>
                    <Text>{dayjs(new Date('10/10/2024')).toString()}</Text>
                    <Text>{dayjs(new Date('10/21/2024')).toString()}</Text>
                </Flex>
            );
        }
    },
    {
        title: 'Client',
        dataIndex: 'client',
        key: 'client',
    },
    {
        title: 'Vehicle',
        dataIndex: 'vehicle',
        key: 'vehicle',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, { status }) => (
            <>
                {
                    status.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag} >
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })
                }
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="small" >
                <Button type="text" icon={<ReceiptText size={18} />} />
                <Button type="text" icon={<Pencil size={18} />} />
                <Button type="text" icon={<Trash2 size={18} />} />
            </Space>
        ),
    },
];

export const DailyPlan = () => {
    return (
        <Table
            columns={columns}
            dataSource={reserveData}
            expandable={{
                expandedRowRender: () => <p style={{ margin: 0 }}>Booking details will be displayed here</p>,
                rowExpandable: (record) => record.expendable ?? false,
                expandIcon: ({ expanded, onExpand, record }) =>
                    !record.expendable ?
                        null
                        :
                        expanded ? (
                            <Button type="link" onClick={e => onExpand(record, e)} style={{ padding: 0 }}>
                                <ChevronsUp size={16} />
                            </Button>
                        ) : (
                            <Button type="link" onClick={e => onExpand(record, e)} style={{ padding: 0 }}>
                                <ChevronsDown size={16} />
                            </Button>
                        ),
            }}
        />
    );
}