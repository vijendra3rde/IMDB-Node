// import {GET_PERMISSIONS} from '../action/type';

import { GET_PRODUCERS } from "../action/type";

const initalState = {
  producers:[]
};

export const producersReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_PRODUCERS:
      return {
        ...state,
        
        producers: action.payload.data,
        
      
      };
    default:
      return state;
  }
};  
