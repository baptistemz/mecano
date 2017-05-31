import axios from 'axios';
import _ from 'lodash';


export function setNextHeaders(headers){
  headers['auth_token'] = headers['access-token']
  setStorage(getHeadersObject(headers));
  axios.defaults.headers.common = getHeadersObject(headers);
  console.log("setNextHeaders headers", headers)
  console.log("setNextHeaders axios", axios.defaults.headers.common.auth_token)
}

export function getHeadersObject(data) {
  const headers = {'Authorization': 'Bearer'}
  const localSubset = _.pick(data, [ 'access-token', 'auth_token', 'client', 'expiry', 'uid']);
  Object.keys(localSubset).forEach(function(key,index) {
    headers[key] = localSubset[key];
  });
  return headers
};

export function setStorage(data) {
  Object.keys(data).forEach(function(key,index) {
      localStorage.setItem(key, data[key]);
  });
};
