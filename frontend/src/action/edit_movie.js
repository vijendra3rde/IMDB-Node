import { getMoviesAPI } from '../APIS/API';
import { EDIT_MOVIES } from './type';

export const editMovies = (data) => {
    return async dispatch => {
      try {

        // const respon = await getMoviesAPI()

          
        dispatch(seteditMovies(data));
        
  
      } catch (error) { }
    };
  };
  
  const seteditMovies = data => ({
    type: EDIT_MOVIES,
    payload: {
      data,
    },
  });

