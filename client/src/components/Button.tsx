import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullwidth?:boolean;
  loading?:boolean;
}

const variantClasses = {
  "primary": 'bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
  "secondary": 'bg-white hover:bg-sky-50 text-sky-700 border border-sky-200 hover:border-sky-300 shadow-lg hover:shadow-xl',
}

const defaultStyles = "px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium text-xs md:text-sm flex items-center justify-center gap-1 md:gap-2 transition-all duration-200 whitespace-nowrap";

export function Button({variant, text, startIcon, onClick,fullwidth,loading}: ButtonProps) {
   return (
     <button 
       onClick={onClick} 
       className={`${variantClasses[variant]} ${defaultStyles} ${fullwidth?" w-full flex ":""}  ${loading?"opacity-45":""}`} disabled={loading}
     >
       <div className="flex items-center gap-1 md:gap-2">
         {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
         <span className="truncate">{text}</span>
       </div>
     </button>
   );
}