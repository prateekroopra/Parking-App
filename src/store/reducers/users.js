import _ from "lodash";
import {
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  ADD_PARKING_ERROR,
  ADD_PARKING_SUCCESS,
  GET_PARKING_LIST_SUCCESS,
  GET_PARKING_LIST_ERROR,
  ADD_VEHICLE_ERROR,
  ADD_VEHICLE_SUCCESS,
  GET_USER_VEHICLE_SUCCESS,
  GET_USER_VEHICLE_ERROR,
  BOOK_PARKING_ERROR,
  BOOK_PARKING_SUCCESS,
  GET_USER_BOOKING_ERROR,
  GET_USER_BOOKING_SUCCESS
} from "../actions/users";

const users = (
  state = {
    addUserData: {},
    loginUserData: {},
    errorMessage: "",
    parking: {},
    parkingList: {},
    vehicle: {},
    VehicleList: [],
    bookParking: {},
    bookingList: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_USER_ERROR:
      return _.assign({}, state, {
        errorMessage: action.errorMessage
      });
    case ADD_USER_SUCCESS:
      return _.assign({}, state, {
        addUserData: action.user
      });
    case SIGNIN_ERROR:
      return _.assign({}, state, {
        errorMessage: action.errorMessage
      });
    case SIGNIN_SUCCESS:
      return _.assign({}, state, {
        loginUserData: action.user
      });
    case ADD_PARKING_ERROR:
      return _.assign({}, state, {
        errorMessage: action.errorMessage
      });
    case ADD_PARKING_SUCCESS:
      return _.assign({}, state, {
        parking: action.parking
      });
    case GET_PARKING_LIST_ERROR:
      return _.assign({}, state, {
        errorMessage: action.errorMessage
      });
    case GET_PARKING_LIST_SUCCESS:
      return _.assign({}, state, {
        parkingList: action.parkingList
      });
    case ADD_VEHICLE_ERROR:
      return _.assign({}, state, {
        errorMessage: action.errorMessage
      });
    case ADD_VEHICLE_SUCCESS:
      return _.assign({}, state, {
        vehicle: action.vehicle
      });
    case GET_USER_VEHICLE_ERROR:
      return _.assign({}, state, {
        errorMessage: action.errorMessage
      });
    case GET_USER_VEHICLE_SUCCESS:
      return _.assign({}, state, {
        VehicleList: action.VehicleList
      });
    case BOOK_PARKING_ERROR:
      return _.assign({}, state, {
        errorMessage: action.errorMessage
      });
    case BOOK_PARKING_SUCCESS:
      return _.assign({}, state, {
        bookParking: action.bookParking
      });
    case GET_USER_BOOKING_ERROR:
      return _.assign({}, state, {
        errorMessage: action.errorMessage
      });
    case GET_USER_BOOKING_SUCCESS:
      return _.assign({}, state, {
        bookingList: action.bookingList
      });
    default:
      return state;
  }
};

export default users;
