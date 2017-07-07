import axios from 'axios';
import { push } from 'react-router-redux';
import {
  CONTACT_CONFIRMED
} from './types';


// EXTERNAL API CALLS


export function contact(values){
  return dispatch => {
    return axios.post(`/api/services`, values)
      .then(response => {
        setNextHeaders(response.headers)
        console.log(response.data)
        // dispatch(contactConfirmed(response.data.domains))
        // dispatch(push(next_path || '/mecano_profile'))
      }).catch(error => {
        console.log(error)
        // setNextHeaders(error.response.headers)
      })
  };
};
