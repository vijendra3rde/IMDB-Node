// import {GET_PERMISSIONS} from '../action/type';

import { GET_ACTORS } from "../action/type";

const initalState = {
  actors:[]
};

export const actorsReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_ACTORS:
      return {
        ...state,
        
        actors: action.payload.data,
        
      
      };
    default:
      return state;
  }
};  
