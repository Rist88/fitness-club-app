import axios from 'axios';
import { RequestTypeWithData, RequestTypeWithoutData } from './types';

const REQUEST_CONTENT_TYPE = 'application/json';
const REQUEST_ACCEPT = 'application/json, text/javascript, */*; q=0.01';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = REQUEST_ACCEPT;
axios.defaults.headers.post['Content-Type'] = REQUEST_CONTENT_TYPE;

axios.interceptors.response.use(
  response => (response && response.data ? response.data : response),
  // TODO: check the best approach
  error => Promise.reject(error),
);

export function httpGet(...arg: RequestTypeWithoutData) {
  return axios.get.apply(null, arg);
}

export function httpPut(...arg: RequestTypeWithData) {
  return axios.put.apply(null, arg);
}

export function httpPost(...arg: RequestTypeWithData) {
  return axios.post.apply(null, arg);
}

export function httpDelete(...arg: RequestTypeWithoutData) {
  return axios.delete.apply(null, arg);
}

export function httpPatch(...arg: RequestTypeWithData) {
  return axios.patch.apply(null, arg);
}
