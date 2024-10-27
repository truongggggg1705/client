import { useEffect, useState } from 'react';
import Label from '../../../components/Label';
import { RentalRequestService } from '../../../services/rentalRequestService';
import { UserService } from '../../../services/userService';
import { toast } from 'react-toastify';
import { PlayerService } from '../../../services/playerService';
import { Send, X } from 'lucide-react';
import ChatWindow from './components/ChatWindow';

const RentalRequestList = () => {
    const [rentalRequestList, setRentalRequestList] = useState<any[]>([]);
    const [player, setPlayer] = useState<any>(null);
    const [showChat, setShowChat] = useState(false)
    const [user, setUser] = useState()
    const [rental, setRental] = useState()

    const getPlayer = async () => {
        try {
            const user = await UserService.getUser();
            if (user.data.data) {
                const res = await PlayerService.getPlayers();
                setPlayer(res.data.data.find((item: any) => user.data.data.id === item.userId))
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || 'Failed to fetch user data');
        }
    };

    useEffect(() => {
        getPlayer();
    }, [showChat]);


    const getUserChat = async () => {
        try {
            const res = await RentalRequestService.getRentalRequestByIdPlayerAll(player?.id);
            setUser(res.data.data.find((p:any) => p.status === 1).User)
            setShowChat(true);
            setRental(res.data.data.find((p:any) => p.status === 1))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserChat()
    },[showChat])

    useEffect(() => {
        if (player) {
            getRentalRequestList();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player]);


    const getRentalRequestList = async () => {
        try {
            const res = await RentalRequestService.getRentalRequestByIdPlayer(player?.id);
            setRentalRequestList(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = async (id: number) => {
        try {
            await RentalRequestService.deleteRentalRequest(id)
            toast.success("Rental request cancel successfully")
            getRentalRequestList();
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    }

    const handleSubmit = async (id: number, user: any) => {
        try {
            const res = await RentalRequestService.getRentalRequestByIdPlayerAll(player?.id);
            if (res.data.data.some((p:any) => p.status === 1)) {
                toast.error("You have confirmed a previous request")
                return;
            }
            await RentalRequestService.updateRentalRequest(id, { status: 1 })
            toast.success("Rental confirmation successfully")
            setShowChat(true);
            setUser(user);
            getRentalRequestList();
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    }

    const handleCloseChat = () => {
        setShowChat(false);
    }

    console.log(user)

    return (
        <div className="min-h-screen w-[1200px] p-6 shadow-lg rounded-lg mx-auto my-4 border">
            <div>
                <h2 className='text-3xl text-center font-bold uppercase tracking-wider'>Rental Request</h2>
            </div>
            {
                rentalRequestList.map((rentalRequest) => {
                    return (
                        <div className='flex items-center w-full border rounded-lg shadow-md py-3 px-5 justify-between my-6 text-base font-semibold'>
                            <div className='flex items-center gap-3'>
                                <Label>User: </Label>
                                <p>{rentalRequest.User.fullName}</p>
                            </div>
                            <div className='flex gap-10 items-center justify-start w-[50%]'>
                                <p>hours: {rentalRequest.hours}</p>
                                <p>sumPrice: {new Intl.NumberFormat('vi-VN').format(rentalRequest.totalPrice)} VNĐ</p>
                            </div>
                            <div className="flex justify-center items-center gap-3">
                                <button
                                    type="button"
                                    className='flex items-center gap-2 text-base font-semibold border bg-white hover:opacity-80 text-[#333] py-1 px-4 rounded-md'
                                    onClick={() => handleClose(rentalRequest.id)}
                                >
                                    <div className='flex items-center justify-center gap-1'>
                                        <X size={18} />
                                        <span>No</span>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSubmit(rentalRequest.id, rentalRequest.User)}
                                    className={` flex items-center gap-2 text-base font-semibold border border-slate-600 bg-slate-600 hover:opacity-80 text-white py-1 px-4 rounded-md`}
                                >
                                    <div className='flex items-center justify-center gap-1'>
                                        <><Send size={18} /><span>Yes</span></>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )
                })
            }
            {
                showChat && (
                    <div className='fixed bottom-0 right-[50px]'>
                        <ChatWindow
                            player={player}
                            user={user}
                            handleCloseChat={handleCloseChat}
                            rental={rental}
                        />
                    </div>
                )
            }
        </div>
    );
};

export default RentalRequestList;
