import axios from 'axios';
import { push } from 'react-router-redux';
import { setNextHeaders } from '../utils/tokenManagement';
import { errorHandling } from '../utils/errorHandling';
import {
  REGISTERED_DOMAINS,
  UPDATED_TECHNICAL_DOMAINS,
  UPDATED_CAR_DOMAINS
} from './types';


// EXTERNAL API CALLS

export function registerDomains(id, data, next_path){
  return dispatch => {
    return axios.post(`/api/mecano_profiles/${id}/domains/register_domains`, data)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(registeredDomains(response.data))
        dispatch(push(next_path || '/mecano_profile'))
      }).catch(error => {
        console.log(error)
        errorHandling(error)
        // setNextHeaders(error.response.headers)
      })
  };
};
export function updateTechnicalDomains(id, data){
  return dispatch => {
    return axios.post(`/api/mecano_profiles/${id}/domains/update_technical_domains`, data)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(updatedTechnicalDomains(response.data))
        dispatch(push('/mecano_profile'))
      }).catch(error => {
        errorHandling(error)
        setNextHeaders(error.response.headers)
      })
  };
};
export function updateCarDomains(id, data, next_path){
  return dispatch => {
    return axios.post(`/api/mecano_profiles/${id}/domains/update_car_domains`, data)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(updatedCarDomains(response.data))
        dispatch(push(next_path ? next_path : '/mecano_profile'))
      }).catch(error => {
        errorHandling(error)
        setNextHeaders(error.response.headers)
      })
  };
};




// REDUX ACTION CREATORS

export function registeredDomains(domains) {
  return {
    type: REGISTERED_DOMAINS,
    domains: domains
  };
}

export function updatedTechnicalDomains(domains) {
  return {
    type: UPDATED_TECHNICAL_DOMAINS,
    domains
  };
}
export function updatedCarDomains(domains) {
  return {
    type: UPDATED_CAR_DOMAINS,
    domains
  };
}
