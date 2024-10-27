import { PlayerService } from "../../../services/playerService";
import { useEffect, useState } from "react";
import { PlayerType } from "../../admin/player/Player";
import ButtonActive from "../../../components/ButtonActive";
import ButtonRefresh from "../../../components/ButtonRefresh";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ProductItem from "../home/components/ProductItem";
const Collection = () => {
    const { id } = useParams();
    const [players, setPlayers] = useState<PlayerType[]>([]);
    const [playersFilter, setPlayersFilter] = useState<PlayerType[]>([]);
    const [selectedGender, setSelectedGender] = useState(0);
    const [activeStatus, setActiveStatus] = useState(false);
    const [playerName, setPlayerName] = useState('');



    useEffect(() => {
        getPlayerList();
    }, [id]);

    const getPlayerList = async () => {
        try {
            let idValue;
            if (id) {
                idValue = parseInt(id, 10);
            }
            const res = await PlayerService.getPlayersClient(idValue);
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
            active: activeStatus,
            name: playerName,
        };

        setPlayers(playersFilter.filter((player) => {
            return (
                // (filterCriteria.gender === 0 || player.gender === filterCriteria.gender) &&
                (filterCriteria.name === '' || player.name.toLowerCase().includes(filterCriteria.name.toLowerCase())) &&
                (filterCriteria.active === false || player.status === 1)
            );
        }));
    };

    const handleDeleteFilter = () => {
        setActiveStatus(false);
        setPlayerName('')
        setSelectedGender(0);
    }


    return (
        <div className="vip-section p-6 mx-20 ">
            <div className="flex items-center my-4">
                <form className="flex items-center gap-4" onSubmit={handleFilter}>
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
    )
}

export default Collection;