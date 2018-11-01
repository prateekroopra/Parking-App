import { connect } from 'react-redux';
import { bookParking } from '../../../store/actions/users';
import TimeSummary from './TimeSummary';

const matchStateToProps = state => ({
  bookParkingData: state.users.bookParking,
});

const matchDispatchToProps = dispatch => ({
  bookParking: data => dispatch(bookParking(data)),
});

export default connect(matchStateToProps, matchDispatchToProps)(TimeSummary)
