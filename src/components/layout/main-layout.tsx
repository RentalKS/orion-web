import type { MenuProps } from 'antd';
import { Layout, Menu, Image, Button } from 'antd';

import './styles.css';
import { Bell, CalendarClock, CalendarDays, CarFront, ChartGantt, LayoutDashboard, LogOut, NotepadText, Settings, User, UsersRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NotificationMenu from './notifications';

const { Sider, Content } = Layout;

interface MainLayoutProps {
    contentChildren: React.ReactNode;
}

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    { key: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    {
        key: 'planner',
        label: 'Planner',
        icon: <NotepadText size={20} />,
        children: [
            { key: 'daily', label: 'Daily plan', icon: <CalendarDays size={20} />, className: 'custom-sub-menu-item' },
            { key: 'timeline', label: 'Timeline', icon: <ChartGantt size={20} />, className: 'custom-sub-menu-item' },
        ],
    },
    { key: 'vehicles', icon: <CarFront size={20} />, label: 'Vehicles' },
    { key: 'rentals', icon: <CalendarClock size={20} />, label: 'Rentals' },
    { key: 'clients', icon: <UsersRound size={20} />, label: 'Clients' },
    { type: 'divider', className: 'menu-item-divider' },
    {
        key: 'settings',
        label: 'Settings',
        icon: <Settings size={20} />,
        children: [
            { key: 'account', label: 'Account', icon: <User size={20} />, className: 'custom-sub-menu-item' },
            { key: 'notifications', label: 'Notifications', icon: <Bell size={20} />, className: 'custom-sub-menu-item' },
        ],
    },
]

function MainLayout({ contentChildren }: MainLayoutProps) {
    const navigate = useNavigate();  // Initialize useNavigate

    // Handle menu item click
    const onMenuClick: MenuProps['onClick'] = (e) => {
        navigate(`/${e.keyPath.reverse().join('/')}`)
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider width={250} theme="dark" className='sidebar'>
                <div>
                    <div className='company-name'>
                        <Image
                            width={85}
                            preview={false}
                            src="../src/assets/logo.png"
                            className='logo'
                        />
                    </div>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        items={items}
                        onClick={onMenuClick}
                    />
                </div>
                <Button type="default" className='logout-btn' icon={<LogOut />} size={'large'}>
                    Logout
                </Button>
            </Sider>
            <Layout>
                <Content>
                    {contentChildren}
                </Content>
            </Layout>
            <NotificationMenu />
        </Layout>
    );
};

export default MainLayout;
