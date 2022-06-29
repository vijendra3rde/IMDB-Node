// import {GET_PERMISSIONS} from '../action/type';

import { GET_MOVIES } from "../action/type";

const initalState = {
  movies:[]
};

export const moviesReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        
        movies: action.payload.data,
        
      
      };
    default:
      return state;
  }
};  
