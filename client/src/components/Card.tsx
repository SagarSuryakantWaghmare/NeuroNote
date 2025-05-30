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
        <div className="w-full">
            {/* Card Container */}
            <div className="p-4 bg-white rounded-md border-gray-200 border overflow-hidden">
                {/* Header Section */}
                <div className="flex justify-between">
                    {/* Left Section: Title with Icon */}
                    <div className="flex items-center text-md">
                        <div className="text-gray-500 pr-2">
                            {/* Share Icon preceding the title */}
                            <ShareIcon />
                        </div>
                        {title}
                    </div>
                    {/* Right Section: Links with Icons */}
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            {/* Clickable Share Icon that opens the link */}
                            <a href={link} target="_blank">
                                <ShareIcon />
                            </a>
                        </div>
                        <div className="text-gray-500">
                            {/* Placeholder for another Share Icon */}
                            <ShareIcon />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="pt-4">
                    {/* Render YouTube embed if type is "youtube" */}
                    {type === "youtube" && (
                        <iframe
                            className="w-full aspect-video"
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

                    )}

                    {/* Render Twitter embed if type is "twitter" */}
                    {type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
        </div>
    );
}