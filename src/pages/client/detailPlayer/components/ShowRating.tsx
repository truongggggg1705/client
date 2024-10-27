import { Modal } from "antd";

type ShowRatingProps = {
    open: boolean
    setOpen: (value: boolean) => void
    player: any
}
const ShowRating = ({ open, setOpen }: ShowRatingProps) => {

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Modal
            title={
                <div className="flex items-center gap-2 text-xl font-bold justify-center text-[#333]">
                    Đánh giá
                </div>
            }
            open={open}
            onCancel={handleClose}
            width={500}
            footer={null}
            className="mt-6"
        >

        </Modal>
    )
}
export default ShowRating;