import ProductItem from "./components/ProductItem";
import { Select } from 'antd';
import ButtonActive from "../../../components/ButtonActive";
import { useEffect, useState } from "react";
import { GameService } from "../../../services/gameService";
import { GameType } from "../../admin/game/Game";
import { PlayerType } from "../../admin/player/Player";
import { PlayerService } from "../../../services/playerService";
import Banner from "./components/Banner/Banner";
import ButtonRefresh from "../../../components/ButtonRefresh";
import { toast } from "react-toastify";
const { Option } = Select;
const Home: React.FC = () => {
    const [games, setGames] = useState<GameType[]>([])
    const [players, setPlayers] = useState<PlayerType[]>([]);
    const [playersFilter, setPlayersFilter] = useState<PlayerType[]>([]);
    const [selectedGender, setSelectedGender] = useState(0);
    const [selectedGame, setSelectedGame] = useState(null);
    const [activeStatus, setActiveStatus] = useState(false);
    const [playerName, setPlayerName] = useState('');



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

    useEffect(() => {
        getPlayerList();
    }, []);

    const getPlayerList = async () => {
        try {
            const res = await PlayerService.getPlayersClient();
            setPlayers(res.data.data);
            setPlayersFilter(res.data.data)
        } catch (error: any) {
            console.log(error);
        }
    };

    const handleFilter = (e: any) => {
        e.preventDefault();
        const filterCriteria = {
            gender: selectedGender,
            games: selectedGame,
            active: activeStatus,
            name: playerName,
        };

        setPlayers(playersFilter.filter((player) => {
            return (
                // (filterCriteria.gender === 0 || player.gender === filterCriteria.gender) &&
                (filterCriteria.games === null || player.Games.some(game => game.id === filterCriteria.games)) &&
                (filterCriteria.name === '' || player.name.toLowerCase().includes(filterCriteria.name.toLowerCase())) &&
                (filterCriteria.active === false || player.status === 1)
            );
        }));
    };

    const handleDeleteFilter = () => {
        setSelectedGame(null);
        setActiveStatus(false);
        setPlayerName('')
        setSelectedGender(0);
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10%' }}>
                <Banner />
            </div>
            <div className="vip-section p-6 mx-20 ">
                <div className="flex items-center my-4">
                    <form className="flex items-center gap-4" onSubmit={handleFilter}>
                        <Select
                            className="w-[200px]"
                            placeholder="Select games"
                            value={selectedGame}
                            onChange={setSelectedGame}
                        >
                            {games.map((game) => (
                                <Option key={game.id} value={game.id}>
                                    {game.title}
                                </Option>
                            ))}
                        </Select>
                        <ButtonActive active={activeStatus} onClick={() => setActiveStatus(!activeStatus)}>
                            Sẵn sàng
                        </ButtonActive>
                        <input value={playerName} onChange={(e: any) => setPlayerName(e.target.value)} type="text" placeholder="Name Player" className="border rounded-lg px-3 py-[4px] outline-none w-[300px]" />
                        <button type="submit" className="bg-[#f0564a] text-white px-3 py-1 rounded-xl shadow-lg">
                            Tìm kiếm
                        </button>
                        <button onClick={handleDeleteFilter} type="button" className=" text-[#333] px-3 py-1 rounded-xl border">
                            xóa tất cả
                        </button>
                    </form>
                </div>
                <div className="flex items-center justify-between py-3">
                    <h2 className="text-2xl font-bold mb-4 text-[#f0564a]">VIP Players</h2>
                    <div>
                        <ButtonRefresh onClick={() =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    getPlayerList();
                                    resolve(null);
                                    toast.success("Players refreshed successfully")
                                }, 2000);
                            })
                        } />
                    </div>
                </div>
                <div className="products-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {
                        players.map((player, index) => {
                            return (
                                <ProductItem key={index} {...player} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default Home;
