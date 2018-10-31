import { connect } from 'react-redux';
import { addParking } from '../../../store/actions/users';
import ParkingDetailsForm from './ParkingDetailsForm';

const matchStateToProps = state => ({
  parking: state.users.parking,
});

const matchDispatchToProps = dispatch => ({
  addParking: data => dispatch(addParking(data)),
});

export default connect(matchStateToProps, matchDispatchToProps)(ParkingDetailsForm)
