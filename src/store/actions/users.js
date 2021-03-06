import axios from 'axios';
import { apiBaseURL } from '../../utils/API';

export const ADD_USER_ERROR = 'ADD_USER_ERROR';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const ADD_PARKING_ERROR = 'ADD_PARKING_ERROR';
export const ADD_PARKING_SUCCESS = 'ADD_PARKING_SUCCESS';
export const EDIT_PARKING_ERROR = 'EDIT_PARKING_ERROR';
export const EDIT_PARKING_SUCCESS = 'EDIT_PARKING_SUCCESS';
export const GET_PARKING_LIST_SUCCESS = 'GET_PARKING_LIST_SUCCESS';
export const GET_PARKING_LIST_ERROR = 'GET_PARKING_LIST_ERROR';
export const ADD_VEHICLE_ERROR = 'ADD_VEHICLE_ERROR';
export const ADD_VEHICLE_SUCCESS = 'ADD_VEHICLE_SUCCESS';
export const GET_USER_VEHICLE_SUCCESS = 'GET_USER_VEHICLE_SUCCESS';
export const GET_USER_VEHICLE_ERROR = 'GET_USER_VEHICLE_ERROR';
export const BOOK_PARKING_ERROR = 'BOOK_PARKING_ERROR';
export const BOOK_PARKING_SUCCESS = 'BOOK_PARKING_SUCCESS';
export const GET_USER_BOOKING_ERROR = 'GET_USER_BOOKING_ERROR';
export const GET_USER_BOOKING_SUCCESS = 'GET_USER_BOOKING_SUCCESS';
export const ADD_USAEPAY_SUCCESS = 'ADD_USAEPAY_SUCCESS';
export const GET_OWNER_PARKING_LIST_ERROR = 'GET_OWNER_PARKING_LIST_ERROR';
export const GET_OWNER_PARKING_LIST_SUCCESS = 'GET_OWNER_PARKING_LIST_SUCCESS';

let headers = {
  'User-Agent': 'uelib v6.8',
  'Content-Type': 'application/json',
  'Authorization': 'Basic X1Y4N1F0YjUxM0NkM3ZhYk03UkMwVGJ0SldlU284cDc6czIvYWJjZGVmZ2hpamtsbW5vcC9iNzRjMmZhOTFmYjBhMDk3NTVlMzc3ZWU4ZTIwYWE4NmQyYjkyYzNkMmYyNzcyODBkYjU5NWY2MzZiYjE5MGU2'
};

const addUserError = err => ({
  errorMessage: err,
  type: ADD_USER_ERROR,
});

const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  user,
});

const signInError = err => ({
  errorMessage: err,
  type: SIGNIN_ERROR,
});

const signInSuccess = user => ({
  type: SIGNIN_SUCCESS,
  user,
});

const addParkingError = err => ({
  errorMessage: err,
  type: ADD_PARKING_ERROR,
});

const addParkingSuccess = parking => ({
  type: ADD_PARKING_SUCCESS,
  parking,
});

const editParkingError = err => ({
  errorMessage: err,
  type: EDIT_PARKING_ERROR,
});

const editParkingSuccess = parking => ({
  type: EDIT_PARKING_SUCCESS,
  parking,
});

const getParkingListSuccess = parkingList => ({
  type: GET_PARKING_LIST_SUCCESS,
  parkingList,
});

const getParkingListError = err => ({
  errorMessage: err,
  type: GET_PARKING_LIST_ERROR,
});

// const getParkingListSuccess = parkingList => ({
//   type: GET_PARKING_LIST_SUCCESS,
//   parkingList,
// });

// const getParkingListError = err => ({
//   errorMessage: err,
//   type: GET_PARKING_LIST_ERROR,
// });

const addVehicleError = err => ({
  errorMessage: err,
  type: ADD_VEHICLE_ERROR,
});

const addVehicleSuccess = vehicle => ({
  type: ADD_VEHICLE_SUCCESS,
  vehicle,
});

const getUserVehicleSuccess = VehicleList => ({
  type: GET_USER_VEHICLE_SUCCESS,
  VehicleList,
});

const getUserVehicleError = err => ({
  errorMessage: err,
  type: GET_USER_VEHICLE_ERROR,
});

const bookParkingError = err => ({
  errorMessage: err,
  type: BOOK_PARKING_ERROR,
});

const bookParkingSuccess = bookParking => ({
  type: BOOK_PARKING_SUCCESS,
  bookParking,
});

const getUserBookingSuccess = bookingList => ({
  type: GET_USER_BOOKING_SUCCESS,
  bookingList,
});

const getUserBookingError = err => ({
  errorMessage: err,
  type: GET_USER_BOOKING_ERROR,
});

const addPaymentSuccess = payment => ({
  type: ADD_USAEPAY_SUCCESS,
  payment,
});

const getOwnerParkingSuccess = ownerParkingList => ({
  type: GET_OWNER_PARKING_LIST_SUCCESS,
  ownerParkingList,
});

const getOwnerParkingError = err => ({
  errorMessage: err,
  type: GET_OWNER_PARKING_LIST_ERROR,
});

export const addUser = userData => (
  dispatch => (
    axios.post(`${apiBaseURL}/register`, {
      email: userData.email,
      full_name: userData.full_name,
      password: userData.password,
      phone_number: userData.phone_number,
    })
      .then((response) => {
        dispatch(addUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(addUserError('Error while adding user'));
      })
  )
);

export const addRegisterOwnerUser = userData => (
  dispatch => (
    axios.post(`${apiBaseURL}/registerowner`, {
      email: userData.email,
      full_name: userData.full_name,
      password: userData.password,
      phone_number: userData.phone_number,
    })
      .then((response) => {
        dispatch(addUserSuccess(response.data));
      })
      .catch(() => {
        dispatch(addUserError('Error while adding user'));
      })
  )
);

export const signIn = userData => (
  dispatch => (
    axios.post(`${apiBaseURL}/login`, {
      email: userData.email,
      password: userData.password,
    })
      .then((response) => {
        console.log('response===?' + JSON.stringify(response))
        dispatch(signInSuccess(response.data));
      })
      .catch((err) => {
        console.log('ERRO===?' + JSON.stringify(err))
        dispatch(signInError('Error while sign in'));
      })
  )
);

export const signInWithOwner = userData => (
  dispatch => (
    axios.post(`${apiBaseURL}/loginowner`, {
      email: userData.email,
      password: userData.password,
    })
      .then((response) => {
        dispatch(signInSuccess(response.data));
      })
      .catch(() => {
        dispatch(signInError('Error while sign in'));
      })
  )
);

export const addParking = data => (
  dispatch => (
    axios.post(`${apiBaseURL}/AddParking`, {
      name: data.name,
      description: data.description,
      phone_number: data.phone_number,
      amount: data.amount,
      address_line1: data.address_line1,
      location: data.location,
      from: data.from,
      to: data.to,
      lat: data.lat,
      long: data.long,
      message: data.message,
      owner: data.email,
    })
      .then((response) => {
        console.log('RESPONSE ADD --->' + JSON.stringify(response.data));
        dispatch(addParkingSuccess(response.data));
      })
      .catch(() => {
        dispatch(addParkingError('Error while adding parking details'));
      })
  )
);

export const editParking = data => (
  dispatch => (
    axios.put(`${apiBaseURL}/UpdateParking?ID=${data.id}`, {
      name: data.name,
      description: data.description,
      phone_number: data.phone_number,
      amount: data.amount,
      address_line1: data.address_line1,
      location: data.location,
      from: data.from,
      to: data.to,
      lat: data.lat,
      long: data.long,
      message: data.message,
      owner: data.email,
    })
      .then((response) => {
        console.log('RESPONSE EDIT --->' + JSON.stringify(response.data));
        dispatch(editParkingSuccess(response.data));
      })
      .catch(() => {
        dispatch(editParkingError('Error while edit parking details'));
      })
  )
);

export const getParkingList = () => (
  dispatch => (
    axios.get(`${apiBaseURL}/getAllParkings`, {
    })
      .then((response) => {
        dispatch(getParkingListSuccess(response.data));
      })
      .catch(() => {
        dispatch(getParkingListError('could not get parking list'));
      })
  )
);

export const addVehicle = data => (
  dispatch => (
    axios.post(`${apiBaseURL}/addvehicle`, {
      email: data.email,
      license_num: data.license_num,
      nickname: data.nickname,
    })
      .then((response) => {
        console.log('ADD--->' + JSON.stringify(response));
        dispatch(addVehicleSuccess(response.data));
      })
      .catch(() => {
        dispatch(addVehicleError('Error while adding vehicle details'));
      })
  )
);

export const getUserVehicle = (email) => (
  dispatch => (
    axios.get(`${apiBaseURL}/getUserVehicles?email=${email}`, {
    })
      .then((response) => {
        dispatch(getUserVehicleSuccess(response.data));
      })
      .catch(() => {
        dispatch(getUserVehicleError('could not get user vehicle list'));
      })
  )
);

export const bookParking = data => (
  dispatch => (
    axios.post(`${apiBaseURL}/bookparking`, {
      email: data.email,
      parking_id: data.parking_id,
      from: data.from,
      to: data.to,
      location: data.location,
    })
      .then((response) => {
        dispatch(bookParkingSuccess(response.data));
      })
      .catch(() => {
        dispatch(bookParkingError('Error while booking parking'));
      })
  )
);

export const getUserBookings = (email) => (
  dispatch => (
    axios.get(`${apiBaseURL}/getUserBookings?email=${email}`, {
    })
      .then((response) => {
        console.log('RESPONSE---->' + JSON.stringify(response.data))
        dispatch(getUserBookingSuccess(response.data));
      })
      .catch((error) => {
        console.log('ERR---->' + JSON.stringify(error))
        dispatch(getUserBookingError('could not get user bookings'));
      })
  )
);

export const addUsaEpay = () => (
  dispatch => (
    axios.post(`https://sandbox.usaepay.com/api/v2/transactions`, {
      'command': 'cc:sale',
      'amount': "5.00",
      'amount_detail': {
          'tax': '1.00',
          'tip': '0.50',
      },
      'creditcard': {
          'cardholder': 'John doe',
          'number': '4000100011112224',
          'expiration': '0919',
          'cvc': '123',
          'avs_street': '1234 Main',
          'avs_zip': '12345'
      },
      'invoice': '12356'
    }, {
      headers: headers
    })
      .then((response) => {
        console.log('PAYMENT SUCCESS---->' + JSON.stringify(response))
        dispatch(addPaymentSuccess(response.data));
      })
      .catch((error) => {
        console.log('ERR---->' + JSON.stringify(error))
      })
    )
);

export const getOwnerParking = (email) => (
  dispatch => (
    axios.get(`${apiBaseURL}/getParkingByOwner?ID=${email}`, {
    })
      .then((response) => {
        console.log('OWNER SCCESS--->' + JSON.stringify(response));
        dispatch(getOwnerParkingSuccess(response.data));
      })
      .catch((error) => {
        console.log('OWNER ERRO--->' + JSON.stringify(error));
        dispatch(getOwnerParkingError('could not get owners parking list'));
      })
  )
);