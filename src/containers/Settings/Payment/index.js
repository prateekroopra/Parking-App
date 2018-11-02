import { connect } from 'react-redux';
import { addUsaEpay } from '../../../store/actions/users';
import Payment from './Payment';

const matchStateToProps = state => ({
  payment: state.users.payment,
});

const matchDispatchToProps = dispatch => ({
  addUsaEpay: () => dispatch(addUsaEpay()),
});

export default connect(matchStateToProps, matchDispatchToProps)(Payment)
