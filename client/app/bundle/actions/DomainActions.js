import axios from 'axios';
import { push } from 'react-router-redux';
import { setNextHeaders } from '../utils/tokenManagement';
import {
  REGISTERED_DOMAINS
} from './types';


// EXTERNAL API CALLS

export function registerDomains(id, data, next_path){
  console.log(id, data, next_path)
  return dispatch => {
    return axios.post(`/api/mecano_profiles/${id}/domains/register_domains`, data)
      .then(response => {
        console.log("Action", response)
        setNextHeaders(response.headers)
        dispatch(push(next_path || '/mecano_profile'))
        dispatch(registeredDomains(response.data.domains))
      }).catch(error => {
        console.log(error)
        domainRegistrationError(error.response)
        // setNextHeaders(error.response.headers)
      })
  };
};




// REDUX ACTION CREATORS

export function registeredDomains(domains) {
  console.log("2nd action", domains)
  return {
    type: REGISTERED_DOMAINS,
    domains
  };
}

export function domainRegistrationError(errors) {
  console.log(errors)
}
