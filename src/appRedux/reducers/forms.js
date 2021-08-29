import {FORM_TABLE,CREATE_FORM} from '../action-type/actionType';

const INIT_STATE = {
    formsList: localStorage.getItem("forms") || [],
}

export default (state=INIT_STATE,action)=>{
    switch (action.type) {

        case FORM_TABLE:{
            return {...state,formsList:action.payload}
        }   

        case CREATE_FORM :{
            return {...state,formsList:action.payload}
        }   

        default:
            return state;
    }
}