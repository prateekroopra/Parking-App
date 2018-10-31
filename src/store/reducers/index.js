// import { combineReducers } from 'redux';
// import users from './users';

// export const makeRootReducer = asyncReducers => (
//   combineReducers({
//     users,
//     ...asyncReducers,
//   })
// );

// export { makeRootReducer as default };


import { combineReducers } from 'redux'
import users from './users'

export default combineReducers({
  users
});
