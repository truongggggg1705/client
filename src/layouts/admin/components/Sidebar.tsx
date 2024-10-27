import { Gamepad2, LogOut } from "lucide-react";
import MenuList from "./MenuList";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/authService";

const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogOut  = () => {
        AuthService.logout();
        toast.success("Logged out successfully");
        navigate('/')
    }

    return <div className="flex flex-col h-full w-[250px] shadow-lg border-r">
        <div className="py-10 px-4 flex flex-col h-full gap-y-10">
            <div className="text-center border-b pb-6">
                <div className="w-full py-1">
                    <Gamepad2
                        className="mx-auto text-slate-700"
                        size={55}
                    />
                </div>
                <h1 className="text-3xl font-bold uppercase -tracking-widest text-slate-700">management</h1>
            </div>
            <MenuList />
            <div className="flex items-center w-full  bg-slate-600 hover:opacity-80 duration-300 text-white py-2 rounded-full cursor-pointer" onClick={handleLogOut}>
                <div className="flex items-center mx-auto gap-2">
                    <LogOut />
                    <span className="font-semibold ">Logout</span>
                </div>
            </div>
        </div>
    </div>
}

export default Sidebar;