import { getMoviesAPI } from '../APIS/API';
import { GET_MOVIES } from './type';

export const getMovies = () => {
    return async dispatch => {
      try {

        const respon = await getMoviesAPI()

          
        dispatch(setMovies(respon.data));
        
  
      } catch (error) { }
    };
  };
  
  const setMovies = data => ({
    type: GET_MOVIES,
    payload: {
      data,
    },
  });

