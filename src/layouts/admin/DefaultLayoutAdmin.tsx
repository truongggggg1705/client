import { useEffect, useState } from "react";
import { UserService } from "../../services/userService";
import Sidebar from "./components/Sidebar";
import { toast } from "react-toastify";
import Page404 from '../../pages/pageError/Page404';
import Header from "./components/Header";

const DefaultLayoutAdmin = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [isAdmin, setIsAdmin] = useState(false);

    // useEffect(() => {
    //     if (!socket) return;

    //     const handleNewPlayer = (data: any) => {
    //         toast.info(data.message);
    //         console.log("New Player Data:", data.player);
    //     };

    //     socket.on("newPlayerNotification", handleNewPlayer);

    //     return () => {
    //         socket.off("newPlayerNotification", handleNewPlayer);
    //     };
    // }, [socket]);

    const getUser = async () => {
        try {
            const res = await UserService.getUser();
            setIsAdmin(res.data.data.role === 1 ? true : false);
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    }
    useEffect(() => {
        getUser();
    }, [])

    if (!isAdmin) {
        return <Page404 />
    }

    return <div className="w-full flex min-h-screen gap-2 relative">
        <div>
            <div className="absolute top-0 right-0">
                <Header />
            </div>
            <Sidebar />
        </div>
        <div className="flex-1">
            {children}
        </div>
    </div>
}
export default DefaultLayoutAdmin;