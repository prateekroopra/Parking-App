import { connect } from 'react-redux';
import { getUserVehicle } from '../../../../store/actions/users';
import MyVehicles from './MyVehicles';

const matchStateToProps = state => ({
  VehicleList: state.users.VehicleList,
});

const matchDispatchToProps = dispatch => ({
  getUserVehicle: data => dispatch(getUserVehicle(data)),
});

export default connect(matchStateToProps, matchDispatchToProps)(MyVehicles)
