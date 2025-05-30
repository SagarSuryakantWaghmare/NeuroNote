import { useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
export function CreateContentModal({ open, onClose }) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

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
                            
                            <h3 className="mb-6 text-xl font-medium text-gray-900">Add Content</h3>
                            
                            <div className="flex flex-col gap-4">
                                <Input 
                                    placeholder="Title" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Input 
                                    placeholder="Link" 
                                    value={link} 
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                            
                            <div className="mt-6">
                                <Button 
                                    variant="primary" 
                                    text="Submit"
                                    onClick={() => {
                                        // Handle submission
                                        onClose();
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
interface InputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    value?: string;
}

function Input({onChange, placeholder, value}: InputProps) {
    return(
        <div className="w-full">
            <input 
                placeholder={placeholder} 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                onChange={onChange}
                value={value}
            />
        </div>
    )
}