import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { push } from 'react-router-redux';
import { setNextHeaders } from '../utils/tokenManagement';
import {
  CONTACT_CONFIRMED
} from './types';


// EXTERNAL API CALLS


export function contact(values){
  return dispatch => {
    return axios.post(`/api/services`, values)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(push(`/mecanos/${response.data.service.mecano_profile_id}`))
        toastr.success('Le mécano a bien été contacté');
        console.log(response.data)
        dispatch(contactConfirmed(response.data.service))
      }).catch(error => {
        if(error.response.data.errors.user_id){toastr.error(error.response.data.errors.user_id)}
      })
  };
};

function contactConfirmed(service){
  return {
    type: CONTACT_CONFIRMED,
    service
  }
}
