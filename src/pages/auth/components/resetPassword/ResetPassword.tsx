import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { AuthService } from "../../../../services/authService";

const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { slug } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            if (!slug) {
                toast.error("Link not found")
                return
            }

            if (confirmPassword === '' || password === '') {
                toast.warning(`Please enter a password `);
                return;
            }
            if (confirmPassword !== password) {
                toast.warning(`Password does not match password confirmation`);
            }
            await AuthService.resetPassword(slug, password);
            toast.success("Password reset successfully")
            navigate('/login');
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div className="flex flex-col justify-center min-h-screen">
            <div className="mx-auto  w-[800px] bg-white shadow-lg border h-[380px] rounded-lg">
                <h1 className="text-center font-bold tracking-wider text-2xl py-3">Reset Password</h1>
                <div className="w-[50%] mt-4 mx-auto">
                    <div className="w-full mx-auto">
                        <p className="text-center text-base font-semibold my-2">Password</p>
                        <input type="password" className="w-full text-center border outline-none h-[40px]" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="w-full mx-auto">
                        <p className="text-center text-base font-semibold my-2">Confirm Password</p>
                        <input type="password" className="w-full text-center border outline-none h-[40px]" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="mt-10 justify-center flex flex-col items-center ">
                        <p className="text-sm pb-2"><b>Lưu ý:</b> Khi nộp hãy kiểm tra hộp thư đến trong email của bạn</p>
                        <button
                            type="button"
                            className='flex items-center gap-2 text-base font-semibold border bg-white hover:opacity-80 text-[#333] py-1 px-4 rounded-md'
                            onClick={handleSubmit}
                        >
                            <div className='flex items-center justify-center gap-1'>
                                <Send size={18} />
                                <span>Submit</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ResetPassword;