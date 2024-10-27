import { Switch } from "antd";
import { useEffect, useState } from "react";

const SwitchStatus = ({ row, handleUpdate }: { row: any, handleUpdate: (checked: boolean, row: any) => void }) => {
    const [status, setStatus] = useState<0 | 1>(row.status);

    useEffect(() => {
        setStatus(row.status);
    }, [row.status]);

    const handleUpdateStatus = async (checked: boolean) => {
        const valueCheck = checked ? 1 : 0;
        await handleUpdate(checked, row);
        setStatus(valueCheck);
    }

    return (
        <div className="relative">
            <Switch className="z-0" checked={status === 1} onChange={handleUpdateStatus} />
        </div>
    );
};

export default SwitchStatus;
