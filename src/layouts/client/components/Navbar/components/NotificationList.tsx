import { Bell, Dot } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { NotificationService } from "../../../../../services/notificationService";

const SOCKET_SERVER_URL = "https://node-mysql-0u5t.onrender.com"; // Replace with your server URL


const NotificationItem = ({ notify, fetchNotifications }: { notify: any; fetchNotifications: () => void }) => {
    const [status, setStatus] = useState(notify.status);
    const navigate = useNavigate()
    const handleClick = async () => {
        if (notify.status === 1) {
            await NotificationService.markNotificationAsRead(notify.id, 0)
            fetchNotifications();
            setStatus(0)
        }
        navigate(notify.path)
    }
    return (
        <div
            onClick={handleClick}
            className={`cursor-pointer border-b *:text-[#333] *:text-left ${status ? "bg-slate-100" : ''}`}
        >
            <div className="px-2 py-2">
                <p className="text-sm font-bold">{notify.title}</p>
                <p className="text-sm">{notify.message}</p>
                <p className="text-xs text-gray-400">
                    {new Date(notify.created_at || notify.player.createdAt).toLocaleString()}
                </p>
            </div>
        </div>
    )
}


const NotificationList = () => {
    const [notification, setNotification] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]); // Adjust the type as needed

    const bellRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = async () => {
        try {
            const response = await NotificationService.getAllNotifications();
            setNotifications(response.data.data); // Assuming response.data contains the list of notifications
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        const socket = socketIOClient(SOCKET_SERVER_URL, {
            auth: {
                token: localStorage.getItem('accessToken'),
            },
        });

        socket.on("newPriceNotification", () => {
            fetchNotifications();
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                bellRef.current &&
                !bellRef.current.contains(event.target as Node)
            ) {
                setNotification(false);
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <div
                ref={bellRef}
                onClick={() => setNotification(!notification)}
                className="cursor-pointer w-[45px] flex flex-col justify-center rounded-full h-[45px]"
            >
                <Bell className="mx-auto" />
                {
                    notifications.length > 0 && notifications.some((notification) => notification.status === 1) && (
                        <div className="absolute top-[2px] right-[2px]">
                            <Dot size={25} color="red" strokeWidth={5} />
                        </div>
                    )
                }
            </div>
            {notification && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full mt-2 z-50 right-1 w-[270px] max-h-[500px] bg-white shadow-lg border rounded-lg overflow-y-auto"
                >
                    <div className="py-2 h-[400px]">
                        <h2 className="text-lg font-semibold mb-2 text-center text-[#333]">Notifications</h2>
                        {notifications.length === 0 ? (
                            <p className="text-gray-500 text-center">No new notifications.</p>
                        ) : (
                            notifications.map((notif, index) => (
                                <NotificationItem key={index} notify={notif} fetchNotifications={fetchNotifications} />
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationList;
