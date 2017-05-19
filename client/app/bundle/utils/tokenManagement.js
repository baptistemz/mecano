import axios from 'axios';

export function setHeaders(data) {
  axios.defaults.headers.common['Authorization'] = 'Bearer'
  Object.keys(data).forEach(function(key,index) {
    axios.defaults.headers.common[key] = data[key];
  });
};

export function setStorage(data) {
  Object.keys(data).forEach(function(key,index) {
      console.log("tokenManagement", typeof window !== "undefined")
      window.localStorage.setItem(key, data[key]);
  });
};
