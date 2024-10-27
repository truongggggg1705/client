import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ errorMessage, ...props }, ref: React.Ref<HTMLInputElement>) => (
    <div className="w-full">
        <input
            ref={ref}
            className={`w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500`}
            {...props}
        />
        {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}
    </div>
));


export default Input;
