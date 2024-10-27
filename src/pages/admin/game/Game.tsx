import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import GameForm from "./components/GameForm";
import { GameService } from "../../../services/gameService";
import Table, { Column } from "../../../components/Table";
import ConfirmDelete from "../../../components/ConfirmDelete";

export type GameType = {
    id: number;
    title: string;
    image: string;
}


const Game = () => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [games, setGames] = useState<GameType[]>([])
    const [game, setGame] = useState<GameType | null>(null);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        getGameList();
    }, [])

    const getGameList = async () => {
        try {
            const res = await GameService.getGames();
            setGames(res.data.data)
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleActions = (action: string, game: any) => {
        switch (action) {
            case 'edit':
                setIsOpenForm(true);
                setGame(game);
                break;
            case 'delete':
                setIsOpenConfirm(true);
                setGame(game);
                break;
            default:
                break;
        }
    }


    const handleCloseDelete = () => {
        setIsOpenConfirm(false);
        setGame(null);
    }

    const handleDelete = async () => {
        if (game) {
            try {
                await GameService.deleteGame(game.id);
                setIsOpenConfirm(false);
                getGameList();
                handleCloseDelete();
            } catch (error: any) {
                console.log(error);
            }
        }
    };


    const columns: Column[] = [
        {
            field: 'id',
            headerName: 'Id',
        },
        {
            field: 'title',
            headerName: 'Title',
        },
        {
            field: 'image',
            headerName: 'Image',
            render: (row) => {
                return <div>
                    <img
                        src={row.image}
                        alt={row.title}
                        className="w-10 h-10"
                    />
                </div>
            }
        },
        {
            field: 'actions',
            headerName: <div className="text-center">Actions</div>,
            render: (row) => {
                return (
                    <div className="flex items-center gap-4 justify-center text-[#333]">
                        <button className="w-10 h-10" onClick={() => handleActions('edit', row)}>
                            <Edit size={20} className="mx-auto" />
                        </button>
                        <button className="pb-[2px] w-10 h-10" onClick={() => handleActions('delete', row)}>
                            <Trash2 size={20} className="mx-auto" />
                        </button>
                    </div>
                )
            }
        },
    ]

    return (
        <div className="max-w-[1500px] px-6 pt-36 flex flex-col mx-auto gap-4 h-full">
            <div className="flex ">
                <button
                    onClick={() => setIsOpenForm(true)}
                    className="shadow-lg flex items-center gap-1 px-4 bg-slate-600 py-2 rounded-full text-white hover:opacity-80 duration-300">
                    <Plus size={22} />
                    <span>Create game</span>
                </button>
            </div>
            <div className="w-full ">
                <Table columns={columns} data={games} setCurrentPage={setCurrentPage}
                    currentPage={currentPage} />
            </div>
            <GameForm
                open={isOpenForm}
                setOpen={setIsOpenForm}
                game={game}
                setGame={setGame}
                getGameList={getGameList}
            />
            <ConfirmDelete
                open={isOpenConfirm}
                handleClose={handleCloseDelete}
                onDelete={handleDelete}
                title={`Are you sure you want to delete the game "${game?.title}"?`}
            />
        </div>
    )
}

export default Game;