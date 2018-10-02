import _ from "lodash";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  AsyncStorage,
  ScrollView,
  Alert,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import RadioForm from 'react-native-simple-radio-button';
import Logo from '../../images/logo.png';
import MainApp from '../MainApp';
import { signInUser, registerUser } from '../../actions';

const USER_RADIO_PROPS = [
  { label: 'Parking Owner', value: 0 },
  { label: 'Parking Finder', value: 1 },
];

const RADIO_PROPS = [
  { label: 'Sign Up', value: 0 },
  { label: 'Sign In', value: 1 },
];


const Routes = {
  MainApp: {
    name: 'Stack in Tabs',
    description: 'testing stack in tabs after login page',
    screen: MainApp,
  },
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 0,
      type: 0,
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      error: '',
      loading: false,
      inputEmailError: '',
      inputPasswordError: '',
      inputfullNameError: '',
      inputphoneNumberError: '',
      signUpActive: true,
      signInActive: false,
    };
  }

  SignInClicked = (routeName) => {
    const {email, password} = this.state;
    if (_.isEmpty(email) || _.isEmpty(password)) {
      Alert.alert('Alert','Please fill all required fields.');
    } else {
      // this.setState({ loading: true });

      const payload = {
        email: email,
        password: password,
      };

      // this.props.signInUserMethod(payload);
      AsyncStorage.setItem('email', email);
      this.navigateToHomeScreen(routeName);
    }
  };

  SignUpClicked(routeName) {
    const {email, password, fullName, phoneNumber} = this.state;
    if (_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(fullName) || _.isEmpty(phoneNumber)) {
      Alert.alert('Alert','Please fill all required fields.');
    } else {
      // this.setState({ loading: true });
      const payload = {
        email: email,
        password: password,
        fullName: fullName,
        phoneNumber: phoneNumber,
      };

      // this.props.registerUserMethod(payload);
      AsyncStorage.setItem('email', email);
      this.navigateToHomeScreen(routeName);
    }
  };

  navigateToHomeScreen(routeName) {
    let userType = '';
    if (this.state.userType === 0) {
      userType = 'Parking Owner';
    } else {
      userType = 'Parking Finder';
    }
    AsyncStorage.setItem('userType', userType);
    const { path, params, screen } = Routes[routeName];
    const { router } = screen;
    const action = path && router.getActionForPathAndParams(path, params);
    this.props.navigation.navigate(routeName, { }, action);
  }

  validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      this.setState({
        inputEmailError: 'Please enter a valid email address.',
      });
    } else {
      this.setState({
        email,
        inputEmailError: '',
        errorMessage: '',
      });
    }
    this.setState({ email });
  }

  validateFullName(fullName) {
    if (!fullName) {
      this.setState({
        inputfullNameError: 'A full name is required',
      });
    } else {
      this.setState({
        fullName,
        inputfullNameError: '',
      });
    }
    this.setState({ fullName });
  }

  validatePassword(password) {
    if (!password) {
      this.setState({
        inputPasswordError: 'Password is required',
      });
    } else {
      this.setState({
        password: password,
        inputPasswordError: '',
      });
    }
    this.setState({ password });
  }

  validatePhoneNumber(phoneNumber) {
    if (!phoneNumber) {
      this.setState({
        inputphoneNumberError: 'Phone number is required',
      });
    } else {
      this.setState({
        phoneNumber: phoneNumber,
        inputphoneNumberError: '',
      });
    }
    this.setState({ phoneNumber });
  }

  render() {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <StatusBar
            barStyle="light-content"
          />

          <ScrollView style={styles.scrollview}>
            <View style={styles.logoContainer}>
              <Image
                style={{ width: 250, height: 220 }}
                source={Logo}
              />
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <TouchableOpacity
                style={this.state.signUpActive ? styles.activeButton : styles.inActiveButton}
                onPress={() => { this.setState({ type: 0, signUpActive: true, signInActive: false }); }}
              >
                <Text style={this.state.signUpActive ? styles.activeButtonText : styles.inActiveButtonText}>
                  SIGN UP
              </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={this.state.signInActive ? styles.activeButton : styles.inActiveButton}
                onPress={() => { this.setState({ type: 1, signUpActive: false, signInActive: true }); }}
              >
                <Text style={this.state.signInActive ? styles.activeButtonText : styles.inActiveButtonText}>
                  SIGN IN
              </Text>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.mainRadioContainer}>
              <RadioForm
                radio_props={RADIO_PROPS}
                initial={0}
                formHorizontal
                buttonColor='grey'
                style={styles.radioButton}
                buttonSize={12}
                animation={false}
                labelStyle={styles.radioTitle}
                onPress={(type) => { this.setState({ type }); }}
              />
            </View> */}

            {this.state.type === 0 
              ? (
                <View style={styles.formInner}>
                  <TextField
                    label="Email Address"
                    returnKeyType="next"
                    style={styles.formInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.nameInput.focus()}
                    underlineColorAndroid="transparent"
                    onChangeText={(email) => { this.validateEmail(email); }}
                    value={this.state.email}
                  />

                  <Text style={styles.helperText}>{this.state.inputEmailError}</Text>

                  <TextField
                    ref={(input) => this.nameInput = input}
                    label="Full Name"
                    returnKeyType="next"
                    style={styles.formInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    underlineColorAndroid="transparent"
                    onChangeText={(firstName) => { this.validateFullName(firstName); }}
                    value={this.state.fullName}
                  />

                  <Text style={styles.helperText}>{this.state.inputfullNameError}</Text>

                  <TextField
                    ref={(input) => this.passwordInput = input}
                    label="Password"
                    returnKeyType="next"
                    secureTextEntry
                    style={styles.formInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.phoneInput.focus()}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => { this.validatePassword(text); }}
                    value={this.state.password}
                  />

                  <Text style={styles.helperText}>{this.state.inputPasswordError}</Text>

                  <TextField
                    label="Phone Number"
                    returnKeyType="next"
                    keyboardType="numeric"
                    style={styles.formInput}
                    ref={(input) => this.phoneInput = input}
                    underlineColorAndroid="transparent"
                    value={this.state.phoneNumber}
                    onChangeText={(text) => { this.validatePhoneNumber(text); }}
                    validatePhoneNumber
                  />

                  <Text style={styles.helperText}>{this.state.inputPasswordError}</Text>

                  <View style={styles.radioContainer}>
                    <Text style={styles.radioText}>User Type:</Text>
                    <RadioForm
                      radio_props={USER_RADIO_PROPS}
                      initial={0}
                      formHorizontal
                      buttonColor='grey'
                      style={styles.radioButton}
                      buttonSize={12}
                      animation={false}
                      labelStyle={styles.radioTitle}
                      onPress={(userType) => { this.setState({ userType }); }}
                    />
                  </View>

                  {Object.keys(Routes).map((routeName: string) => (
                    <TouchableOpacity
                      key={routeName}
                      style={styles.buttonContainer}
                      onPress={() => {
                        this.SignUpClicked(routeName);
                      }}
                    >
                      <Text style={styles.buttonText}>
                        SIGN UP
                    </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.formInner}>
                  <TextField
                    label="Email Address"
                    returnKeyType="next"
                    style={styles.formInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    underlineColorAndroid="transparent"
                    onChangeText={(email) => { this.validateEmail(email); }}
                    value={this.state.email}
                  />

                  <Text style={styles.helperText}>{this.state.inputEmailError}</Text>

                  <TextField
                    label="Password"
                    returnKeyType="go"
                    secureTextEntry
                    style={styles.formInput}
                    ref={(input) => this.passwordInput = input}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => { this.validatePassword(text); }}
                    value={this.state.password}
                  />
                  
                  <View style={styles.radioContainer}>
                    <Text style={styles.radioText}>Login As:</Text>
                    <RadioForm
                      radio_props={USER_RADIO_PROPS}
                      initial={0}
                      formHorizontal
                      buttonColor='grey'
                      style={styles.radioButton}
                      buttonSize={12}
                      animation={false}
                      labelStyle={styles.radioTitle}
                      onPress={(userType) => { this.setState({ userType }); }}
                    />
                  </View>

                  {Object.keys(Routes).map((routeName: string) => (
                    <TouchableOpacity
                      key={routeName}
                      style={styles.buttonContainer}
                      onPress={() => {
                        this.SignInClicked(routeName);
                      }}
                    >
                      <Text style={styles.buttonText}>
                        SIGN IN
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
              )
            }
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
    
const styles = StyleSheet.create({
  activeButton: {
    paddingVertical: 15,
    backgroundColor: 'rgba(25, 73, 165, 1)',
    width: '50%',
  },
  activeButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  inActiveButton: {
    paddingVertical: 15,
    backgroundColor: '#f4f4f4',
    width: '50%',
  },
  inActiveButtonText: {
    textAlign: 'center',
    color: 'rgba(25, 73, 165, 1)',
    fontWeight: '700'
  },
  scrollview: {
    backgroundColor: 'white'
  },
  helperText: {
    color: 'red',
    // marginLeft: 10,
    // marginRight: 10,
    marginTop: 0,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  imageText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 25,
  },
  formInner: {
    padding: 20,
    backgroundColor: 'white',
  },
  formInput: {
    // height: 45,
    // backgroundColor: '#f4f4f4',
    // borderBottomColor: 'grey',
    // borderBottomWidth: 0.5,
    // marginBottom: 10,
    // paddingHorizontal: 10,
    fontSize: 18
  },
  buttonContainer: {
    paddingVertical: 15,
    backgroundColor: 'rgba(25, 73, 165, 1)',
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  mainRadioContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  radioText: {
    marginLeft: Platform.OS === 'ios' ? 5 : 10,
    width: Platform.OS === 'ios' ? 50 : 70,
    marginRight: Platform.OS === 'ios' ? 5 : 10,
    marginTop: 3,
  },
  radioTitle: {
    fontSize: 14,
    color: 'grey',
    paddingRight: 8,
  },
  radioButton: {
    marginRight: 10,
    marginBottom: 10,
  },
});
    
Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUserMethod: (payload) => dispatch(signInUser(payload)),
    registerUserMethod: (payload) => dispatch(registerUser(payload)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
