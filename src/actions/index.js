import * as API from '../utils/API';
import { GET_CURRENT_USER } from './types'

export function signInUser(payload) {
  return dispatch => {
    API.signInUserNow(payload)
      .then(user => {
        dispatch(getCurrentUser(user))
      })
  }
}

export function registerUser(payload) {
  return dispatch => {
    API.registerUserNow(payload)
      .then(user => {
        dispatch(getCurrentUser(user))
      })
  }
}

function getCurrentUser(user) {
  return {
    type: GET_CURRENT_USER,
    user
  }
}
