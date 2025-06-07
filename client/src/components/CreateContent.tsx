import { useRef, useState } from "react"; // Importing React hooks for state management and refs
import { CrossIcon } from "../icons/CrossIcon"; // Importing the close icon
import { Button } from "./Button"; // Importing the Button component
import { Input } from "./Input"; // Importing the Input component for form inputs
import axios from "axios"; // Importing axios for HTTP requests

// Union type to represent different types of content
type ContentType = "youtube" | "twitter";

const ContentTypeValues = {
    Youtube: "youtube" as ContentType,
    Twitter: "twitter" as ContentType,
};

// Interface for the props passed to the CreateContentModal component
interface CreateContentModalProps {
    open: boolean; // State to determine if the modal is open
    onClose: () => void; // Function to close the modal
}

// CreateContentModal component definition
export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
    // References to the input fields for title and link
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    // State to manage the selected content type
    const [type, setType] = useState<ContentType>(ContentTypeValues.Youtube);

    // Function to handle adding new content
    async function addContent() {
        const title = titleRef.current?.value; // Getting the title value from the input
        const link = linkRef.current?.value; // Getting the link value from the input        // Making a POST request to add new content
        try {
            if (!link) {
                alert("Please enter a link");
                return;
            }
            
            await axios.post(`/api/v1/content`, {
                link,
                title,
                type
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token") || "" // Including the authorization token
                }
            });
            
            // Refresh the page to show new content
            window.location.reload();
        } catch (error) {
            console.error("Error adding content:", error);
            alert("Error adding content. Please try again.");
        }

        // Closing the modal after adding content
        onClose();
    }    return (
        <div>
            {open && (
                // Modal background overlay with blur effect
                <div>
                    <div className="w-screen h-screen bg-slate-900/60 backdrop-blur-sm fixed top-0 left-0 z-50 flex justify-center items-center transition-all duration-300"></div>
                    {/* Modal content container */}
                    <div className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center p-4">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-sky-100/50 backdrop-blur-xl">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-6 border-b border-sky-100">
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-sky-800 to-cyan-800 bg-clip-text text-transparent">
                                        Add New Content
                                    </h2>
                                    <p className="text-slate-600 text-sm mt-1">Save content to your second brain</p>
                                </div>
                                <button 
                                    onClick={onClose} 
                                    className="p-2 rounded-xl hover:bg-sky-50 transition-colors duration-200 text-slate-400 hover:text-slate-600"
                                >
                                    <CrossIcon />
                                </button>
                            </div>
                            
                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                {/* Input fields */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Title (Optional)
                                        </label>
                                        <Input ref={titleRef} placeholder="Enter a descriptive title..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Link <span className="text-red-500">*</span>
                                        </label>
                                        <Input ref={linkRef} placeholder="Paste your URL here..." />
                                    </div>
                                </div>
                                
                                {/* Content type selection with modern toggle */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-3">
                                        Content Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setType(ContentTypeValues.Youtube)}
                                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                                type === ContentTypeValues.Youtube
                                                    ? 'border-sky-500 bg-gradient-to-r from-sky-50 to-cyan-50 shadow-lg'
                                                    : 'border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center space-y-2">
                                                <svg className={`w-6 h-6 ${type === ContentTypeValues.Youtube ? 'text-sky-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                                </svg>
                                                <span className={`text-sm font-medium ${type === ContentTypeValues.Youtube ? 'text-sky-700' : 'text-slate-600'}`}>
                                                    YouTube
                                                </span>
                                            </div>
                                        </button>
                                        
                                        <button
                                            onClick={() => setType(ContentTypeValues.Twitter)}
                                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                                type === ContentTypeValues.Twitter
                                                    ? 'border-sky-500 bg-gradient-to-r from-sky-50 to-cyan-50 shadow-lg'
                                                    : 'border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center space-y-2">
                                                <svg className={`w-6 h-6 ${type === ContentTypeValues.Twitter ? 'text-sky-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                                </svg>
                                                <span className={`text-sm font-medium ${type === ContentTypeValues.Twitter ? 'text-sky-700' : 'text-slate-600'}`}>
                                                    Twitter
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Modal Footer */}
                            <div className="p-6 border-t border-sky-100 bg-gradient-to-r from-sky-50/50 to-cyan-50/50 rounded-b-3xl">
                                <div className="flex gap-3">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 px-4 py-3 text-slate-600 hover:text-slate-800 font-medium rounded-xl hover:bg-white transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={addContent}
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-sky-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Add Content
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}