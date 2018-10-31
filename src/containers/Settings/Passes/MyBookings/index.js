import { connect } from 'react-redux';
import { getUserBookings } from '../../../../store/actions/users';
import Passes from './Passes';

const matchStateToProps = state => ({
  bookingList: state.users.bookingList,
});

const matchDispatchToProps = dispatch => ({
  getUserBookings: data => dispatch(getUserBookings(data)),
});

export default connect(matchStateToProps, matchDispatchToProps)(Passes)
