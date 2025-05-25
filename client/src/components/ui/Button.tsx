//  import { ReactElement } from "react";
type Variants = "primary" | "secondary";

interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick: () => void;
}

const variantsStyles = {
    "primary": "bg-blue-600 text-white",
    "secondary": "bg-blue-400 text-blue-600",
}

const sizeStyles = {
    "sm": "py-1 px-2 text-xl",
    "md": "py-2 px-4 text-md",
    "lg": "py-3 px-6 text-lg"
}
const defaultStyles = "rounded-md flex p-2"
export const Button = (props: ButtonProps) => {


    return <button className={`${variantsStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`} onClick={props.onClick}>
        <div className="flex">
            {props.startIcon} {props.text} {props.endIcon}
        </div>
    </button>
}
<Button variant="primary" size="md" onClick={() => { }} text={"Sagar Can do it"} startIcon={"-"} endIcon={"+"} />