import _ from "lodash";
import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  ScrollView,
  Switch,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

class AddVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      license: '',
      nickName: '',
      isMainRide: false,
      SwitchOnValueHolder: false,
    };
  }

  ShowAlert = (value) => {
    this.setState({
      SwitchOnValueHolder: value,
    });
  }

  render() {
    return (
      <ScrollView style={styles.scrollview}>
        <StatusBar
          barStyle="light-content"
        />

        <View style={styles.formInner}>
          <TextField
            label="License Plate Number"
            returnKeyType="next"
            style={styles.formInput}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => this.nickNameInput.focus()}
            underlineColorAndroid="transparent"
            value={this.state.license}
          />

          <TextField
            label="Nickname (optional)"
            returnKeyType="go"
            secureTextEntry
            style={styles.formInput}
            ref={(input) => this.nickNameInput = input}
            underlineColorAndroid="transparent"
            // onChangeText={(text) => { }}
            value={this.state.nickName}
          />

          <View style={styles.switchContainer}>
            <Switch
              onValueChange={value => this.ShowAlert(value)}
              value={this.state.SwitchOnValueHolder}
            />

            <Text style={styles.txt}>This is my main ride.</Text>
          </View>

          <Text style={styles.subText}>
            Make sure the vehicle you're parking matches
            your booking or you could be towed.
          </Text>

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
    );
  }
}
    
const styles = StyleSheet.create({
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
    fontSize: 18,
  },
  buttonContainer: {
    paddingVertical: 15,
    backgroundColor: 'rgba(25, 73, 165, 1)',
    borderRadius: 4,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  subText: {
    fontSize: 18,
    color: 'grey',
    marginTop: 20,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  txt: {
    color: 'grey',
    fontSize: 20,
    marginLeft: 10,
    width: '82%',
  },
});
    
AddVehicle.propTypes = {
  navigation: PropTypes.object.isRequired,
};

module.exports = AddVehicle;
