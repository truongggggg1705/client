import { Avatar as AvatarD } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";


const AvatarDialog = ({
    setShow,
}: {
    setShow: (value: boolean) => void;
}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        AuthService.logout();
        window.location.reload();
        navigate('/');
        setShow(false);
    }

    const handleProfile = () => {
        navigate('/profile');
        setShow(false);
    }

    return (
        <div className="bg-white w-[100px] h-[80px] shadow-lg rounded-lg *:text-[#333] py-2 px-3">
            <div className="flex flex-col gap-3 cursor-pointer font-semibold">
                <div onClick={handleProfile}>Profile</div >
                <div onClick={handleLogout}>Logout</div>
            </div>
        </div>
    )
}


const isColorDark = (color: string) => {
    const rgb = parseInt(color.slice(1), 16); // Convert hex to RGB
    const r = (rgb >> 16) & 0xff; // Red
    const g = (rgb >>  8) & 0xff; // Green
    const b = (rgb >>  0) & 0xff; // Blue

    // Calculate luminance (brightness)
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return brightness < 128; // If brightness is less than 128, it's dark
};

const Avatar = ({ user }: { user: { fullName: string } }) => {
    const [show, setShow] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState<string>('');
    const [textColor, setTextColor] = useState<string>('#f56a00'); // Default text color
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Function to generate a random color
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        // Generate a random color once when the component mounts
        const randomColor = getRandomColor();
        setBackgroundColor(randomColor);

        // Set text color based on background color brightness
        setTextColor(isColorDark(randomColor) ? '#ffffff' : '#000000');

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShow(false);
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Get the first letter of the user's full name
    const firstLetter = user.fullName ? user.fullName.charAt(0).toUpperCase() : '';

    return (
        <div className="relative">
            <div onClick={() => setShow(!show)}>
                <AvatarD
                    style={{
                        backgroundColor: backgroundColor,
                        color: textColor
                    }}
                    className="shadow-lg"
                >
                    {firstLetter}
                </AvatarD>
            </div>
            {
                show &&
                <div
                    ref={dropdownRef}
                    className="absolute top-full mt-2 right-0">
                    <AvatarDialog
                        setShow={setShow}
                    />
                </div>
            }
        </div>
    );
}

export default Avatar;