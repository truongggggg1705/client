import { Modal, Select } from "antd";
import Label from "../../../../components/Label";
import { useEffect, useState } from "react";
import { Send, Wallet, X } from "lucide-react";
import { RentalRequestService } from "../../../../services/rentalRequestService";
import { toast } from "react-toastify";
import { UserService } from "../../../../services/userService";

type RentFormProps = {
    open: boolean
    setOpen: (value: boolean) => void
    player: any
}

const RentForm = ({ open, setOpen, player }: RentFormProps) => {
    const [duration, setDuration] = useState<number>(1);
    const [price, setPrice] = useState(0)
    const [user, setUser] = useState<any>();

    const getUser = async () => {
        try {
            let res: any;
            if (localStorage.getItem('accessToken')) {
                res = await UserService.getUser();
                setUser(res.data.data);
            }
        } catch (error: any) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (open) {
            setPrice(player.price)
            getUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    const handleDurationChange = (value: number) => {
        setDuration(value);
        setPrice(player.price * value);
    };

    const handleClose = () => {
        setOpen(false);
        setDuration(1)
        setPrice(0)
    }


    const handleSubmit = async () => {
        try {
            const rental = await RentalRequestService.getRentalRequestByIdPlayer(player.id)
            const checkRental = rental.data.data.some((data: any) => data.userId === user.id);
            if (!checkRental) {
                const payload = { totalPrice: price, hours: duration, playerId: player.id };
                await RentalRequestService.createRentalRequest(payload);
                toast.success("Yêu cầu thuê đã được gửi!")
                handleClose();
            }
            else {
                toast.warning("Đã có yêu cầu thuê trước đó!")
            }
        } catch {
            toast.error("Đã xảy ra lỗi!")
        }
    }

    return <Modal
        title={
            <div className="flex items-center gap-2 text-xl font-bold justify-center text-[#333]">
                Thuê player
            </div>
        }
        open={open}
        onCancel={handleClose}
        width={500}
        footer={null}
        className="mt-6"
    >
        <div className="grid grid-cols-1 gap-4 border-t py-5">
            <div className="grid grid-cols-5 text-base font-semibold">
                <Label className="col-span-3">Player:</Label>
                <p className="col-span-2">{player?.name}</p>
            </div>
            <div className="grid grid-cols-5 text-base font-semibold">
                <Label className="col-span-3">Thời gian:</Label>
                <Select
                    className="col-span-2"
                    onChange={handleDurationChange}
                    defaultValue={1}
                    value={duration}
                    style={{ width: "100%" }}
                >
                    {Array.from({ length: 24 }, (_, index) => (
                        <Select.Option key={index + 1} value={index + 1}>
                            {index + 1} giờ
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="grid grid-cols-5 text-base font-semibold">
                <Label className="col-span-3">Chi phí:</Label>
                <p className="col-span-2">{new Intl.NumberFormat('vi-VN').format(price)} VNĐ</p>
            </div>
            <div className="flex justify-center items-center gap-3">
                <button
                    type="button"
                    className='flex items-center gap-2 text-base font-semibold border bg-white hover:opacity-80 text-[#333] py-1 px-4 rounded-md'
                    onClick={handleClose}
                >
                    <div className='flex items-center justify-center gap-1'>
                        <X size={18} />
                        <span>Hủy</span>
                    </div>
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={user?.price < price}
                    className={` flex items-center gap-2 text-base font-semibold border ${user?.price < price ? "opacity-80" : " "} border-slate-600 bg-slate-600 hover:opacity-80 text-white py-1 px-4 rounded-md`}
                >
                    {
                        user?.price >= price ?
                            <div className='flex items-center justify-center gap-1'>
                                <><Send size={18} /><span>Thuê</span></>
                            </div>
                            :
                            <div className='flex items-center justify-center gap-1'>
                                <><Wallet size={18} /><span>Ví không đủ</span></>
                            </div>
                    }
                </button>
            </div>
        </div>

    </Modal>
}

export default RentForm;