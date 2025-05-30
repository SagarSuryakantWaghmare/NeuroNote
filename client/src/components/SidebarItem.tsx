import type { ReactElement } from "react";

interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    collapsed?: boolean;
    horizontal?: boolean;
}

export function SidebarItem({ text, icon, collapsed = false, horizontal = false }: SidebarItemProps) {
    return (
        <>
            <div 
                className={`
                    flex items-center ${collapsed ? 'justify-center' : 'justify-start'} 
                    ${horizontal ? 'p-1.5 rounded-full' : 'p-2.5 rounded-md'} 
                    cursor-pointer transition-all
                    hover:bg-gray-100 active:bg-gray-200
                `}
                title={collapsed ? text : undefined}
            >
                <div className="flex-shrink-0">
                    {icon}
                </div>
                {!collapsed && (
                    <span className="ml-3 font-medium text-gray-700">{text}</span>
                )}
            </div>
        </>
    )
}