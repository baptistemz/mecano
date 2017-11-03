import axios from 'axios';
import { push } from 'react-router-redux';
import { setNextHeaders } from '../utils/tokenManagement';
import {
  IMPLEMENT_SEARCH,
  ADD_DOMAINS_TO_SEARCH,
  RECEIVED_SEARCH_RESULTS,
  UPDATE_DISTANCE,
  SEARCH_ERROR
} from './types';


// EXTERNAL API CALLS


export function implementSearch(values){
  return dispatch => {
    dispatch({ type: IMPLEMENT_SEARCH, values })
    dispatch(push('/mecano_search_domains'));
  }
};
export function updateDistance(distance){
  return dispatch => {
    dispatch({ type: UPDATE_DISTANCE, distance })
  }
};
export function addDomainsToSearch(domains, search_params){
  return dispatch => {
    dispatch({ type: ADD_DOMAINS_TO_SEARCH, domains });
    dispatch(push('/mecanos'));
  }
};


export function searchMecano(params){
  return dispatch => {
    return axios.get('/api/mecano_profiles', { params })
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(receivedSearchResults(response.data))
      }).catch((error) => {
        console.log(error)
      })
  }
}

function receivedSearchResults(search_results){
  return {
    type: RECEIVED_SEARCH_RESULTS,
    search_results
  };
}

export function searchError(errors){
  return {
    type: SEARCH_ERROR,
    errors
  }
};
