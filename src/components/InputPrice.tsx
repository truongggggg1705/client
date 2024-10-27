import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
}

const InputPrice = React.forwardRef<HTMLInputElement, InputProps>(({ errorMessage, ...props }, ref: React.Ref<HTMLInputElement>) => (
    <div className="w-full">
        <div className="relative">
            <input
                ref={ref}
                className={`w-full h-[32px] border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500`}
                {...props}
                type="number"
            />
            <div className="absolute top-1 right-2 ">
                <p className="flex items-center justify-center">VNĐ</p>
            </div>
        </div>
        {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}
    </div>
));


export default InputPrice;