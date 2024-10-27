import React, { useState } from 'react';
import { InputNumber, Modal } from 'antd';
import { BadgeDollarSign, Send, X } from 'lucide-react';
import { PaymentService } from '../../../../../services/paymentService';
import { toast } from 'react-toastify';

const DialogPayment: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [price, setPrice] = useState<number>(0);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const res = await PaymentService.payment(price)
            handleCancel()
            window.open(res.data, "_blank");
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={showModal} className='mt-[4px]'>
                <BadgeDollarSign />
            </button>
            <Modal
                title={
                    <div>
                        <p className='text-center font-bold text-2xl uppercase tracking-widest'>Payment</p>
                    </div>
                }
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <div className='h-[200px]'>
                    <div className='h-[120px] flex items-center gap-3 justify-center'>
                        <p className='text-base text-center font-semibold'>Amount:</p>
                        <InputNumber
                            onChange={(value) => setPrice(value || 0)}
                            value={price}
                            type='number'
                            addonAfter="VNĐ"
                            defaultValue={0}
                        />
                        <p className='font-semibold'>{new Intl.NumberFormat('vi-VN').format(price)} VNĐ</p>
                    </div>
                    <p className='text-center text-sm'><span className='font-bold'>Lưu ý:</span> Khi nạp tiền sẽ trừ 1% phí giao dịch</p>
                    <div className='flex items-center gap-5 justify-center pt-6'>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className={` flex items-center gap-2 text-base font-semibold border border-slate-400 bg-white hover:opacity-80 text-[#333] py-1 px-4 rounded-md`}
                        >
                            <div className='flex items-center justify-center gap-1'>
                                <><X size={18} /><span>Cancel</span></>
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={handleOk}
                            className={` flex items-center gap-2 text-base font-semibold border border-slate-600 bg-slate-600 hover:opacity-80 text-white py-1 px-4 rounded-md`}
                        >
                            <div className='flex items-center justify-center gap-1'>
                                <><Send size={18} /><span>Payment</span></>
                            </div>
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DialogPayment;