import { Card, Statistic, Row, Col } from "antd";
import { CarOutlined, CheckCircleOutlined, CloseCircleOutlined, ToolOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

interface VehicleData {
    totalVehicles: number;
    availableVehicles: number;
    rentedVehicles: number;
    reservedVehicles: number;
    underMaintenance: number;
    outOfServiceVehicles: number;
}

interface DashboardVehiclesProps {
    vehiclesData: VehicleData[];
}

export const DashboardVehicles: React.FC<DashboardVehiclesProps> = ({ vehiclesData }) => {
    if (!vehiclesData.length) {
        return <Card title="Vehicle Status"><p>No vehicle data available.</p></Card>;
    }

    const {
        totalVehicles,
        availableVehicles,
        rentedVehicles,
        reservedVehicles,
        underMaintenance,
        outOfServiceVehicles
    } = vehiclesData[0];

    return (
        <Card title="Vehicle Status" style={{ width: "30%" }}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Statistic title="Total Vehicles" value={totalVehicles} prefix={<CarOutlined />} />
                </Col>
                <Col span={12}>
                    <Statistic title="Available" value={availableVehicles} prefix={<CheckCircleOutlined style={{ color: "green" }} />} />
                </Col>
                <Col span={12}>
                    <Statistic title="Rented" value={rentedVehicles} prefix={<CloseCircleOutlined style={{ color: "red" }} />} />
                </Col>
                <Col span={12}>
                    <Statistic title="Reserved" value={reservedVehicles} prefix={<ExclamationCircleOutlined style={{ color: "orange" }} />} />
                </Col>
                <Col span={12}>
                    <Statistic title="Under Maintenance" value={underMaintenance} prefix={<ToolOutlined style={{ color: "blue" }} />} />
                </Col>
                <Col span={12}>
                    <Statistic title="Out of Service" value={outOfServiceVehicles} prefix={<CloseCircleOutlined style={{ color: "gray" }} />} />
                </Col>
            </Row>
        </Card>
    );
};
