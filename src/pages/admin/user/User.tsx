import { useEffect, useState } from "react";
import { UserService } from "../../../services/userService";
import { toast } from "react-toastify";
import Table, { Column } from "../../../components/Table";
import SwitchStatus from "../../../components/SwitchStatus";
const User = () => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const getUsers = async () => {
        try {
            const res = await UserService.getAllUser();
            setUsers(res.data.data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    }

    const handleUpdateStatus = async (checked: boolean, row: any) => {
        try {
            const valueCheck = checked ? 1 : 0;
            const res = await UserService.updateUserByAdmin(row.id, {
                status: valueCheck,
            });
            toast.success(res.data.msg);
            getUsers();
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };
    const columns: Column[] = [
        {
            field: 'id',
            headerName: 'Id',
        },
        {
            field: 'fullName',
            headerName: 'FullName',
        },
        {
            field: 'email',
            headerName: 'Email',
        },
        {
            field: 'status',
            headerName: 'Status',
            render: (row) => {
                return <SwitchStatus row={row} handleUpdate={handleUpdateStatus} />
            }
        }
    ]
    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="max-w-[1500px] px-6 pt-52 flex flex-col mx-auto gap-4 h-full">
            <Table columns={columns} data={users} setCurrentPage={setCurrentPage}
                currentPage={currentPage} />
        </div>
    )
}
export default User;