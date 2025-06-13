import { useState, useEffect } from "react";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { LinkedInIcon } from "../icons/LinkedInIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { SidebarItem } from "./SidebarItem";
import { HamburgerIcon } from "../icons/HamburgerIcon";
import { CrossIcon } from "../icons/CrossIcon";
import { NeuroIcon } from "../icons/NeuroIcon";

interface SidebarProps {
    activeFilter?: "all" | "youtube" | "twitter" | "linkedin" | "instagram";
    onFilterChange?: (filter: "all" | "youtube" | "twitter" | "linkedin" | "instagram") => void;
}

export function Sidebar({ activeFilter = "all", onFilterChange }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
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
    }, []);    // Handle filter change and close mobile menu
    const handleFilterChange = (filter: "all" | "youtube" | "twitter" | "linkedin" | "instagram") => {
        onFilterChange?.(filter);
        if (isMobile) {
            setIsOpen(false);
        }
    };    return (
        <>            {/* Mobile hamburger button - positioned top right with improved styling */}
            {isMobile && (
                <div className="fixed top-4 right-4 z-[60]">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative p-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg border border-sky-100/50 hover:bg-white transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                        <div className="relative w-6 h-6">
                            <div className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'}`}>
                                <HamburgerIcon />
                            </div>
                            <div className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                                <CrossIcon />
                            </div>
                        </div>
                    </button>
                </div>
            )}            {/* Mobile backdrop with smooth fade */}
            {isMobile && isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}            {/* Enhanced Sidebar with improved animations */}
            <div className={`bg-white/98 backdrop-blur-xl shadow-2xl border-r border-sky-100/50 fixed z-[50] transition-all duration-500 ease-out
                ${isMobile 
                    ? `top-0 left-0 h-full ${isOpen ? "w-80 translate-x-0" : "w-80 -translate-x-full"}`
                    : `h-screen left-0 top-0 ${isOpen ? "w-72" : "w-16"}`
                }
            `}>                {/* Sidebar content with better spacing */}
                <div className={`p-6 h-full ${isMobile ? 'pt-20 bg-gradient-to-b from-white via-sky-50/30 to-cyan-50/30' : ''}`}>
                    {/* Logo section with improved typography */}
                    <div className={`flex items-center ${!isOpen && !isMobile ? "justify-center mb-8" : "mb-8"}`}>
                        <div className="flex-shrink-0 text-sky-600 text-2xl">
                            <NeuroIcon />
                        </div>
                        {(isOpen || isMobile) && (
                            <div className="text-2xl font-bold pl-4 bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                                NeuroNote
                            </div>
                        )}
                    </div>
                    
                    {/* Navigation section with better labeling */}
                    {(isOpen || isMobile) && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
                                Content Filter
                            </h3>
                        </div>
                    )}
                      {/* Navigation items with enhanced styling */}
                    <div className="space-y-3">
                        <SidebarItem 
                            text="All Content" 
                            icon={<NeuroIcon />} 
                            collapsed={!isOpen && !isMobile}
                            active={activeFilter === "all"}
                            onClick={() => handleFilterChange("all")}
                        />
                        <SidebarItem 
                            text="Twitter Posts" 
                            icon={<TwitterIcon />} 
                            collapsed={!isOpen && !isMobile}
                            active={activeFilter === "twitter"}
                            onClick={() => handleFilterChange("twitter")}
                        />
                        <SidebarItem 
                            text="YouTube Videos" 
                            icon={<YoutubeIcon />} 
                            collapsed={!isOpen && !isMobile}
                            active={activeFilter === "youtube"}
                            onClick={() => handleFilterChange("youtube")}
                        />
                        <SidebarItem 
                            text="LinkedIn Posts" 
                            icon={<LinkedInIcon />} 
                            collapsed={!isOpen && !isMobile}
                            active={activeFilter === "linkedin"}
                            onClick={() => handleFilterChange("linkedin")}
                        />
                        <SidebarItem 
                            text="Instagram Posts" 
                            icon={<InstagramIcon />} 
                            collapsed={!isOpen && !isMobile}
                            active={activeFilter === "instagram"}
                            onClick={() => handleFilterChange("instagram")}
                        />
                    </div>

                    {/* Desktop toggle button */}
                    {!isMobile && (
                        <div className="absolute bottom-6 left-0 right-0 px-6">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="w-full p-3 rounded-xl bg-gradient-to-r from-sky-50 to-cyan-50 hover:from-sky-100 hover:to-cyan-100 border border-sky-100 transition-all duration-300 group"
                                title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                            >
                                <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
                                    {isOpen && (
                                        <span className="text-sm font-medium text-slate-700">
                                            Collapse
                                        </span>
                                    )}
                                    <div className={`text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}