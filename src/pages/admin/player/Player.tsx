import { BookUser, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { PlayerService } from "../../../services/playerService";
import Table, { Column } from "../../../components/Table";
import ConfirmDelete from "../../../components/ConfirmDelete";
import PlayerForm from "./components/PlayerForm";
import { Tabs } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

export type PlayerType = {
    id: number;
    avatar: string;
    name: string;
    email: string;
    Games: any[];
    images: string[];
    description: string;
    achievements: any[];
    status: number;
    gender: string;
    price: number;
    created_at: string;
};

const Player = () => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [players, setPlayers] = useState<PlayerType[]>([]);
    const [player, setPlayer] = useState<PlayerType | null>(null);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status');
    const active = searchParams.get('active');

    const getPlayerList = useCallback(async () => {
        try {
            const res = await PlayerService.getPlayers();
            setPlayers(status && parseInt(status, 10) !== 0 ? res.data.data.filter((player: any) => player.status === parseInt(status, 10)) : res.data.data);
        } catch (error: any) {
            console.log(error);
        }
    }, [status])

    useEffect(() => {
        getPlayerList();
    }, [getPlayerList]);

    const handleActions = (action: string, player: any) => {
        switch (action) {
            case 'detail':
                setIsOpenForm(true);
                setPlayer(player);
                break;
            case 'delete':
                setIsOpenConfirm(true);
                setPlayer(player);
                break;
            default:
                break;
        }
    };

    const handleCloseDelete = () => {
        setIsOpenConfirm(false);
        setPlayer(null);
    };

    const handleDelete = async () => {
        if (player) {
            try {
                await PlayerService.deletePlayer(player.id);
                setIsOpenConfirm(false);
                getPlayerList();
                handleCloseDelete();
            } catch (error: any) {
                console.log(error);
            }
        }
    };

    const handleStatusChange = (value: string) => {
        navigate(`/admin/players?status=${value}`);
        setCurrentPage(1);
    }

    // const handleUpdateStatus = async (checked: boolean, row: any) => {
    //     try {
    //         const valueCheck = checked ? 1 : 0;
    //         const res = await PlayerService.updatePlayer(row.id, {
    //             status: valueCheck,
    //         });
    //         toast.success(res.data.msg);
    //         getPlayerList();
    //     } catch (error: any) {
    //         toast.error(error?.response?.data?.message);
    //     }
    // };

    const columns: Column[] = [
        {
            field: 'id',
            headerName: 'Id',
        },
        {
            field: 'name',
            headerName: 'Name',
        },
        {
            field: 'email',
            headerName: 'Email',
        },
        {
            field: 'status',
            headerName: 'Status',
            render: (row) => {
                const status = items?.find((item: any) => parseInt(item.key, 10) === row.status)
                return <div className={` text-white w-[130px] text-center rounded-full py-[2px]`} style={{ background: status?.color }}>
                    {status?.label}
                </div>
            }
        },
        {
            field: 'actions',
            headerName: <div className="text-center">Actions</div>,
            render: (row) => {
                return (
                    <div className="flex items-center gap-4 justify-center text-[#333]">
                        <button className="w-10 h-10" onClick={() => handleActions('detail', row)}>
                            <BookUser size={20} className="mx-auto" />
                        </button>
                        {
                            status === '4' ? '' : <button className="pb-[2px] w-10 h-10" onClick={() => handleActions('delete', row)}>
                                <Trash2 size={20} className="mx-auto" />
                            </button>
                        }
                    </div>
                );
            },
        },
    ];

    const columnCancel = [
        {
            field: 'id',
            headerName: 'Id',
        },
        {
            field: 'name',
            headerName: 'Name',
        },
        {
            field: 'email',
            headerName: 'Email',
        },
        {
            field: 'status',
            headerName: 'Status',
            render: (row: any) => {
                const status = items?.find((item: any) => parseInt(item.key, 10) === row.status)
                return <div className={` text-white w-[130px] text-center rounded-full py-[2px]`} style={{ background: status?.color }}>
                    {status?.label}
                </div>
            }
        },
    ]




    const items: any = [
        {
            key: '0',
            label: 'All',
        },
        {
            key: '1',
            label: 'Active',
            color: "green",
        },
        {
            key: '2',
            label: 'Not active',
            color: "gray",
        },
        {
            key: '3',
            label: 'Busy',
            color: "red",
        },
        {
            key: '4',
            label: 'Pending approval',
            color: "#9f9f25",
        },
        {
            key: '5',
            label: 'Not approved',
            color: "#4d0101",
        },
    ];

    return (
        <div className="max-w-[1500px] px-6 pt-36 flex flex-col mx-auto gap-4 h-full">
            <div className="flex ">
                <button
                    onClick={() => setIsOpenForm(true)}
                    className="shadow-lg flex items-center gap-1 px-4 bg-slate-600 py-2 rounded-full text-white hover:opacity-80 duration-300">
                    <Plus size={22} />
                    <span>Create Player</span>
                </button>
            </div>
            <div className="w-full ">
                <Tabs
                    defaultActiveKey={status ?? '0'}
                    items={items}
                    onChange={(value) => handleStatusChange(value)}
                />
            </div>
            <div className="w-full ">
                <Table
                    columns={status === '5' ? columnCancel : columns}
                    data={players}
                    active={active ? parseInt(active, 10) : undefined}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            <ConfirmDelete
                open={isOpenConfirm}
                handleClose={handleCloseDelete}
                onDelete={handleDelete}
                title={`Are you sure you want to delete the player "${player?.email}"?`}
            />
            <PlayerForm
                open={isOpenForm}
                setOpen={setIsOpenForm}
                getPlayerList={getPlayerList}
                player={player}
                setPlayer={setPlayer}
                approval={player?.status === 4 ? true : false}
            />
        </div>
    );
};

export default Player;
