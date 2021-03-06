import axios from 'axios';
import _ from 'lodash';


export function setNextHeaders(headers){
  if(headers['access-token']){
    setStorage(getHeadersObject(headers));
    axios.defaults.headers.common = getHeadersObject(headers);
  }
}

export function getHeadersObject(data) {
  const headers = {'Authorization': 'Bearer'}
  const localSubset = _.pick(data, [ 'access-token', 'access-token', 'client', 'expiry', 'uid']);
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
