// import {GET_PERMISSIONS} from '../action/type';

import { EDIT_MOVIES } from "../action/type";

const initalState = {
  editmovies:{}
};

export const edit_moviesReducer = (state = initalState, action) => {
  switch (action.type) {
    case EDIT_MOVIES:
      return {
        ...state,
        
        editmovies: action.payload.data,
        
      
      };
    default:
      return state;
  }
};  
