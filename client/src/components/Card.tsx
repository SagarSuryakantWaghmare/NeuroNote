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
    }
}

interface CardProps {
    title: string; // Title of the card, e.g., video or tweet title
    link: string; // Link to the content (YouTube or Twitter)
    type: "twitter" | "youtube"; // Type of the content
}

// The Card component represents a styled card that can display either a YouTube video or a Twitter embed based on the type prop.
export function Card({ title, link, type }: CardProps) {
    const tweetRef = useRef<HTMLDivElement>(null);

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
    }, [link, type]);
    return (
        <div className="w-full">            {/* Card Container */}            <div className="group relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl border border-sky-100/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative p-6">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-4">
                    {/* Left Section: Title with Icon */}                    <div className="flex items-center text-md max-w-[80%]">
                        <div className="text-sky-600 pr-3 flex-shrink-0 group-hover:text-sky-700 transition-colors duration-300">
                            {/* Share Icon preceding the title */}
                            <ShareIcon />
                        </div>
                        <div className="font-semibold text-slate-800 truncate group-hover:text-slate-900 transition-colors duration-300" title={title}>
                            {title}
                        </div>
                    </div>                    {/* Right Section: Links with Icons */}                    <div className="flex items-center space-x-2">
                        <a
                            href={link}
                            target="_blank"
                            className="p-2 rounded-xl text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-all duration-300 group/icon"
                            title="Open original"
                        >
                            <div className="transform group-hover/icon:scale-110 transition-transform duration-300">
                                <ShareIcon />
                            </div>
                        </a>
                        <button className="p-2 rounded-xl text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-all duration-300 group/icon">
                            <div className="transform group-hover/icon:scale-110 transition-transform duration-300">
                                <ShareIcon />
                            </div>                        </button>
                    </div>
                </div>

                {/* Content Section with modern styling */}
                <div className="relative overflow-hidden rounded-2xl">                    {/* Render YouTube embed if type is "youtube" */}
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

                    )}

                    {/* Render Twitter embed if type is "twitter" */}
                    {type === "twitter" && (
                        <div ref={tweetRef}>
                            <blockquote className="twitter-tweet">
                                <a href={link.replace("x.com", "twitter.com")}></a>
                            </blockquote>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}