//  import { ReactElement } from "react";
 type Variants="primary"|"secondary";

 interface ButtonProps{
    variant:Variants;
    size:"sm"|"md"|"lg"; 
    text:string;
    startIcon?:any;
    endIcon?:any;
    onClick:()=>void;
}

const variantsStyles={
    "primary":"bg-blue-600 text-white",
    "secondary":"bg-blue-400 text-blue-600",
}

const sizeStyles={
    "sm":"py-1 px-2",
    "md":"py-2 px-4",
    "lg":"py-3 px-6"
}
const defaultStyles="rounded-md p-4"
export const Button=(props:ButtonProps)=>{
    

    return<button className={`${variantsStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`} onClick={props.onClick}>
      {props.startIcon} {props.text}
    </button>
}
<Button variant="primary" size="md" onClick={()=>{}} text={"Sagar Can do it"} startIcon={"-"} endIcon={"+"} />