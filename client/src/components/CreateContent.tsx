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
    }

    return (
        <div>
            {open && (
                // Modal background overlay
                <div>
                    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
                    {/* Modal content container */}
                    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                        <div className="flex flex-col justify-center">
                            <span className="bg-white opacity-100 p-4 rounded fixed">
                                {/* Close button */}
                                <div className="flex justify-end">
                                    <div onClick={onClose} className="cursor-pointer">
                                        <CrossIcon />
                                    </div>
                                </div>
                                {/* Input fields for title and link */}                                <div>
                                    <Input ref={titleRef} placeholder="Title" />
                                    <Input ref={linkRef} placeholder="Link" />
                                </div>
                                {/* Content type selection */}                                <div>
                                    <h1>Type</h1>
                                    <div className="flex gap-1 justify-center pb-2">
                                        {/* Button to select YouTube type */}
                                        <Button
                                            text="YouTube"
                                            variant={type === ContentTypeValues.Youtube ? "primary" : "secondary"}
                                            onClick={() => setType(ContentTypeValues.Youtube)}
                                        />
                                        {/* Button to select Twitter type */}
                                        <Button
                                            text="Twitter"
                                            variant={type === ContentTypeValues.Twitter ? "primary" : "secondary"}
                                            onClick={() => setType(ContentTypeValues.Twitter)}
                                        />
                                    </div>
                                </div>
                                {/* Submit button */}
                                <div className="flex justify-center">
                                    <Button onClick={addContent} variant="primary" text="Submit" />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}