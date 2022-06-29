import { getActorsAPI } from '../APIS/API';
import { GET_ACTORS } from './type';

export const getActors = () => {
    return async dispatch => {
      try {

        const respon = await getActorsAPI()

          
        dispatch(setActors(respon.data));
        
  
      } catch (error) { }
    };
  };
  
  const setActors = data => ({
    type: GET_ACTORS,
    payload: {
      data,
    },
  });

