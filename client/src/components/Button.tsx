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
  "primary": 'bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm',
  "secondary": 'bg-white/90 backdrop-blur-xl hover:bg-white text-sky-700 border border-sky-200/50 hover:border-sky-300/60 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]',
}

const defaultStyles = "px-4 py-3 md:px-6 md:py-3 rounded-2xl font-semibold text-sm md:text-base flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 whitespace-nowrap relative overflow-hidden";

export function Button({variant, text, startIcon, onClick,fullwidth,loading}: ButtonProps) {
   return (
     <button 
       onClick={onClick} 
       className={`${variantClasses[variant]} ${defaultStyles} ${fullwidth?" w-full flex ":""}  ${loading?"opacity-50 cursor-not-allowed":""}`} 
       disabled={loading}
     >
       {/* Subtle animated background effect */}
       <div className={`absolute inset-0 ${variant === 'primary' ? 'bg-gradient-to-r from-sky-400/20 to-cyan-400/20' : 'bg-gradient-to-r from-sky-50/80 to-cyan-50/80'} transform -skew-x-12 transition-transform duration-300 hover:translate-x-full`}></div>
       
       <div className="flex items-center gap-2 md:gap-3 relative z-10">
         {startIcon && (
           <span className={`flex-shrink-0 transition-transform duration-300 ${loading ? '' : 'group-hover:scale-110'}`}>
             {startIcon}
           </span>
         )}
         <span className="truncate">{text}</span>
         {loading && (
           <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
         )}
       </div>
     </button>
   );
}