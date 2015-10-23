import { combineReducers } from 'redux';

function ajaxTodo(state = [] ,action = null){
    switch(action.type){
        case "alert" :
            state.push({
                msg : action.msg,
                style : action.status == "success" ? "success" : "danger"
            });
            return [...state];
        case "dismiss" :
            state.splice(action.index, 1);
            return [...state];
        default:
            return state;
    }
}
const InitModalState = {
    show : false,
    title : "",
    body : "",
    callback : null,
    onClose : null
};
function modalTodo(state = InitModalState ,action = null){
    switch(action.type){
        case "open" :
            state = {
                show : true,
                title : action.title,
                body : action.body,
                callback : action.callback,
                onClose : action.onClose
            };
            return state;
        case "close" :
            return InitModalState
        default:
            return state;
    }
}

function showLoading(state = false , action = null ){
    switch(action.type){
        case "show" :
            state = true;
            return state
        case "hide" :
            state = false;
            return state;
        default :
            return state;
    }
}
export default combineReducers({
    ajaxTodo,
    modalTodo,
    showLoading
});