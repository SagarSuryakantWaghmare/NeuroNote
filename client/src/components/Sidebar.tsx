import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    return(
        <>
        <div className="h-screen w-72 bg-white border-r fixed left-0 top-0 shadow-sm">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-6 pl-2">NeuroNote</h2>
                <div className="space-y-1">
                   <SidebarItem text="Twitter" icon={<TwitterIcon/>}/>
                   <SidebarItem text="YouTube" icon={<YoutubeIcon/>}/>
                </div>
              </div>
        </div>
        </>
    )
}