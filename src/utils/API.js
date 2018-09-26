import axios from 'axios';

const apiBaseURL = "https://jsonplaceholder.typicode.com"

export const signInUserNow = (payload) =>     
  axios.post(`${apiBaseURL}/login`, {
    email: payload.email,
    password: payload.password,
  })
  .then(response => response.data)
  .catch(error => { console.log('Login API Error --->', error.response) });

export const registerUserNow = (payload) =>     
  axios.post(`${apiBaseURL}/register`, {
    email: payload.email,
    password: payload.password,
    fullName: payload.fullName,
    phoneNumber: payload.phoneNumber,
  })
  .then(response => response.data)
  .catch(error => { console.log('Register API Error --->', error.response) });
