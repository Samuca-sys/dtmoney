import axios from 'axios';

//http client
//set default info to intercept requests
export const api = axios.create({//crete instance
  baseURL: 'http://localhost:3000/api', //default url
})