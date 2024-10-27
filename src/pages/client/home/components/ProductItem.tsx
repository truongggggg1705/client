import { useNavigate } from "react-router-dom";
import { PlayerType } from "../../../admin/player/Player";


const ProductItem = (data: PlayerType) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col border rounded-lg  max-w-[250px] cursor-pointer shadow-lg" onClick={() => navigate('/player/' + data.id)}>
            <div className="w-full">
                <img
                    src={data.avatar}
                    alt={data.name}
                    className="w-full h-[240px] rounded-t-lg"
                />
            </div>
            <div className="px-2 pt-2 pb-3">
                <div className="py-2">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">{data.name}</p>
                        {
                            data.status === 1 ?
                                <div className="rounded-full w-3 h-3 bg-green-600"></div>
                                :
                                data.status === 2 ?
                                    <div className="rounded-full w-3 h-3 bg-slate-600"></div>
                                    :
                                    <div className="rounded-full w-3 h-3 bg-red-600"></div>

                        }
                    </div>
                </div>
                <div className="flex items-center gap-2 py-2">
                    {
                        data.Games.length > 0 && data.Games.map((game, index) => {
                            return index <= 3 && (
                                <div key={index}>
                                    <img src={game.image} alt={game.name} className="w-6 h-6 rounded-full" />
                                </div>
                            )
                        })
                    }
                    {
                        data.Games.length > 4 && <div className="bg-slate-200 w-6 h-6 rounded-full">
                            <p className="text-[10px] text-slate-700 w-6 h-6 text-center flex items-center justify-center">+{data.Games.length - 4}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductItem;