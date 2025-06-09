import { useState, useEffect } from "react";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { HamburgerIcon } from "../icons/HamburgerIcon";
import { CrossIcon } from "../icons/CrossIcon";
import { NeuroIcon } from "../icons/NeuroIcon";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Check if we're on mobile screen size
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return (
        <>            {/* Mobile menu button in top-right corner */}
            <div className="md:hidden fixed top-4 right-4 z-30">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg bg-white shadow-lg border border-sky-100 hover:bg-sky-50 transition-colors duration-200"
                >
                    {isOpen ? <CrossIcon /> : <HamburgerIcon />}
                </button>
            </div>
              {/* Mobile horizontal top navigation bar */}
            {isMobile && (
                <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-white to-sky-50 shadow-lg border-b border-sky-100 z-20 p-2">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center">
                            <div className="text-sky-600">
                                <NeuroIcon />
                            </div>
                            <div className="text-lg font-bold pl-3 bg-gradient-to-r from-sky-700 to-cyan-700 bg-clip-text text-transparent">NeuroNote</div>
                        </div>
                        <div className="flex gap-6 py-2 px-3 mr-10">
                            <SidebarItem text="Home" icon={<NeuroIcon />} collapsed={true} horizontal={true} to="/" />
                            <SidebarItem text="Twitter" icon={<TwitterIcon />} collapsed={true} horizontal={true} />
                            <SidebarItem text="YouTube" icon={<YoutubeIcon />} collapsed={true} horizontal={true} />
                        </div>
                    </div>
                </div>
            )}
            
            {/* Backdrop for mobile */}
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setIsOpen(false)}
                />
            )}
              {/* Desktop sidebar or mobile dropdown menu */}
            <div className={`bg-gradient-to-b from-white via-sky-50/50 to-cyan-50/50 shadow-lg border-r border-sky-100 fixed z-25 transition-all duration-300
                ${isMobile 
                    ? `top-14 left-0 right-0 w-full overflow-hidden ${isOpen ? "max-h-screen" : "max-h-0"}`
                    : `h-screen left-0 top-0 ${isOpen ? "w-72" : "w-0 -translate-x-full md:translate-x-0 md:w-16"}`
                }
            `}>
                {/* Content layout differs for mobile vs desktop */}
                {isMobile ? (
                    <div className="p-4 pt-14">                        {/* Mobile sidebar - vertical layout when open */}
                        <div className="flex items-center mb-6">
                            <div className="flex-shrink-0 text-sky-600">
                                <NeuroIcon />
                            </div>
                            <div className="text-xl font-bold pl-3 bg-gradient-to-r from-sky-700 to-cyan-700 bg-clip-text text-transparent">NeuroNote</div>
                        </div>
                        
                        {/* Navigation items */}
                        <div className="space-y-3">
                            <SidebarItem text="Twitter" icon={<TwitterIcon />} collapsed={false} />
                            <SidebarItem text="YouTube" icon={<YoutubeIcon />} collapsed={false} />
                        </div>
                    </div>
                ) : (
                    /* Desktop sidebar */
                    <div className={`p-4 ${!isOpen && "md:px-2 md:py-6"}`}>                        {/* Logo and title */}
                        <div className={`flex items-center ${!isOpen ? "md:justify-center" : "mb-8"}`}>
                            <div className="flex-shrink-0 text-sky-600">
                                <NeuroIcon />
                            </div>
                            {isOpen && (
                                <div className="text-xl font-bold pl-3 bg-gradient-to-r from-sky-700 to-cyan-700 bg-clip-text text-transparent">NeuroNote</div>
                            )}
                        </div>
                        
                        {/* Navigation items with proper spacing */}
                        <div className="space-y-2 mt-6">
                            <SidebarItem text="Twitter" icon={<TwitterIcon />} collapsed={!isOpen} />
                            <SidebarItem text="YouTube" icon={<YoutubeIcon />} collapsed={!isOpen} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}