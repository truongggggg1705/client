import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { GameType } from '../../../../pages/admin/game/Game';
import { GameService } from '../../../../services/gameService';
import NotificationList from './components/NotificationList';
import DialogPayment from './components/DialogPayment';
import { UserService } from '../../../../services/userService';
import { toast } from 'react-toastify';
import Avatar from '../../../../components/Avatar';
const Navbar: React.FC = () => {
    const [games, setGames] = useState<GameType[]>([])
    const navigate = useNavigate()
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const res = await UserService.getUser();
            setUser(res.data.data)
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        getUser();
    }, [])



    useEffect(() => {
        getGameList();
    }, [])

    const getGameList = async () => {
        try {
            const res = await GameService.getGames();
            setGames(res.data.data)
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <nav className="navbar px-7 fixed top-0 right-0 left-0 z-50">
            <div className="navbar-brand">
                <Link to="/" className="logo">ConnectPlay</Link>
            </div>
            <ul className=" flex items-center gap-16 ">
                <li className='hover:text-[#f0564a] duration-300'>
                    <Link to="/">Home</Link>
                </li>
                <li className='relative cursor-pointer group hover:text-[#f0564a] duration-300'>
                    <div>
                        <p className='hover'>Games</p>
                        <div className='shadow-lg w-[200px] bg-white absolute z-50 rounded-lg hidden group-hover:block px-1 py-2'>
                            {
                                games.map((item, index) => {
                                    return <p onClick={() => navigate('/collection/' + item.id)} key={index} className='text-[#333] px-2 py-2 font-semibold hover:text-red-500'>{item.title}</p>
                                })
                            }
                        </div>
                    </div>
                </li>
                <li className='hover:text-[#f0564a] duration-300'>
                    <Link to="/Policy">Policy</Link>
                </li>
                {
                    (localStorage.getItem("isPlayer") === 'false' || !localStorage.getItem("isPlayer")) && (
                        <li className='hover:text-[#f0564a] duration-300'>
                            <Link to="/sign-up-player">Sign up as a player</Link>
                        </li>
                    )
                }
                {
                    localStorage.getItem("isPlayer") === "true" &&
                    <li className='hover:text-[#f0564a] duration-300'>
                        <Link to="/rental-request-list">Rental request list</Link>
                    </li>
                }
            </ul>
            <div className="flex items-center gap-7">
                <button ><NotificationList /></button>
                <button ><DialogPayment /></button>
                {
                    user ?
                        <div className='-mt-[2px]'>
                            <Avatar user={user} />
                        </div>
                        :
                        <Link to="/login">
                            <button className='shadow-lg bg-white rounded-full w-[100px] py-2 text-[#333] font-bold'>
                                Login
                            </button>
                        </Link>
                }
            </div>
        </nav>
    );
};

export default Navbar;
