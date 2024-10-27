import { LucideProps } from "lucide-react";
import { MENU_ADMIN } from "../../../constants"
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type MenuItem = {
    label: string;
    link: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}


const MenuItem = ({ menu, active }: { menu: MenuItem, active: boolean }) => {
    return <Link to={'/admin' + menu.link} className={
        `flex items-center duration-300 gap-2 py-2 text-base text-slate-700 rounded-lg px-3 ${active ? 'bg-slate-100 ' : ''}`
    }>
        <menu.icon size={25} />
        <span className="font-semibold">{menu.label}</span>
    </Link>
}



const MenuList = () => {
    const { pathname } = useLocation()
    const [selected, setSelected] = useState<string>('');

    useEffect(() => {
        setSelected(pathname);
    }, [pathname])


    return <div className="flex-1 py-2 flex flex-col gap-5">
        {
            MENU_ADMIN.map((menu, index) => {
            return <MenuItem key={index} menu={menu} active={selected === `/admin${menu.link}`} />
            })
        }
    </div>
}

export default MenuList;