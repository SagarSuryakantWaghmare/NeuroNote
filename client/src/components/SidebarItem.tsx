import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    collapsed?: boolean;
    to?: string;
    active?: boolean;
    onClick?: () => void;
}

export function SidebarItem({ text, icon, collapsed = false, to, active = false, onClick }: SidebarItemProps) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (to) {
            navigate(to);
        }
    };
    
    return (
        <div 
            className={`
                relative flex items-center ${collapsed ? 'justify-center p-3' : 'justify-start p-4'} 
                cursor-pointer transition-all duration-300 group rounded-2xl
                ${active 
                    ? 'bg-gradient-to-r from-sky-100 to-cyan-100 border border-sky-200/50 shadow-lg transform scale-[1.02]' 
                    : 'hover:bg-gradient-to-r hover:from-sky-50/80 hover:to-cyan-50/80 border border-transparent hover:border-sky-100/50 hover:shadow-md hover:transform hover:scale-[1.01]'
                }
                active:transform active:scale-[0.98] backdrop-blur-sm
            `}
            title={collapsed ? text : undefined}
            onClick={handleClick}
        >
            {/* Active indicator line */}
            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-sky-500 to-cyan-500 rounded-r-full"></div>
            )}
            
            {/* Icon with enhanced styling */}
            <div className={`flex-shrink-0 transition-all duration-300 ${collapsed ? 'text-xl' : 'text-lg'} ${
                active ? 'text-sky-700 transform scale-110' : 'text-sky-600 group-hover:text-sky-700 group-hover:transform group-hover:scale-105'
            }`}>
                {icon}
            </div>
            
            {/* Text with smooth animations */}
            {!collapsed && (
                <span className={`ml-4 font-medium transition-all duration-300 ${
                    active ? 'text-slate-800 font-semibold' : 'text-slate-700 group-hover:text-slate-800'
                } whitespace-nowrap`}>
                    {text}
                </span>
            )}
            
            {/* Subtle glow effect for active state */}
            {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-cyan-400/10 rounded-2xl blur-sm"></div>
            )}
        </div>
    );
}