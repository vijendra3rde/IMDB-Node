import { getProducersAPI } from '../APIS/API';
import { GET_PRODUCERS } from './type';

export const getProducers = () => {
    return async dispatch => {
      try {

        const respon = await getProducersAPI()

          
        dispatch(setProducers(respon.data));
        
  
      } catch (error) { }
    };
  };
  
  const setProducers = data => ({
    type: GET_PRODUCERS,
    payload: {
      data,
    },
  });

