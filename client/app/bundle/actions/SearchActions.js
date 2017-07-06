import axios from 'axios';
import { push } from 'react-router-redux';
import {
  IMPLEMENT_SEARCH,
  ADD_DOMAINS_TO_SEARCH,
  RECEIVED_SEARCH_RESULTS,
  UPDATE_DISTANCE
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
export function addDomainsToSearch(domains){
  return dispatch => {
    dispatch({ type: ADD_DOMAINS_TO_SEARCH, domains })
    dispatch(push('/mecanos'));
  }
};

export function searchMecano(params){
  return dispatch => {
    return axios.get('/api/mecano_profiles', { params })
      .then(response => {
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
