import { ShareIcon } from "../icons/ShareIcon";
interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "github";
}
export function Card({ title, link, type }: CardProps) {
    return (
        <>
            <div className="p-5 h-full bg-white rounded-md shadow-md border-gray-200 max-w-72 border min-h-72 min-w-48">
                <div className="flex flex-col">
                    {/* Distance between */}
                    <div className="flex flex-row justify-between  items-center ">
                        <div className=" flex  items-center gap-2 text-md  font-semibold">
                            <div className="text-gray-500 pr-2">
                                <ShareIcon />
                            </div>
                            {title}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="pr-2 text-gray-500 ">
                                <a href={link} target="_blank">

                                    <ShareIcon />
                                </a>
                            </div>
                            <div className="text-gray-500">
                                <ShareIcon />
                            </div>
                        </div>

                    </div>
                    <div className="pt-4">
                        {type === "youtube" && (() => {
                            // Extract the video ID from the YouTube link
                            const match = link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
                            const videoId = match ? match[1] : "";
                            const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : "";
                            return (
                                <iframe
                                    className="rounded-md w-full h-48"
                                    src={embedUrl}
                                    title={title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            );
                        })()}
                        {type === "twitter" &&
                        <blockquote className="twitter-tweet" data-lang="en" data-theme="light" data-dnt="true">
                            <a href={link}></a>
                        </blockquote>
}

                    </div>
                </div>
            </div>
        </>
    )
}