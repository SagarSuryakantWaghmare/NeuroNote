import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    collapsed?: boolean;
    horizontal?: boolean;
    to?: string;
}

export function SidebarItem({ text, icon, collapsed = false, horizontal = false, to }: SidebarItemProps) {
    const navigate = useNavigate();
    return (
        <>            <div 
                className={`
                    flex items-center ${collapsed ? 'justify-center' : 'justify-start'} 
                    ${horizontal ? 'p-2 rounded-xl' : 'p-3 rounded-xl'} 
                    cursor-pointer transition-all duration-200 group
                    hover:bg-gradient-to-r hover:from-sky-50 hover:to-cyan-50 
                    active:bg-gradient-to-r active:from-sky-100 active:to-cyan-100
                    border border-transparent hover:border-sky-100
                `}
                title={collapsed ? text : undefined}
                onClick={() => to && navigate(to)}
            >
                <div className="flex-shrink-0 text-sky-600 group-hover:text-sky-700 transition-colors duration-200">
                    {icon}
                </div>
                {!collapsed && (
                    <span className="ml-3 font-medium text-slate-700 group-hover:text-slate-800 transition-colors duration-200">{text}</span>
                )}
            </div>
        </>
    )
}