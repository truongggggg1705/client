import { RefreshCcw } from "lucide-react";
import { useState } from "react";

type ButtonRefreshProps = { onClick: () => void }
const ButtonRefresh = ({ onClick }: ButtonRefreshProps) => {
    const [loading, setLoading] = useState(false)

    const onRefresh = async () => {
        try {
            setLoading(true)
            await onClick();
        } catch (error: any) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button className={`flex py-1 items-center gap-2 border rounded-xl px-2 ${loading ? 'opacity-65' : ''}`} onClick={onRefresh}>
            <p className="text-[#f0564a]">làm mới</p>
            <RefreshCcw size={15} className={`${loading ? 'animate-spin' : ''}`} />
        </button>
    )
}
export default ButtonRefresh;