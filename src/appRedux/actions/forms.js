import {FORM_TABLE,CREATE_FORM} from '../action-type/actionType';

export const createForm = (data) => {
    let forms = localStorage.getItem("forms") ? JSON.parse(localStorage.getItem("forms")) : [];

    data = JSON.stringify([...forms,data]);

    localStorage.setItem("forms", data);
    
    return {
      type: CREATE_FORM,
      payload:data,
    };
  };

export const getForms = () => {
    let data = localStorage.getItem("forms") ? JSON.parse(localStorage.getItem("forms")) : [];
    return {
      type: FORM_TABLE,
      payload:data,
    };
  };
