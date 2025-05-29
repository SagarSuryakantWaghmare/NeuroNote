import { useState } from "react";

export function CreateContentModal({ open, onClose }) {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <><div>
            <div className="w-screen h-screen bg-red-200 fixed top- 0 left-0 opacity-50 flex justify-center">
                <div className="bg-white opacity-100 relative ">
                     Hi there!
                </div>
            </div>
        </div>
        </>
    )
}