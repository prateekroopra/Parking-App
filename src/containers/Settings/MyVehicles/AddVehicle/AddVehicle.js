import _ from 'lodash';
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
  AsyncStorage,
  Alert,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Loading } from '../../../../utils/Loading';

class AddVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      license: '',
      nickName: '',
      email: '',
      isMainRide: false,
      SwitchOnValueHolder: false,
      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('email').then((value) => {
      if (value !== null) {
        this.setState({ email: value })
      }
    })
  }

  ShowAlert = (value) => {
    this.setState({
      SwitchOnValueHolder: value,
    });
  }

  onSubmit = () => {
    const { 
      addVehicle,
    } = this.props;

    const {
      license,
      nickName,
      email
    } = this.state;

    if (_.isEmpty(license) || _.isEmpty(nickName)) {
      Alert.alert('Alert','Please fill all required fields.');
    } else {
      this.setState({ loading: true });
      const payload = {
        license_num: license,
        nickname: nickName,
        email: email,
      };

      addVehicle(payload).then(() => {
        const { vehicle } = this.props;
        if (vehicle.error === 0) {
          this.setState({ loading: false }, () => this.props.navigation.goBack() );
        } else {
          Alert.alert('Alert', vehicle.message);
          this.setState({ error: vehicle.message, loading: false });
        }
      });
    }
  }

  render() {
    return (
      <ScrollView style={styles.scrollview}>
        <StatusBar
          barStyle="light-content"
        />

        {this.state.loading
          ? (
            <Loading size={'large'}/>
          ) : null
        }

        <View style={styles.formInner}>
          <TextField
            label="License Plate Number"
            returnKeyType="next"
            style={styles.formInput}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => this.nickNameInput.focus()}
            underlineColorAndroid="transparent"
            onChangeText={(license) => { this.setState({ license }) }}
            value={this.state.license}
          />

          <TextField
            label="Nickname (optional)"
            returnKeyType="go"
            style={styles.formInput}
            ref={(input) => this.nickNameInput = input}
            underlineColorAndroid="transparent"
            onChangeText={(nickName) => { this.setState({ nickName }) }}
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
            onPress={this.onSubmit}
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
  vehicle: PropTypes.object.isRequired,
  addVehicle: PropTypes.func.isRequired,
};

module.exports = AddVehicle;
