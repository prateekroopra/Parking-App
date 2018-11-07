import { connect } from 'react-redux';
import { getOwnerParking } from '../../../store/actions/users';
import Rental from './Rental';

const matchStateToProps = state => ({
  ownerParkingList: state.users.ownerParkingList,
});

const matchDispatchToProps = dispatch => ({
  getOwnerParking: data => dispatch(getOwnerParking(data)),
});

export default connect(matchStateToProps, matchDispatchToProps)(Rental)
