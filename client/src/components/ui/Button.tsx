 interface ButtonProps{
    variant:"primary"|"secondary";
    size:"sm"|"md"|"lg"; 
    text:string;
    startIcon?:any;
    endIcon?:any;
    onClick:()=>void;
}
export const Button=(props:ButtonProps)=>{
    return<button>

    </button>
}
<Button variant="primary" size="md" onClick={()=>{}} text={"Sagar Can do it"} startIcon={"-"} endIcon={"+"} />