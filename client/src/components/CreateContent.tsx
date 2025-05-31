import { useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState<"twitter" | "youtube">("youtube");
    const [loading, setLoading] = useState(false);

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4 text-center">
                        {/* Overlay */}
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

                        {/* Modal */}
                        <div className="relative w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all">
                            <div className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-gray-700" onClick={onClose}>
                                <CrossIcon />
                            </div>

                            <h3 className="mb-6 text-xl font-medium text-gray-900">Add Content</h3>                            <div className="flex flex-col gap-4">
                                <Input
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Input
                                    placeholder="Link (YouTube or Twitter URL)"
                                    value={link}
                                    onChange={(e) => {
                                        setLink(e.target.value);
                                        // Auto-detect content type from link
                                        if (e.target.value.includes('youtube.com') || e.target.value.includes('youtu.be')) {
                                            setType('youtube');
                                        } else if (e.target.value.includes('twitter.com') || e.target.value.includes('x.com')) {
                                            setType('twitter');
                                        }
                                    }}
                                />
                                
                                <div className="flex gap-4 mt-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="contentType"
                                            checked={type === 'youtube'}
                                            onChange={() => setType('youtube')}
                                            className="mr-2"
                                        />
                                        YouTube
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="contentType"
                                            checked={type === 'twitter'}
                                            onChange={() => setType('twitter')}
                                            className="mr-2"
                                        />
                                        Twitter
                                    </label>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button
                                    variant="primary"
                                    text="Submit"
                                    loading={loading}
                                    onClick={async () => {
                                        try {
                                            setLoading(true);
                                            if (!link) {
                                                alert("Please enter a link");
                                                return;
                                            }
                                            
                                            const token = localStorage.getItem('token');
                                            if (!token) {
                                                alert("Please login first");
                                                return;
                                            }
                                            
                                            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                                                link,
                                                type,
                                                title
                                            }, {
                                                headers: {
                                                    Authorization: token
                                                }
                                            });
                                            
                                            // Clear form and close modal
                                            setTitle("");
                                            setLink("");
                                            onClose();
                                            
                                            // Refresh the page to show new content
                                            window.location.reload();
                                        } catch (error) {
                                            console.error("Error adding content:", error);
                                            alert("Failed to add content. Please try again.");
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}