import { Divider, Layout, Menu, Image } from 'antd';

import { ArrowRightLeft, Bell, CarFront, CreditCard, LayoutDashboard, Newspaper, NotebookText, Settings } from 'lucide-react';
import Paragraph from 'antd/es/typography/Paragraph';

import './styles.css';

const { Sider, Content } = Layout;

interface MainLayoutProps {
    contentChildren: React.ReactNode;
}

function MainLayout({ contentChildren }: MainLayoutProps) {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider width={250} theme="dark" style={{ paddingInline: "1.4rem", paddingTop: "2rem" }}>
                <div className='company-name'>
                    <Image
                        width={85}
                        preview={false}
                        src="../src/assets/logo.png"
                        className='logo'
                    />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1" icon={<LayoutDashboard size={20} />} className='menu-item'>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<CarFront size={20} />} className='menu-item'>
                        Vehicles
                    </Menu.Item>
                    <Menu.Item key="3" icon={<NotebookText size={20} />} className='menu-item'>
                        Bookings
                    </Menu.Item>
                    <Menu.Item key="4" icon={<Bell size={20} />} className='menu-item'>
                        Notifications
                    </Menu.Item>
                    <Menu.Item key="5" icon={<Settings size={20} />} className='menu-item'>
                        Settings
                    </Menu.Item>
                    <Divider style={{ backgroundColor: "#6c757d" }} />
                    <Paragraph style={{ color: "#fff", marginLeft: "1rem" }}>Report</Paragraph>
                    <Menu.Item key="6" icon={<CreditCard size={20} />} className='menu-item'>
                        Payment Details
                    </Menu.Item>
                    <Menu.Item key="7" icon={<ArrowRightLeft size={20} />} className='menu-item'>
                        Transactions
                    </Menu.Item>
                    <Menu.Item key="8" icon={<Newspaper size={20} />} className='menu-item'>
                        Car Report
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: "16px", backgroundColor: "#00000010" }}>
                    {contentChildren}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
