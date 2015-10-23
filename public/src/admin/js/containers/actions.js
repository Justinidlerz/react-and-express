//Alert
export function alerts(msg , status){
    return { type : "alert" , msg , status };
}
export function dismiss(index){
    return { type : "dismiss" , index };
}
//Modal
export function openModal(title = "提示", body = "" , callback = null , onClose = null){
    return { type : "open" , title , body , callback , onClose };
}
export function closeModal(){
    return { type : "close" };
}
//Loading
export function showLoading(){
    return { type : "show" };
}
export function hideLoading(){
    return { type : "hide" };
}