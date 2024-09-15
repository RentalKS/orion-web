import React, { useState } from "react";
import { Dropdown, List, Avatar, Button, FloatButton } from "antd";
import { Bell } from "lucide-react";

// Define a type for the notification object
interface Notification {
    id: number;
    title: string;
    description: string;
    avatar?: string;
    read: boolean;
}

const NotificationMenu: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            title: "New rental",
            description: "BMW M3 has been rented for dates ...",
            avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFJSMyHRaBeejsHUZlaXiKzdShyOT3QUNRdg&s",
            read: false,
        },
        {
            id: 2,
            title: "Audi A4 return",
            description: "Audi A4 will return today at 16:00",
            avatar: "https://t3.ftcdn.net/jpg/01/92/21/40/360_F_192214085_QnQ58x0ZKRLSUEgarcjVHNWrnmH8uWTA.jpg",
            read: true,
        },
        {
            id: 3,
            title: "New client",
            description: "A new client has been registered",
            avatar: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png",
            read: false,
        },
    ]);

    // Mark all notifications as read
    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notification) => ({ ...notification, read: true }))
        );
    };

    const notificationList = (
        <div style={{ width: 300, backgroundColor: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                <span>Notifications</span>
                <Button type="link" onClick={markAllAsRead}>
                    Mark all as read
                </Button>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={(notification) => (
                    <List.Item style={{ backgroundColor: notification.read ? "#f9f9f9" : "#e6f7ff" }}>
                        <List.Item.Meta
                            avatar={<Avatar src={notification.avatar} />}
                            title={notification.title}
                            description={notification.description}
                        />
                    </List.Item>
                )}
            />
        </div>
    );

    // Count unread notifications
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <Dropdown overlay={notificationList} trigger={['click']} placement="topLeft" overlayStyle={{
            right: "68px",
            bottom: "18px",
        }}>
            <FloatButton
                icon={<Bell size={18} />}
                style={{ right: 20, bottom: 20 }} // Positioning for the FloatButton
                badge={{ count: unreadCount }}
            />
        </Dropdown>
    );
};

export default NotificationMenu;
