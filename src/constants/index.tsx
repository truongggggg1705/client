import { Joystick, Swords, Users } from "lucide-react";

export const MENU_ADMIN = [
    {
        label: 'Players',
        link: '/players',
        icon: Joystick
    },
    {
        label: 'Users',
        link: '/users',
        icon: Users
    },
    {
        label: 'Games',
        link: '/games',
        icon: Swords
    }
];