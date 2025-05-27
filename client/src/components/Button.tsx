import type { ReactElement } from "react";

interface ButtonProps{
 variant:"primary"|"secondary";
 text:string;
 startIcon:ReactElement;
}
const variantClasses={
    "primary":'bg-purple-600 text-white',
    "secondary":'bg-purple-200 text-purple-400',
}

const defaultStyles="px-4 py-2 rounded-md font-light text-sm flex items-center gap-2";
export function Button({variant,text,startIcon}:ButtonProps){
   return <button className={variantClasses[variant] +" "+ defaultStyles}>
    <div className="flex items-center gap-2">
    {startIcon}
    {text}
    </div>
    </button>
}