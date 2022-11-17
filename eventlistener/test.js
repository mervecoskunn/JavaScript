function eventListenerBagla(){
    document.getElementById('text').addEventListener("click",uzerinde());

}
function eventListenerSil(){
    document.getElementById('text').removeEventListener("click",uzerinde);

}
function uzerinde(){
    console.log(" Mause yazinin ustunde....");

}