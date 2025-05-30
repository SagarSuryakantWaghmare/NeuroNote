import { useState, useEffect } from "react";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { HamburgerIcon } from "../icons/HamburgerIcon";
import { CrossIcon } from "../icons/CrossIcon";

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
        <>
            {/* Mobile menu button */}
            <div className="md:hidden fixed top-4 left-4 z-30">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-md bg-white shadow-md"
                >
                    {isOpen ? <CrossIcon /> : <HamburgerIcon />}
                </button>
            </div>
            
            {/* Backdrop for mobile */}
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setIsOpen(false)}
                />
            )}
            
            {/* Sidebar */}
            <div className={`h-screen bg-white border-r shadow-sm fixed left-0 top-0 z-20 transition-all duration-300 ${
                isOpen ? "w-72" : "w-0 -translate-x-full md:translate-x-0 md:w-16"
            }`}>
                <div className={`p-4 ${!isOpen && "md:px-2"}`}>
                    <div className={`flex text-2xl font-bold mb-6 pl-2 ${!isOpen && "md:hidden"}`}>NeuroNote</div>
                    <div className="space-y-1">
                        <SidebarItem text="Twitter" icon={<TwitterIcon />} collapsed={!isOpen} />
                        <SidebarItem text="YouTube" icon={<YoutubeIcon />} collapsed={!isOpen} />
                    </div>
                </div>
            </div>
        </>
    );
}