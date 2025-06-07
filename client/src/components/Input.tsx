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
            <div className="w-full">
                <input 
                    placeholder={placeholder} 
                    type={type} 
                    className="w-full px-4 py-3 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 bg-sky-50/30 hover:bg-sky-50/50 focus:bg-white placeholder-slate-400" 
                    onChange={onChange}
                    value={value}
                    ref={ref}
                />
            </div>
        )
    }
);