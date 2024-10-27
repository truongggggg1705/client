import { Asterisk } from 'lucide-react';
import React, { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children?: React.ReactNode;
    required?: boolean;
    className?: string;
}

const Label: React.FC<LabelProps> = ({ children, className = '', required, ...props }) => {
    return (
        <label
            className={`flex items-center gap-1 ${className}`}
            {...props}>
            {children}
            {
                required && <span className='text-red-600'>
                    <Asterisk
                        size={13}
                    />
                </span>
            }
        </label >
    );
};

export default Label;
