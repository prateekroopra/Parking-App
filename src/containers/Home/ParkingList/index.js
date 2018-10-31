import { connect } from 'react-redux';
import { getParkingList } from '../../../store/actions/users';
import ParkingMapView from './ParkingMapView';

const matchStateToProps = state => ({
  parkingList: state.users.parkingList,
});

const matchDispatchToProps = dispatch => ({
  getParkingList: () => dispatch(getParkingList()),
});

export default connect(matchStateToProps, matchDispatchToProps)(ParkingMapView)
