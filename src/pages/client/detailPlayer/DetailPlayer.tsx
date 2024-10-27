import { useParams } from "react-router-dom";
import { PlayerService } from "../../../services/playerService";
import { useEffect, useState } from "react";
import { PlayerType } from "../../admin/player/Player";
import RentForm from "./components/RentForm";
import dayjs from "dayjs";
import { UserService } from "../../../services/userService";
import { RentalRequestService } from "../../../services/rentalRequestService";
import ChatWindow from "./components/ChatWindow";

const DetailPlayer = () => {
    const { id } = useParams();
    const [showRentForm, setShowRentForm] = useState(false);
    const [player, setPlayer] = useState<PlayerType>();
    const [showChat, setShowChat] = useState(false);
    const [user, setUser] = useState();
    const [showChatWindow, setShowChatWindow] = useState(false);

    useEffect(() => {
        getPlayerDetail();
    }, [id]);

    const getPlayerDetail = async () => {
        try {
            let idValue;
            if (id) {
                idValue = parseInt(id, 10);
            }
            const res = await PlayerService.getPlayerById(idValue);
            setPlayer(res.data.data);
        } catch (error: any) {
            console.log(error);
        }
    };

    const getUser = async () => {
        try {
            const user = await UserService.getUser();
            setUser(user.data.data);
            let idValue;
            if (id) {
                idValue = parseInt(id, 10);
                if (isNaN(idValue)) {
                    throw new Error("Invalid ID");
                }
            }

            const rentalRequest = idValue ? await RentalRequestService.getRentalRequestByIdPlayerAll(idValue) : null;

            if (rentalRequest && rentalRequest.data.data && rentalRequest.data.data.length > 0) {
                console.log(rentalRequest.data.data)
                // const checkChat = user.data.data.id === rentalRequest.data.data[0].userId ? true : false;
                const checkChat = rentalRequest.data.data.some((data: any) => (user.data.data.id === data.userId && data.status === 1))
                setShowChat(checkChat);
            } else {
                setShowChat(false);
            }
        } catch (error: any) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (localStorage.getItem('isPlayer') === "false") {
            getUser();
        }
    }, [id]);



    const handleShowRent = () => {
        setShowRentForm(true);
    }

    const handleShowChat = () => {
        setShowChatWindow(true);
    }

    const handleCloseChat = () => {
        setShowChatWindow(false);
    }

    const isPlayer = localStorage.getItem('isPlayer') === "true" || !localStorage.getItem('isPlayer');
    const isStatusDisabled = player?.status === 2 || player?.status === 3;
    const isDisabled = isPlayer || isStatusDisabled;


    return (
        <div className="min-h-screen py-5 px-5 max-w-[1200px] mx-auto">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-start justify-start">
                    <div className="mx-auto flex flex-col gap-2">
                        <img src={player?.avatar} alt={player?.name} className="w-[260px] h-[260px] rounded-lg" />
                        <div className="text-center">
                            <h1 className="text-[#333] font-bold text-3xl">{player?.name}</h1>
                        </div>
                    </div>
                    <div className="px-3 py-2 w-full">
                        {
                            player?.status === 1 ?
                                <p className="text-xl text-green-600 font-semibold text-center">Đang sẵn sàng</p>
                                :
                                player?.status === 2 ?
                                    <p className="text-xl text-slate-600 font-semibold text-center">Chưa sẵn sàng</p>
                                    :
                                    <p className="text-xl text-red-600 font-semibold text-center">Đang bận</p>
                        }
                        <p className="font-semibold text-sm py-2 text-center"><span className="text-slate-500">Ngày tham gia</span>: {dayjs(player?.created_at).format('DD/MM/YYYY')}</p>
                        <p className="font-bold text-base  text-center text-red-600"><span className="text-slate-500">Giá tiền ({'vnđ/giờ'})</span>: {new Intl.NumberFormat('vi-VN').format(player?.price as any)} VNĐ</p>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col items-center justify-between border-b ">
                        {/* <div className="flex items-start w-full py-5 ">
                            <div>
                                <p>Số người theo dõi</p>
                                <p className="text-[#f0564a]">450 người</p>
                            </div>
                        </div>
                        <div className="flex items-start justify-end w-full">
                            <button className="flex items-center gap-1 px-3 py-1 bg-[#f0564a] rounded-full text-white">
                                <Heart size={15} />
                                <p className="font-semibold">Theo dõi</p>
                            </button>
                        </div> */}

                        <div className="flex items-center justify-center w-full my-6">
                            <button
                                disabled={isDisabled}
                                onClick={handleShowRent}
                                className={`${isDisabled ? "opacity-50" : "hover:opacity-80"} w-[300px] py-3 font-semibold text-white bg-slate-600 rounded-lg`}>
                                Thuê
                            </button>
                        </div>
                        {
                            showChat && <div className="flex items-center justify-center w-full my-6">
                                <button
                                    onClick={handleShowChat}
                                    className={`w-[300px] py-3 font-semibold text-[#333] border bg-white rounded-lg`}>
                                    Chat
                                </button>
                            </div>
                        }
                    </div>
                    <div className="grid grid-cols-4 gap-4 w-full pt-6 pb-8 border-t border-b">
                        <div className="col-span-4 text-center pb-3">
                            <h1 className="text-3xl font-semibold text-[#333]">Game</h1>
                        </div>
                        {
                            player?.Games && player?.Games.length > 0 && player?.Games.map((game, index) => {
                                return (
                                    <div
                                        key={index}
                                        className=" h-[60px] bg-cover bg-center rounded-lg"
                                        style={{ backgroundImage: `url(${game.image})` }}
                                    >
                                        <p className="text-white font-bold p-2 bg-black bg-opacity-70 h-full rounded-lg text-center flex items-center justify-center">
                                            {game.title}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="grid grid-cols-4 gap-4 w-full pt-6 pb-8 border-t border-b">
                        <div className="col-span-4 text-center pb-3">
                            <h1 className="text-3xl font-semibold text-[#333]">Bình luận</h1>
                        </div>
                        <div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className="flex items-start flex-col gap-4 w-full py-8 border-b overflow-hidden">
                        <div className="col-span-4 text-center pb-3 mx-auto">
                            <h1 className="text-3xl font-semibold text-[#333]">Thông tin player</h1>
                        </div>
                        <div className="flex items-center py-3 gap-2 px-4 ">
                            {
                                player?.images && player?.images.length > 0 && player.images.map((image, index) => {
                                    return (
                                        <div key={index} className="">
                                            <img src={image} alt={'image'} className="w-[100px] h-[100px] " />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <textarea className="w-[1200px] px-4 h-[800px] outline-none" value={player?.description} />
                        </div>
                    </div>
                </div>
                {/* <div className="border w-[260px] h-[260px] rounded-xl p-3 flex flex-col justify-around">
                    <div>
                        <p className="text-[#f0564a] text-2xl font-semibold text-center">80.000đ/h</p>
                    </div>
                    <div className="flex flex-col gap-3 ">
                        <button className="w-full px-2 py-2 bg-[#f0564a] text-xl text-white font-semibold rounded-lg">Thuê</button>
                        <button className="w-full px-2 py-2 bg-white border text-xl font-semibold rounded-lg">Donate</button>
                        <button className="w-full px-2 py-2 bg-white border text-xl font-semibold rounded-lg">Chat</button>
                    </div>
                </div> */}
            </div>
            <RentForm
                open={showRentForm}
                setOpen={setShowRentForm}
                player={player}
            />
            {
                showChatWindow &&
                <div className="fixed bottom-0 right-[50px]">
                    <ChatWindow
                        player={player}
                        user={user}
                        handleCloseChat={handleCloseChat}
                    />
                </div>
            }
        </div>
    )
}
export default DetailPlayer;