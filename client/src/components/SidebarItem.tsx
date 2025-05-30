import type { ReactElement } from "react";

interface SidebarItemProps {
    text: string;
    icon: ReactElement;
}

export function SidebarItem({ text, icon }: SidebarItemProps) {
    return (
        <>
         <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            {icon}{text}
         </div>
        </>
    )
}