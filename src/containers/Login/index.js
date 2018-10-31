import { connect } from 'react-redux';
import { signIn, signInWithOwner, addUser, addRegisterOwnerUser } from '../../store/actions/users';
import Login from './Login';

const matchStateToProps = state => ({
  user: state.users.loginUserData,
  addUserData: state.users.addUserData,
});

const matchDispatchToProps = dispatch => ({
  signInWithFinder: data => dispatch(signIn(data)),
  signInWithOwner: data => dispatch(signInWithOwner(data)),
  addFinderUser: data => dispatch(addUser(data)),
  addRegisterOwnerUser: data => dispatch(addRegisterOwnerUser(data)),
});

export default connect(matchStateToProps, matchDispatchToProps)(Login)
