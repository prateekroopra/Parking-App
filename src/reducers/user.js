import {
  GET_CURRENT_USER
} from '../actions/types'

const initialState = { };

export default function(state = initialState, action) {
  const {user} = action

  switch (action.type) {

    case GET_CURRENT_USER:
      return {
          ...user
        }

    default:
      return state;
  }
}
