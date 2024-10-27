import { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { PaymentService } from "../../../services/paymentService";

const Thanks = () => {
    const [searchParams] = useSearchParams();
    const [isRequestPending, setIsRequestPending] = useState(false); 
    const hasMounted = useRef(false); // Ref để kiểm tra lần mount đầu tiên
    
    const vnp_Amount = searchParams.get('vnp_Amount');
    const formattedAmount = new Intl.NumberFormat('vi-VN').format((Number(vnp_Amount) || 0) / 100); // Chuyển đổi VNĐ

    // Sử dụng useMemo để tính toán mergedParams chỉ khi searchParams thay đổi
    const mergedParams = useMemo(() => {
        const vnp_Params = window.location.search;
        const paramsString = vnp_Params.slice(vnp_Params.indexOf('?') + 1);
        const paramsArray = paramsString.split('&').map((param) => {
            const [key, value] = param.split('=');
            return { [key]: decodeURIComponent(value) };
        });
        return paramsArray.reduce((merged, param) => {
            return { ...merged, ...param };
        }, {});
    }, [searchParams]);

    const handlePaymentCheck = async () => {
        const storedOrderId = localStorage.getItem("processedOrderId");
        const currentOrderId = mergedParams.vnp_TxnRef; 

        if (storedOrderId === currentOrderId || isRequestPending) {
            console.log("Giao dịch đã được xử lý, không thực hiện lại.");
            return;
        }

        setIsRequestPending(true); // Đặt cờ xử lý

        try {
            await PaymentService.paymentVnpayCheck(mergedParams);
            localStorage.setItem("processedOrderId", currentOrderId); // Lưu mã giao dịch
        } catch (error) {
            console.log(error);
        } finally {
            setIsRequestPending(false); // Đặt lại cờ sau khi xử lý xong
        }
    };

    useEffect(() => {
        if (!hasMounted.current) {
            // Lần đầu tiên component mount
            hasMounted.current = true; // Đánh dấu là đã mount
            const storedOrderId = localStorage.getItem("processedOrderId");
            const currentOrderId = mergedParams.vnp_TxnRef; 
            if (storedOrderId !== currentOrderId && !isRequestPending) {
                handlePaymentCheck(); 
            }
        }
    }, [mergedParams, isRequestPending]);

    return (
        <div>
            <h1 className="text-center text-3xl font-bold min-h-screen flex items-center justify-center">
                Đã Thêm {formattedAmount} VNĐ vào túi thành công!
            </h1>
        </div>
    );
};

export default Thanks;
