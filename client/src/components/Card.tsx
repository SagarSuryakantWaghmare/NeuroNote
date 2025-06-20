import { ShareIcon } from "../icons/ShareIcon";
import { useEffect, useRef } from "react";

// Define Twitter's widget JS API
declare global {
    interface Window {
        twttr: {
            widgets: {
                load: (element?: HTMLElement) => Promise<void>;
            };
        };
        instgrm?: {
            Embeds: {
                process: () => void;
            };
        };
    }
}

interface CardProps {
    title: string; // Title of the card, e.g., video or tweet title
    link: string; // Link to the content (YouTube, Twitter, LinkedIn, or Instagram)
    type: "twitter" | "youtube" | "linkedin" | "instagram"; // Type of the content
}

// The Card component represents a styled card that can display YouTube videos, Twitter embeds, LinkedIn posts, or Instagram content based on the type prop.
export function Card({ title, link, type }: CardProps) {
    const tweetRef = useRef<HTMLDivElement>(null);
    const instagramRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load Twitter widgets script if not already loaded
        if (type === "twitter") {
            if (!document.getElementById('twitter-widget-script')) {
                const script = document.createElement('script');
                script.id = 'twitter-widget-script';
                script.src = 'https://platform.twitter.com/widgets.js';
                script.async = true;
                document.body.appendChild(script);

                script.onload = () => {
                    if (window.twttr && tweetRef.current) {
                        window.twttr.widgets.load(tweetRef.current);
                    }
                };
            } else if (window.twttr && tweetRef.current) {
                // If script already loaded, just load the widget
                window.twttr.widgets.load(tweetRef.current);
            }
        }

        // Load Instagram embed script if not already loaded
        if (type === "instagram") {
            if (!document.getElementById('instagram-embed-script')) {
                const script = document.createElement('script');
                script.id = 'instagram-embed-script';
                script.src = '//www.instagram.com/embed.js';
                script.async = true;
                document.body.appendChild(script);

                script.onload = () => {
                    if (window.instgrm && instagramRef.current) {
                        window.instgrm.Embeds.process();
                    }
                };
            } else if (window.instgrm && instagramRef.current) {
                // If script already loaded, just process the embed
                window.instgrm.Embeds.process();
            }
        }
    }, [link, type]);    return (
        <div className="w-full">
            {/* Card Container with dynamic height */}
            <div className="group relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl border border-sky-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] h-fit">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative p-4 md:p-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-4">
                        {/* Left Section: Title with Icon */}
                        <div className="flex items-center text-sm md:text-md max-w-[80%]">
                            <div className="text-sky-600 pr-2 md:pr-3 flex-shrink-0 group-hover:text-sky-700 transition-colors duration-300">
                                <ShareIcon />
                            </div>
                            <div className="font-semibold text-slate-800 line-clamp-2 group-hover:text-slate-900 transition-colors duration-300" title={title}>
                                {title}
                            </div>
                        </div>
                        
                        {/* Right Section: Links with Icons */}
                        <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                            <a
                                href={link}
                                target="_blank"
                                className="p-1.5 md:p-2 rounded-xl text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-all duration-300 group/icon"
                                title="Open original"
                            >
                                <div className="transform group-hover/icon:scale-110 transition-transform duration-300">
                                    <ShareIcon />
                                </div>
                            </a>
                            <button className="p-1.5 md:p-2 rounded-xl text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-all duration-300 group/icon">
                                <div className="transform group-hover/icon:scale-110 transition-transform duration-300">
                                    <ShareIcon />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Content Section with dynamic sizing */}
                    <div className="relative overflow-hidden rounded-2xl">
                        {/* Render YouTube embed if type is "youtube" */}
                        {type === "youtube" && (
                            <div className="relative overflow-hidden rounded-2xl shadow-inner">
                                <iframe
                                    className="w-full aspect-video rounded-2xl"
                                    src={`https://www.youtube.com/embed/${link.includes("watch?v=")
                                        ? link.split("watch?v=")[1].split("&")[0]
                                        : link.includes("youtu.be/")
                                            ? link.split("youtu.be/")[1].split("?")[0]
                                            : ""
                                        }`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}                        {/* Render Twitter embed if type is "twitter" */}
                        {type === "twitter" && (
                            <div ref={tweetRef} className="rounded-2xl overflow-hidden">
                                <blockquote className="twitter-tweet">
                                    <a href={link.replace("x.com", "twitter.com")}></a>
                                </blockquote>
                            </div>
                        )}                        {/* Render LinkedIn embed if type is "linkedin" */}
                        {type === "linkedin" && (
                            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 p-3 md:p-4 border border-blue-200">
                                <div className="flex items-center mb-3">
                                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2 md:mr-3 flex-shrink-0">
                                        <svg className="w-3 h-3 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold text-blue-900 text-sm md:text-base">LinkedIn Post</div>
                                        <div className="text-xs md:text-sm text-blue-700">Professional Network</div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-3">
                                    <p className="text-slate-700 text-sm md:text-base mb-3 line-clamp-3">
                                        {title || "LinkedIn Post"}
                                    </p>
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-xs md:text-sm font-medium"
                                    >
                                        View on LinkedIn
                                        <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        )}                        {/* Render Instagram embed if type is "instagram" */}
                        {type === "instagram" && (
                            <div ref={instagramRef} className="rounded-2xl overflow-hidden w-full">
                                <blockquote 
                                    className="instagram-media" 
                                    data-instgrm-captioned 
                                    data-instgrm-permalink={link}
                                    data-instgrm-version="14" 
                                    style={{
                                        background: '#FFF',
                                        border: 0,
                                        borderRadius: '12px',
                                        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                                        margin: 0,
                                        maxWidth: '100%',
                                        minWidth: '280px',
                                        padding: 0,
                                        width: '100%'
                                    }}
                                >
                                    <div style={{ padding: '12px' }}>
                                        <a 
                                            href={link}
                                            style={{
                                                background: '#FFFFFF',
                                                lineHeight: 0,
                                                padding: '0 0',
                                                textAlign: 'center' as const,
                                                textDecoration: 'none',
                                                width: '100%',
                                                display: 'block'
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                        </a>
                                        <p style={{
                                            color: '#c9c8cd',
                                            fontFamily: 'Arial,sans-serif',
                                            fontSize: '13px',
                                            lineHeight: '16px',
                                            marginBottom: 0,
                                            marginTop: '6px',
                                            overflow: 'hidden',
                                            padding: '6px 0 5px',
                                            textAlign: 'center' as const,
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap' as const
                                        }}>
                                            <a 
                                                href={link}
                                                style={{
                                                    color: '#c9c8cd',
                                                    fontFamily: 'Arial,sans-serif',
                                                    fontSize: '13px',
                                                    fontStyle: 'normal',
                                                    fontWeight: 'normal',
                                                    lineHeight: '16px',
                                                    textDecoration: 'none'
                                                }}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {title || "View this post on Instagram"}
                                            </a>
                                        </p>
                                    </div>
                                </blockquote>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}