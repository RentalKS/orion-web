import { Card, Flex, Space, Typography } from "antd";
import { LoginForm } from "./login-form";

const { Title } = Typography;

export const LoginContainer = () => {
    return (
        <Flex
            style={{
                justifyContent: "center",
                alignItems: "center",
                height: "-webkit-fill-available",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    backgroundImage: `url('../src/assets/car-doodle.png')`,
                    backgroundRepeat: "repeat",
                    width: "100%",
                    height: "100%",
                    opacity: "0.1",
                }}
            />
            <Space direction="vertical" size={16}>
                <Card
                    size="small"
                    title={<Title level={2}>Login</Title>}
                    extra={<a href="#">Forgot password?</a>}
                    style={{ width: 300, height: 300, backgroundColor: "#fff" }}
                >
                    <LoginForm />
                </Card>
            </Space>
        </Flex>
    );
};
