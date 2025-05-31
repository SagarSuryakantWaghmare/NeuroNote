import { forwardRef } from 'react';

interface InputProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    value?: string;
    type?: 'text' | 'password' | 'email';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ onChange, placeholder, value, type = "text" }, ref) => {
        return(
            <div className="w-full mb-4">
                <input 
                    placeholder={placeholder} 
                    type={type} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    onChange={onChange}
                    value={value}
                    ref={ref}
                />
            </div>
        )
    }
);