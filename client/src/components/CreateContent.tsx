import { useRef, useState } from "react"; // Importing React hooks for state management and refs
import { CrossIcon } from "../icons/CrossIcon"; // Importing the close icon
//@ts-ignore
import { Button } from "./Button"; 
import { Input } from "./Input"; // Importing the Input component for form inputs
import axios from "axios"; // Importing axios for HTTP requests
import toast from 'react-hot-toast'; // Importing toast for notifications

// Union type to represent different types of content
type ContentType = "youtube" | "twitter" | "linkedin" | "instagram";

const ContentTypeValues = {
    Youtube: "youtube" as ContentType,
    Twitter: "twitter" as ContentType,
    LinkedIn: "linkedin" as ContentType,
    Instagram: "instagram" as ContentType,
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
    const [type, setType] = useState<ContentType>(ContentTypeValues.Youtube);    // Function to handle adding new content
    async function addContent() {
        const title = titleRef.current?.value; // Getting the title value from the input
        const link = linkRef.current?.value; // Getting the link value from the input
        
        // Making a POST request to add new content
        try {            if (!link) {
                toast.error("Please enter a link", {
                    duration: 4000,
                    style: {
                        background: '#ffffff',
                        color: '#334155',
                        border: '1px solid #e0f2fe',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    },
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#ffffff',
                    },
                });
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
              // Show success message
            toast.success("Content added successfully!", {
                duration: 4000,
                style: {
                    background: '#ffffff',
                    color: '#334155',
                    border: '1px solid #e0f2fe',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                },
                iconTheme: {
                    primary: '#0ea5e9',
                    secondary: '#ffffff',
                },
            });
            
            // Refresh the page to show new content
            window.location.reload();
        } catch (error) {
            console.error("Error adding content:", error);            toast.error("Error adding content. Please try again.", {
                duration: 4000,
                style: {
                    background: '#ffffff',
                    color: '#334155',
                    border: '1px solid #e0f2fe',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                },
                iconTheme: {
                    primary: '#ef4444',
                    secondary: '#ffffff',
                },
            });
        }        // Closing the modal after adding content
        onClose();
    }
    
    return (
        <div>
            {open && (
                // Modal background overlay with blur effect
                <div>                    <div className="w-screen h-screen bg-slate-900/60 backdrop-blur-sm fixed top-0 left-0 z-[70] flex justify-center items-center transition-all duration-300"></div>
                    {/* Modal content container */}
                    <div className="w-screen h-screen fixed top-0 left-0 z-[70] flex justify-center items-center p-4">
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

                                        <button
                                            onClick={() => setType(ContentTypeValues.LinkedIn)}
                                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                                type === ContentTypeValues.LinkedIn
                                                    ? 'border-sky-500 bg-gradient-to-r from-sky-50 to-cyan-50 shadow-lg'
                                                    : 'border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center space-y-2">
                                                <svg className={`w-6 h-6 ${type === ContentTypeValues.LinkedIn ? 'text-sky-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                </svg>
                                                <span className={`text-sm font-medium ${type === ContentTypeValues.LinkedIn ? 'text-sky-700' : 'text-slate-600'}`}>
                                                    LinkedIn
                                                </span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setType(ContentTypeValues.Instagram)}
                                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                                type === ContentTypeValues.Instagram
                                                    ? 'border-sky-500 bg-gradient-to-r from-sky-50 to-cyan-50 shadow-lg'
                                                    : 'border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center space-y-2">
                                                <svg className={`w-6 h-6 ${type === ContentTypeValues.Instagram ? 'text-sky-600' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                </svg>
                                                <span className={`text-sm font-medium ${type === ContentTypeValues.Instagram ? 'text-sky-700' : 'text-slate-600'}`}>
                                                    Instagram
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