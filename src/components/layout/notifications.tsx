import React, { useEffect, useState } from "react";
import { Dropdown, List, Button, FloatButton, Spin } from "antd";
import { Bell } from "lucide-react";
import { api } from "../../lib/api-client";
import { CircleCheckBig } from "lucide-react";

const STATIC_TEST_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHBhdHZhdGExQGdtYWlsLmNvbSIsImlhdCI6MTc0MDM0MzE5MiwiZXhwIjoxNzQwNDI5NTkyfQ.IdlFHotqAk6nlmQFCN6Z3gxCdj9I-mj0Sgc6AHUHW50';

interface Notification {
    id: number;
    title: string;
    message: string;
    avatar?: string;
    read: boolean;
}

async function fetchNotifications(): Promise<Notification[]> {
    try {
        const response = await api.get<Notification[]>('/api/notifications', {
            headers: {
                'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }
}

async function markNotificationAsRead(notificationId: number): Promise<void> {
    try {
        await api.post(`/api/notifications/read/${notificationId}`, {}, {
            headers: {
                'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error marking notification as read:", error);
    }
}

async function markAllNotificationsAsRead(): Promise<void> {
    try {
        await api.post(`/api/notifications/read/all`, {}, {
            headers: {
                'Authorization': `Bearer ${STATIC_TEST_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
    }
}

const NotificationMenu: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        async function loadNotifications() {
            setLoading(true);
            const fetchedNotifications = await fetchNotifications();
            setNotifications(fetchedNotifications);
            setLoading(false);
        }
        loadNotifications();
    }, []);

    const handleMarkAsRead = async (id: number) => {
        await markNotificationAsRead(id);
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const handleMarkAllAsRead = async () => {
        await markAllNotificationsAsRead();
        setNotifications((prev) =>
            prev.map((n) => ({ ...n, read: true }))
        );
    };

    const notificationList = (
        <div style={{ width: 420, backgroundColor: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                <span style={{ fontWeight: "bold" }}>Notifications</span>
                <Button type="link" onClick={handleMarkAllAsRead}>
                    Mark all as read
                </Button>
            </div>

            {loading ? (
                <Spin style={{ display: "flex", justifyContent: "center", padding: 20 }} />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={(notification) => (
                        <List.Item
                            onClick={() => handleMarkAsRead(notification.id)}
                            style={{
                                backgroundColor: notification.read ? "#f9f9f9" : "#e6f7ff",
                                cursor: "pointer",
                            }}
                        >
                            <List.Item.Meta
                                style={{margin:20}}
                                avatar={<CircleCheckBig/>}
                                title={notification.title}
                                description={notification.message}
                            />
                        </List.Item>
                    )}
                />
            )}
        </div>
    );

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <Dropdown overlay={notificationList} trigger={['click']} placement="topLeft">
            <FloatButton
                icon={<Bell size={18} />}
                style={{ right: 20, bottom: 20 }}
                badge={{ count: unreadCount }}
            />
        </Dropdown>
    );
};

export default NotificationMenu;
