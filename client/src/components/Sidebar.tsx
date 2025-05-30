import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    return(
        <>
        <div className="h-screen w-72 bg-white border-r fixed left-0 top-0 shadow-sm pl-4">
              <div className="p-4">
                <div className="flex text-2xl font-bold mb-6 pl-2">NeuroNote</div>
                <div className="space-y-1">
                   <SidebarItem text="Twitter" icon={<TwitterIcon/>}/>
                   <SidebarItem text="YouTube" icon={<YoutubeIcon/>}/>
                </div>
              </div>
        </div>
        </>
    )
}