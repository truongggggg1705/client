import { useEffect, useState } from "react";
import { UserService } from "../../../services/userService";
import AvatarUploadField from "../../../components/AvatarUploadField";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputNumber, Select } from "antd";
import * as yup from 'yup';
import ImagesUploadField from "../../../components/ImagesUploadField";
import { Send } from "lucide-react";
import { GameType } from "../../admin/game/Game";
import { PlayerService } from "../../../services/playerService";
import { GameService } from "../../../services/gameService";
import { toast } from "react-toastify";
import WithdrawMoney from "./components/WithdrawMoney";

const { Option } = Select;

// Schema validation với Yup
type FormData = {
    avatar: File;
    name: string;
    email: string;
    password: string;
    description?: string;
    games: number[];
    images?: File[] | null;
    gender: 'male' | 'female';
    price: number;
};

const Profile = () => {
    const [user, setUser] = useState<any>(null);
    const [player, setPlayer] = useState<any>(null);
    const [image, setImage] = useState<File>();
    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState<GameType[]>([]);
    const [selectedGames, setSelectedGames] = useState<number[]>([]);
    const [price, setPrice] = useState<number>(0);
    const [status, setStatus] = useState<number | null>(null);
    const [description, setDescription] = useState<string>('');

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: player ? yup.string() : yup.string().email('Invalid email format').required('Email is required'),
        description: yup.string(),
        games: yup.array().of(yup.number().required('Game ID is required')).min(1, 'At least one game is required').required('Games are required'),
        price: player ? yup.number() : yup.number().min(0, 'Price must be a positive number').required('Price is required'),
    });

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema as any),
    });

    const getGameList = async () => {
        try {
            const res = await GameService.getGames();
            setGames(res.data.data)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        getGameList();
    }, [])

    // Lấy thông tin người dùng
    const getUser = async () => {
        try {
            let res: any;
            if (localStorage.getItem('accessToken')) {
                res = await UserService.getUser();
                const players = await PlayerService.getPlayers();
                const user = res.data.data;
                const checkPlayer = players.data.data.find((item: any) => item.userId === user.id);
                setPlayer(checkPlayer);
                // Set giá trị ban đầu cho form dựa vào player
                if (checkPlayer) {
                    setValue('name', checkPlayer.name);
                    setValue('email', checkPlayer.email);
                    setValue('description', checkPlayer.description || '');
                    setValue('games', checkPlayer.Games.map((item: any) => item.id) || []);
                    setSelectedGames(checkPlayer.Games.map((item: any) => item.id) || []);
                    setPrice(checkPlayer.price || 0);
                    setStatus(checkPlayer.status)
                }
                setUser(res.data.data);
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);


    useEffect(() => {
        setValue("price", price);
    }, [price, setValue])

    // Thay đổi game được chọn
    const handleGamesChange = (value: number[]) => {
        setSelectedGames(value);
    };


    useEffect(() => {
        setValue("games", selectedGames)
    }, [selectedGames, setValue])

    // Xử lý nút hủy
    // const handleClose = () => {
    //     if (player) {
    //         setValue('name', player.name);
    //         setValue('email', player.email);
    //         setValue('description', player.description || '');
    //         setValue('games', player.Games || []);
    //         setSelectedGames(player.Games.map((item: any) => item.id) || []);
    //         setPrice(player.price || 0);
    //     }
    // };

    // Xử lý submit form
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setLoading(true);
        try {
            const payload = { ...data, avatar: image ? image : undefined, images: images ? images : undefined, status: status ? status : undefined }
            await PlayerService.updatePlayer(player.id, payload);
            toast.success("Updated player successfully")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border shadow-lg max-w-[1200px] min-h-screen mx-auto my-[20px] rounded-lg">
            <div className="p-4">
                {localStorage.getItem("isPlayer") === "false" && (
                    <div className="profile-container py-3 px-6">
                        <h1 className="text-3xl font-bold mb-4 text-center uppercase tracking-widest">Profile</h1>
                        <div className="flex flex-col gap-10 text-xl py-3">
                            <p><strong>Name:</strong> {user?.fullName}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>Price:</strong> {new Intl.NumberFormat('vi-VN').format(user?.price)} VNĐ</p>
                        </div>
                    </div>
                )}
                {localStorage.getItem("isPlayer") === "true" && (
                    <div className="profile-container py-3 px-6">
                        <h1 className="text-3xl font-bold mb-4 text-center uppercase tracking-widest">Profile</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid grid-cols-3 gap-4 py-4'>
                                <div className='col-span-3'>
                                    <AvatarUploadField setImage={setImage} image={image ? image : player?.avatar} className="mx-auto w-52 h-52" />
                                    {errors.avatar && <p className='text-red-600'>{errors.avatar.message}</p>}
                                </div>
                                <div className='col-span-3 sm:col-span-1'>
                                    <Label className='text-base font-semibold' required>Name</Label>
                                    <Input
                                        className='border rounded px-3 py-1 w-full'
                                        type='text'
                                        {...register('name')}
                                        defaultValue={player?.name}
                                        errorMessage={errors.name?.message}
                                    />
                                </div>
                                <div className='col-span-3 sm:col-span-1'>
                                    <Label className='text-base font-semibold' required>Email</Label>
                                    <Input
                                        className='border rounded px-3 py-1 w-full'
                                        type='text'
                                        {...register('email')}
                                        defaultValue={player?.email}
                                        disabled
                                        errorMessage={errors.email?.message}
                                    />
                                </div>
                                <div className='col-span-3 sm:col-span-1'>
                                    <Label className='text-base font-semibold' required>Games</Label>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Select games"
                                        value={selectedGames}
                                        onChange={handleGamesChange}
                                    >
                                        {games.map((game) => (
                                            <Option key={game.id} value={game.id}>
                                                {game.title}
                                            </Option>
                                        ))}
                                    </Select>
                                    {errors.games && <p className='text-red-600'>{errors.games.message}</p>}
                                </div>
                                <div className='col-span-3 sm:col-span-1'>
                                    <Label className='text-base font-semibold' required>Price <p className="text-red-600"> {new Intl.NumberFormat('vi-VN').format(price)} VNĐ/h</p></Label>
                                    <InputNumber
                                        defaultValue={0}
                                        value={price}
                                        type="number"
                                        addonAfter="VNĐ"
                                        onChange={(value) => setPrice(value !== null ? value : 0)}
                                        className="w-full"
                                    />
                                    {errors.price && <p className='text-red-600'>{errors.price.message}</p>}

                                </div>
                                <div className='col-span-3 sm:col-span-1'>
                                    <Label className='text-base font-semibold' required>Trạng thái</Label>
                                    <Select
                                        style={{ width: '100%' }}
                                        value={status !== null ? status.toString() : '2'}
                                        onChange={(value) => setStatus(value as any)}
                                    >
                                        <Option value="1">Đã sẵn sàng</Option>
                                        <Option value="2">Chưa sẵn sàng</Option>
                                        <Option value="3">Đang bận</Option>
                                    </Select>

                                </div>
                                <div className='col-span-3 sm:col-span-1'>
                                    <Label className='text-base font-semibold' required>Số tiền trong túi</Label>
                                    <div className="flex items-center justify-between">
                                        <p>{new Intl.NumberFormat('vi-VN').format(user?.price)} VNĐ</p>
                                        <div>
                                            <WithdrawMoney user={user} getUser={getUser} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-3'>
                                    <Label className='text-base font-semibold' required>Images</Label>
                                    <ImagesUploadField setImages={setImages} images={images ? images : player?.images} />
                                    {errors.images && <p className='text-red-600'>{errors.images.message}</p>}
                                </div>
                                <div className='col-span-3'>
                                    <Label className='text-base font-semibold'>Description</Label>
                                    <textarea
                                        className="border rounded px-3 py-1 h-[400px] w-full"
                                        {...register('description')}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center gap-3'>
                                <button
                                    type="submit"
                                    className='border py-2 px-4 rounded-lg bg-blue-600 text-white flex items-center gap-2'
                                    disabled={loading}
                                >
                                    <Send size={20} />
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
