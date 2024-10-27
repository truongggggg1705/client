import { toast } from "react-toastify";
import { PlayerService } from "../../../services/playerService";
import { SubmitHandler, useForm } from "react-hook-form";
import { GameService } from "../../../services/gameService";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import { InputNumber, Select } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { GameType } from "../../admin/game/Game";
import AvatarUploadField from "../../../components/AvatarUploadField";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import { Send } from "lucide-react";
import ImagesUploadField from "../../../components/ImagesUploadField";
import { UserService } from "../../../services/userService";

const { Option } = Select;


type FormData = {
    avatar: File;
    name: string;
    email: string;
    password: string;
    description?: string;
    games: number[];
    images?: File[];
    price: number;
};


const FormSignUpPlayer = () => {

    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState<GameType[]>([])
    const [selectedGames, setSelectedGames] = useState<number[]>([]);
    const [image, setImage] = useState<any>()
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<number>(0);
    const [user, setUser] = useState<any>();
    const validationSchema = yup.object().shape({
        avatar: yup
            .mixed<File>()
            .required('Avatar is required')
            .test('fileType', 'Unsupported File Format', (value) => {
                return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
            }),
        name: user
            ? yup.string()
            : yup.string().required('Name is required'),
        email: user
            ? yup.string()
            : yup.string().email('Invalid email format').required('Email is required'),
        password: user
            ? yup.string()
            : yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        description: yup.string(),
        games: yup.array()
            .of(yup.number().required('Game ID is required'))
            .min(1, 'At least one game is required')
            .required('Games are required'),
        images: yup.array()
            .of(
                yup
                    .mixed<File>()
                    .required('Image is required')
                    .test('fileType', 'Unsupported File Format', (value) => {
                        return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
                    })
            ),
        price: yup.number().min(0, 'Price must be a positive number').required('Price is required'),
    });
    const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema as any),
    });

    useEffect(() => {
        setValue('images', images);
    }, [images, setValue]);

    useEffect(() => {
        setValue('avatar', image);
    }, [image, setValue]);

    useEffect(() => {
        setValue('description', description);
    }, [description, setValue])

    useEffect(() => {
        getGameList();
    }, [])

    useEffect(() => {
        setValue("games", selectedGames)
    }, [selectedGames, setValue])


    useEffect(() => {
        setValue('price', price);
    }, [price, setValue]);


    const getUser = async () => {
        try {
            const res = await UserService.getUser();
            setUser(res.data.data)
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    }
    useEffect(() => {
        if (localStorage.getItem('accessToken')) getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem('accessToken')])



    const getGameList = async () => {
        try {
            const res = await GameService.getGames();
            setGames(res.data.data)
        } catch (error: any) {
            console.log(error)
        }
    }
    const handleGamesChange = (value: number[]) => {
        setSelectedGames(value);
    };



    const handleClose = () => {
        reset();
        setImages([]);
        setSelectedGames([]);
        setImage(null);
        setDescription('')
    };



    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            setLoading(true);
            let playerData;
            if (user && user.id) {
                playerData = { ...data, games: selectedGames, userId: user.id };
            } else {
                playerData = { ...data, games: selectedGames };
            }
            const res = await PlayerService.createPlayerUser(playerData);
            toast.success(res.data.msg);
            handleClose();
        } catch (error: any) {
            toast.error(error?.response?.data?.msg || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="max-w-[1000px] mx-auto py-7">
            <div>
                <h1 className="text-center font-bold text-3xl text-[#333]">Đăng ký làm player</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="border my-4 p-4 rounded-lg shadow-xl">
                <div className=' my-[20px] py-[15px] relative grid grid-cols-2 grid-rows-2 gap-4'>
                    <div className='w-full px-2 flex flex-col gap-2 row-span-2'>
                        <AvatarUploadField setImage={setImage} image={image} />
                        {errors.avatar && <p className='text-red-600'>{errors.avatar.message}</p>}
                    </div>
                    <div className='w-full px-2 flex flex-col gap-2'>
                        <Label className='text-base font-semibold' required>Name</Label>
                        {
                            user ? <Input
                                className='border h-[35px] rounded outline-none p-3 w-full'
                                type='text'
                                {...register('name')}
                                value={user.fullName}
                                disabled
                                errorMessage={errors.name?.message}
                            /> :
                                <Input
                                    className='border h-[35px] rounded outline-none p-3 w-full'
                                    type='text'
                                    {...register('name')}
                                    errorMessage={errors.name?.message}
                                />
                        }
                    </div>
                    <div className='w-full px-2 flex flex-col gap-2'>
                        <Label className='text-base font-semibold' required>Email</Label>
                        {
                            user ?
                                <Input
                                    className='border h-[35px] rounded outline-none p-3 w-full'
                                    type='text'
                                    {...register('email')}
                                    value={user?.email}
                                    disabled
                                    errorMessage={errors.email?.message}
                                />
                                :
                                <Input
                                    className='border h-[35px] rounded outline-none p-3 w-full'
                                    type='text'
                                    {...register('email')}
                                    errorMessage={errors.email?.message}
                                />
                        }
                    </div>
                    <div className='w-full px-2 flex flex-col gap-2'>
                        {
                            <>
                                <Label className='text-base font-semibold' required>Password</Label>
                                {
                                    user ?
                                        <Input
                                            className='border h-[35px] rounded outline-none p-3 w-full'
                                            type='password'
                                            {...register('password')}
                                            value={"***********"}
                                            disabled
                                            errorMessage={errors.password?.message}
                                        />
                                        :
                                        <Input
                                            className='border h-[35px] rounded outline-none p-3 w-full'
                                            type='password'
                                            {...register('password')}
                                            errorMessage={errors.password?.message}
                                        />
                                }
                            </>
                        }
                    </div>
                    <div className='w-full px-2 flex flex-col gap-2'>
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
                        {errors.games && <p className='text-red-600 -mt-2'>{errors.games.message}</p>}
                    </div>
                    <div className='w-full px-2 flex flex-col gap-2'>
                        <div className='flex items-center'>
                            <Label className='text-base font-semibold' required>Price</Label>
                            <p className='font-semibold pl-5'>({new Intl.NumberFormat('vi-VN').format(price)}VNĐ/h)</p>
                        </div>
                        <InputNumber
                            onChange={(value) => setPrice(value || 0)}
                            value={price}
                            type='number'
                            addonAfter="VNĐ"
                            defaultValue={0}
                        />
                        {errors.price && <p className='text-red-600 -mt-2'>{errors.price.message}</p>}
                    </div>
                    <div className='w-full px-2 flex flex-col gap-2 col-span-2'>
                        <Label className='text-base font-semibold' >Description</Label>
                        <textarea
                            className="border h-[200px] rounded outline-none p-3 w-full"
                            value={description}
                            onChange={(e: any) => setDescription(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    setDescription(description + '\n');
                                }
                            }}
                        />
                    </div>
                    <div className='w-full px-2 flex flex-col gap-2 mt-[20px]'>
                        <Label className='text-base font-semibold' required>Images</Label>
                        <ImagesUploadField setImages={setImages} images={images} />
                        {errors.images && <p className='text-red-600'>{errors.images.message}</p>}
                    </div>
                </div>
                <div className='mb-4 mt-8 flex items-center justify-center gap-3'>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${loading ? 'cursor-wait' : ''} flex items-center gap-2 text-base font-semibold border border-slate-600 bg-slate-600 hover:opacity-80 text-white py-1 px-4 rounded-md`}
                    >
                        <div className='flex items-center justify-center gap-1'>
                            <><Send size={18} /><span>{loading ? 'Submiting...' : 'Submit'}</span></>
                        </div>
                    </button>
                </div>
            </form>
            <div className="flex items-center gap-2">
                <p className="font-bold ">Lưu ý:</p>
                <p className="">Sau khi nộp form đăng ký sẽ chờ admin liên hệ và duyệt</p>
            </div>
        </div>
    )
}
export default FormSignUpPlayer;