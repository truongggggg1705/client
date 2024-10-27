import { Modal, Form, Input, InputNumber } from "antd";
import { useState } from "react";
import { PaymentService } from "../../../../services/paymentService";
import { toast } from "react-toastify";

const WithdrawMoney = ({ user, getUser }: { user: any, getUser: () => Promise<void> }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();
    const [price, setPrice] = useState(0)

    const handleCancel = () => {
        setIsOpen(false);
        form.resetFields();
        setPrice(0);
    };

    const handleSubmit = async (values: any) => {
        console.log(values)
        try {
            await PaymentService.withdrawMoney(values, user)
            toast.success("Rút tiền thành công!");
            getUser();
        } catch {
            toast.error("Rút tiền không thành công!")
        }
        handleCancel();
    };


    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)} className="hover:text-red-700 font-semibold">
                Rút tiền
            </button>
            <Modal
                title={
                    <div>
                        <p className='text-center font-bold text-2xl uppercase tracking-widest'>Withdraw Money</p>
                    </div>
                }
                open={isOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Số tài khoản"
                        name="accountNumber"
                        rules={[{ required: true, message: 'Vui lòng nhập số tài khoản!' }]}
                    >
                        <Input placeholder="Nhập số tài khoản" />
                    </Form.Item>

                    <Form.Item
                        label="Tên ngân hàng"
                        name="bankName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên ngân hàng!' }]}
                    >
                        <Input placeholder="Nhập tên ngân hàng" />
                    </Form.Item>

                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>

                    <Form.Item
                        label={`Số tiền cần rút (tối đa ${new Intl.NumberFormat('vi-VN').format(user?.price)} VNĐ)`}
                        name="amount"
                        rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
                    >
                        <div className="flex items-center gap-5">
                            <InputNumber
                                className="flex-1"
                                type='number'
                                min={0}
                                max={user?.price}
                                addonAfter="VNĐ"
                                onChange={(value) => {
                                    form.setFieldValue('amount', value)
                                    setPrice(value)
                                }}
                                placeholder="Nhập số tiền"
                            />
                            <span className="font-semibold ">{new Intl.NumberFormat('vi-VN').format(price)} VNĐ</span>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <button type="submit" className="w-full text-base bg-slate-700 text-white font-bold py-2 rounded-lg">
                            Xác nhận rút tiền
                        </button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default WithdrawMoney;
