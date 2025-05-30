import type { ReactElement } from "react";

interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    collapsed?: boolean;
}

export function SidebarItem({ text, icon, collapsed = false }: SidebarItemProps) {
    return (
        <>
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'} p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-all`}>
                <div className={collapsed ? "" : "mr-2"}>
                    {icon}
                </div>
                {!collapsed && <span>{text}</span>}
            </div>
        </>
    )
}