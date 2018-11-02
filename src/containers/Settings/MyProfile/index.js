import _ from "lodash";
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      confirmPassword: '',
      newPassword: '',
      changePwdVisible: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('email').then((value) => {
      if (value !== null) {
        this.setState({ email: value })
      }
    })

    AsyncStorage.getItem('full_name').then((value) => {
      if (value !== null) {
        this.setState({ fullName: value })
      }
    })

    AsyncStorage.getItem('phone_number').then((value) => {
      if (value !== null) {
        this.setState({ phoneNumber: value })
      }
    })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView style={styles.scrollview}>
          <StatusBar
            barStyle="light-content"
          />

          <View style={styles.formInner}>
            <TextField
              label="Email Address"
              returnKeyType="next"
              style={styles.formInput}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              onChangeText={(email) => { this.setState({ email }); }}
              value={this.state.email}
              editable={false}
            />

            <TextField
              ref={(input) => this.nameInput = input}
              label="Full Name"
              returnKeyType="next"
              style={styles.formInput}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={() => this.phoneInput.focus()}
              underlineColorAndroid="transparent"
              onChangeText={(fullName) => { this.setState({ fullName }); }}
              value={this.state.fullName}
            />

            <TextField
              label="Phone Number"
              returnKeyType="next"
              keyboardType="numeric"
              style={styles.formInput}
              ref={(input) => this.phoneInput = input}
              underlineColorAndroid="transparent"
              value={this.state.phoneNumber}
              onChangeText={(phoneNumber) => { this.setState({ phoneNumber }); }}
              validatePhoneNumber
            />

            <TouchableOpacity
              style={styles.changePwdbuttonContainer}
              onPress={() => {
                this.setState({ changePwdVisible: !this.state.changePwdVisible })
              }}
            >
              <Text style={styles.changePwdButtonText}>
                {this.state.changePwdVisible ? 'Cancel' : 'Change Password' }
              </Text>
            </TouchableOpacity>

            {this.state.changePwdVisible
              ? (
                <View>
                  <TextField
                    ref={(input) => this.newPwdInput = input}
                    label="New Password"
                    returnKeyType="next"
                    secureTextEntry
                    style={styles.formInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.confirmPwdInput.focus()}
                    underlineColorAndroid="transparent"
                    onChangeText={(newPassword) => { this.setState({ newPassword }); }}
                    value={this.state.newPassword}
                  />

                  <TextField
                    ref={(input) => this.confirmPwdInput = input}
                    label="Confirm Password"
                    returnKeyType="next"
                    secureTextEntry
                    style={styles.formInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    onChangeText={(confirmPassword) => { this.setState({ confirmPassword }); }}
                    value={this.state.confirmPassword}
                  />
                </View>
              ) : (
                <TextField
                  ref={(input) => this.passwordInput = input}
                  label="Password"
                  returnKeyType="next"
                  secureTextEntry
                  style={styles.formInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  onChangeText={(password) => { this.setState({ password }); }}
                  // value={this.state.password}
                  value="123456"
                  editable={false}
                />
              )
            }

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
              }}
            >
              <Text style={styles.buttonText}>
                SAVE
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  scrollview: {
    backgroundColor: 'white'
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
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  changePwdbuttonContainer: {
    marginTop: 20,
  },
  changePwdButtonText: {
    textAlign: 'right',
    color: 'blue',
    fontWeight: '700',
    fontSize: 18,
  },
});

MyProfile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

module.exports = MyProfile;
