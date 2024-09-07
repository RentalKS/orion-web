import { Divider, Layout, Menu } from 'antd';

import { ArrowRightLeft, Bell, CarFront, CreditCard, LayoutDashboard, Newspaper, NotebookText, Settings } from 'lucide-react';
import Paragraph from 'antd/es/typography/Paragraph';

const { Sider, Content } = Layout;

interface MainLayoutProps {
    contentChildren: React.ReactNode;
}

function MainLayout({ contentChildren }: MainLayoutProps) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={250} theme="dark" style={{ paddingInline: '1.4rem', paddingTop: "4rem" }}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<LayoutDashboard size={20} />} style={{ paddingLeft: "18px" }}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<CarFront size={20} />} style={{ paddingLeft: "18px" }}>
                        Vehicles
                    </Menu.Item>
                    <Menu.Item key="3" icon={<NotebookText size={20} />} style={{ paddingLeft: "18px" }}>
                        Bookings
                    </Menu.Item>
                    <Menu.Item key="4" icon={<Bell size={20} />} style={{ paddingLeft: "18px" }}>
                        Notifications
                    </Menu.Item>
                    <Menu.Item key="5" icon={<Settings size={20} />} style={{ paddingLeft: "18px" }}>
                        Settings
                    </Menu.Item>
                    <Divider />
                    <Paragraph style={{ color: "#fff", marginLeft: "1rem" }}>Report</Paragraph>
                    <Menu.Item key="6" icon={<CreditCard size={20} />} style={{ paddingLeft: "18px" }}>
                        Payment Details
                    </Menu.Item>
                    <Menu.Item key="7" icon={<ArrowRightLeft size={20} />} style={{ paddingLeft: "18px" }}>
                        Transactions
                    </Menu.Item>
                    <Menu.Item key="8" icon={<Newspaper size={20} />} style={{ paddingLeft: "18px" }}>
                        Car Report
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '16px', backgroundColor: '#00000010' }}>
                    {contentChildren}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
