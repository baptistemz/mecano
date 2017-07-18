import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { setNextHeaders } from '../utils/tokenManagement';
import {
  RECOMMENDED_DOMAIN,
  UNRECOMMENDED_DOMAIN,
  GOT_RECOMMENDATION_PICTURES
} from './types';


// EXTERNAL API CALLS

export function recommend(domain_id){
  return dispatch => {
    return axios.post(`/api/domains/${domain_id}/recommendations`)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(recommendedDomain(response.data.recommendation))
        toastr.info('Recommandation enregistrée');
      }).catch(error => {
        console.log(error)
        // setNextHeaders(error.response.headers)
      })
  };
};

export function unrecommend(domain_id){
  return dispatch => {
    return axios.delete(`/api/domains/${domain_id}/recommendations/delete`)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(unrecommendedDomain(response.data.recommendation))
        toastr.info('Recommandation annulée');
      }).catch(error => {
        console.log(error)
        // setNextHeaders(error.response.headers)
      })
  };
};

export function fetchRecommendationPictures(domain_id){
  return dispatch => {
    return axios.get(`/api/domains/${domain_id}/recommendations/pictures`)
      .then(response => {
        dispatch(gotRecommendationPictures(response.data))
      }).catch(error => {
        console.log(error)
        // setNextHeaders(error.response.headers)
      })
  };
};

function recommendedDomain(recommendation){
  return {
    type: RECOMMENDED_DOMAIN,
    recommendation
  }
}

function unrecommendedDomain(recommendation){
  return {
    type: UNRECOMMENDED_DOMAIN,
    recommendation
  }
}

function gotRecommendationPictures(pictures){
  return {
    type: GOT_RECOMMENDATION_PICTURES,
    pictures
  }
}
