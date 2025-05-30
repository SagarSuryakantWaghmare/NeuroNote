import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
}

const variantClasses = {
  "primary": 'bg-purple-600 hover:bg-purple-700 text-white',
  "secondary": 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300',
}

const defaultStyles = "px-4 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm";

export function Button({variant, text, startIcon, onClick}: ButtonProps) {
   return (
     <button 
       onClick={onClick} 
       className={`${variantClasses[variant]} ${defaultStyles}`}
     >
       <div className="flex items-center gap-2">
         {startIcon && startIcon}
         {text}
       </div>
     </button>
   );
}