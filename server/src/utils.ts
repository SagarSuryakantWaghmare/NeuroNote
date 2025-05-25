export function random(len:number){
    let options="qwertyuiopasdfjghtuxkcji12345678";
    let length=options.length;
    let ans="";
    for(let i=0;i<length;i++){
       ans+=options[Math.floor((Math.random())*length)]//0 to 20
    }
    return ans;
}