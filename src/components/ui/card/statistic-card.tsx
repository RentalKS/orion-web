// src/components/StatisticCard.tsx

import React from 'react';
import { Card, Statistic, StatisticProps, Typography } from 'antd';
import { CardProps } from 'antd/es/card';
import { valueType } from 'antd/es/statistic/utils';
import { CardIcon } from '.';

interface StatisticCardProps {
    icon?: React.ComponentType<any>;
    title?: React.ReactNode;
    value?: valueType;
    color?: string;
    props?: {
        statistics?: StatisticProps;
        card?: CardProps;
        icon?: React.SVGProps<SVGSVGElement>
    }
}

const { Text } = Typography;

export const StatisticCard: React.FC<StatisticCardProps> = ({ icon, title, value, color, props }) => {

    const getFormattedTitle = (title?: React.ReactNode) => {
        if (typeof title !== "string") return title;
        return <Text style={{ fontWeight: 500, color: '#95959a' }}>{title}</Text>
    }

    const getFormattedValue = (value?: string | number) => {
        return typeof value === "number" ? value.toLocaleString() : value;
    }

    return (
        <Card
            style={{
                minWidth: icon ? 300 : 230,
                width: 'fit-content',
                borderRadius: '4px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
            }}
            styles={{
                body: {
                    padding: 12,
                    display: 'flex',
                    alignItems: 'center'
                }
            }}
            {...props?.card}
        >
            {icon && <CardIcon icon={icon} color={color} {...props?.icon} />}
            <div style={{ margin: 16, marginLeft: 18 }}>
                <Statistic
                    valueStyle={{
                        fontWeight: 700,
                        fontSize: '32px'
                    }}
                    {...props?.statistics}
                    title={getFormattedTitle(title)}
                    value={getFormattedValue(value)}
                />
            </div>
        </Card>
    );
};
