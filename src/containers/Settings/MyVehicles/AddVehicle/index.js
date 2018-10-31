import { connect } from 'react-redux';
import { addVehicle } from '../../../../store/actions/users';
import AddVehicle from './AddVehicle';

const matchStateToProps = state => ({
  vehicle: state.users.vehicle,
});

const matchDispatchToProps = dispatch => ({
  addVehicle: data => dispatch(addVehicle(data)),
});

export default connect(matchStateToProps, matchDispatchToProps)(AddVehicle)
