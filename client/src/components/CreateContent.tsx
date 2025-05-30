import { useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
export function CreateContentModal({ open, onClose }) {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <><div>
            {open && <div className="w-screen h-screen bg-gray-800 fixed top- 0 left-0 opacity-50 flex justify-center">
                <div className="flex flex-col justify-center ">
                    <span className="bg-white opacity-100 relative p-4 rounded ">
                        <div className="flex justify-end" onClick={() => {onClose()}}>
                            <CrossIcon/>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Input placeholder="Title"/>
                            <Input placeholder="Link"/>
                        </div>
                        <div className="flex justify-center mt-4">
                        <Button variant="primary" text="Submit"></Button>
                        </div>
                    </span>
                </div>
            </div>
            }
        </div>
        </>
    )
}
function Input({onChange,placeholder}:{onChange:()=>void}){
    return(
        <div>
            <input placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded" onChange={onChange}/>
        </div>
    )
}