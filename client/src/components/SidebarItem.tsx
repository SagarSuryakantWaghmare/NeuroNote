import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    collapsed?: boolean;
    horizontal?: boolean;
    to?: string;
    active?: boolean;
    onClick?: () => void;
}

export function SidebarItem({ text, icon, collapsed = false, horizontal = false, to, active = false, onClick }: SidebarItemProps) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (to) {
            navigate(to);
        }
    };
    
    return (
        <>            <div 
                className={`
                    flex items-center ${collapsed ? 'justify-center' : 'justify-start'} 
                    ${horizontal ? 'p-2 rounded-xl' : 'p-3 rounded-xl'} 
                    cursor-pointer transition-all duration-200 group
                    ${active 
                        ? 'bg-gradient-to-r from-sky-100 to-cyan-100 border-sky-200 shadow-md' 
                        : 'hover:bg-gradient-to-r hover:from-sky-50 hover:to-cyan-50 border-transparent'
                    }
                    active:bg-gradient-to-r active:from-sky-100 active:to-cyan-100
                    border hover:border-sky-100
                `}
                title={collapsed ? text : undefined}
                onClick={handleClick}
            >
                <div className={`flex-shrink-0 transition-colors duration-200 ${
                    active ? 'text-sky-700' : 'text-sky-600 group-hover:text-sky-700'
                }`}>
                    {icon}
                </div>
                {!collapsed && (
                    <span className={`ml-3 font-medium transition-colors duration-200 ${
                        active ? 'text-slate-800 font-semibold' : 'text-slate-700 group-hover:text-slate-800'
                    }`}>{text}</span>
                )}
            </div>
        </>
    )
}