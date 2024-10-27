import { Modal } from "antd";
import { BadgeX, Send, X } from "lucide-react";
import { useState } from "react";

type ConfirmDeleteType = {
    open: boolean;
    handleClose: () => void;
    onDelete: () => Promise<void>; 
    title?: string;
}

const ConfirmDelete = ({
    onDelete,
    open,
    handleClose,
    title
}: ConfirmDeleteType) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        } catch (error) {
            console.error("Error during deletion:", error);
        } finally {
            setLoading(false); 
        }
    }

    return (
        <Modal
            title={
                <div className='flex items-center gap-2 text-xl font-bold justify-center text-[#333]'>
                    <BadgeX strokeWidth={3} />
                    <p>Confirm</p>
                </div>
            }
            open={open}
            onCancel={handleClose}
            width={400}
            footer={null}
        >
            <div className='border-t my-[20px] py-[15px] relative'>
                <p className="text-center">{title}</p>
            </div>
            <div className='mb-4 mt-8 flex items-center justify-center gap-3'>
                <button
                    type="button"
                    className={`flex items-center gap-2 text-base font-semibold border bg-white hover:opacity-80 text-[#333] py-1 px-4 rounded-md ${loading ? 'cursor-wait opacity-50' : ''}`}
                    onClick={handleClose}
                    disabled={loading}
                >
                    <div className='flex items-center justify-center gap-1'>
                        <X size={18} />
                        <span>Cancel</span>
                    </div>
                </button>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className={`${loading ? 'cursor-wait' : ''} flex items-center gap-2 text-base font-semibold border border-slate-600 bg-slate-600 hover:opacity-80 text-white py-1 px-4 rounded-md`}
                >
                    <div className='flex items-center justify-center gap-1'>
                        <Send size={18} />
                        <span>{loading ? 'Deleting...' : 'Delete'}</span>
                    </div>
                </button>
            </div>
        </Modal>
    );
}

export default ConfirmDelete;
