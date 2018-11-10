import { connect } from 'react-redux';
import { addParking, editParking } from '../../../store/actions/users';
import ParkingDetailsForm from './ParkingDetailsForm';

const matchStateToProps = state => ({
  parking: state.users.parking,
  editParkingData: state.users.editParking,
});

const matchDispatchToProps = dispatch => ({
  addParking: data => dispatch(addParking(data)),
  editParking: data => dispatch(editParking(data)),
});

export default connect(matchStateToProps, matchDispatchToProps)(ParkingDetailsForm)
