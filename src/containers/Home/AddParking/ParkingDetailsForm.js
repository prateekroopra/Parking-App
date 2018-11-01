import _ from 'lodash';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { ImagePicker } from 'expo';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import { TextField } from 'react-native-material-textfield';
import DatePicker from 'react-native-datepicker';
import { Loading } from '../../../utils/Loading';
import AddParking from '../../../images/AddParking.png';

Geocoder.init('AIzaSyCYQHauEaqFsGItbv4ZyHBGWm2FDxsF2nQ');

class ParkingDetailsForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      phoneNumber: '',
      amount: '',
      address_line: '',
      location: '',
      from: '',
      to: '',
      image: null,
      loading: false,
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const coords = params ? params.coords : undefined;

    Geocoder.from(coords.latitude, coords.longitude)
    .then(json => {
      var addressComponent = json.results[0].formatted_address;
        this.setState({ location: addressComponent });
    })
    .catch(error => console.log(error));
  }

  onFromTimeChange(time) {
    this.setState({ from: time });
  }

  onToTimeChange(time) {
    this.setState({ to: time });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  onSubmit = () => {
    const { 
      addParking,
    } = this.props;

    const {
      name,
      description,
      phoneNumber,
      amount,
      address_line,
      location,
      from,
      to,
    } = this.state;

    console.log('ADD PARKING--->' + JSON.stringify(location))

    if (_.isEmpty(name) ||
        _.isEmpty(description) || 
        _.isEmpty(phoneNumber) || 
        _.isEmpty(amount) ||
        _.isEmpty(address_line) || 
        _.isEmpty(location) || 
        _.isEmpty(from) ||
        _.isEmpty(to)
    ) {
      Alert.alert('Alert','Please fill all required fields.');
    } else {
      this.setState({ loading: true });
      const { params } = this.props.navigation.state;
      const coords = params ? params.coords : undefined;
      const payload = {
        name: name,
        description: description,
        phone_number: phoneNumber,
        amount: amount,
        address_line1: address_line,
        location: location,
        from: from,
        to: to,
        lat: coords.latitude,
        long: coords.longitude,
      };
      console.log('ADD PARKING--->' + JSON.stringify(payload))
      addParking(payload).then(() => {
        const { parking } = this.props;
        if (parking.error === 0) {
          this.setState({ loading: false }, () => this.props.navigation.navigate('ConfirmationScreen'));
        } else {
          Alert.alert('Alert', parking.data);
          this.setState({ error: parking.data, loading: false });
        }
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />

        {this.state.loading
          ? (
            <Loading size={'large'}/>
          ) : null
        }

        <ScrollView style={styles.scrollview}>
          <View style={{ margin: 20, height: 120, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={this.pickImage}
            >
              {this.state.image
                ? <Image source={{ uri: this.state.image }} style={styles.image} />
                : <Image style={styles.image} source={AddParking} />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.formInner}>
            <TextField
              label="Name"
              returnKeyType="next"
              style={styles.formInput}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={() => this.descriptionInput.focus()}
              underlineColorAndroid="transparent"
              onChangeText={(name) => { this.setState({ name }) }}
              value={this.state.name}
            />
            <TextField
              label="Description"
              returnKeyType="next"
              style={styles.formInput}
              autoCapitalize="none"
              autoCorrect={false}
              ref={(input) => this.descriptionInput = input}
              onSubmitEditing={() => this.phoneInput.focus()}
              underlineColorAndroid="transparent"
              onChangeText={(description) => { this.setState({ description }) }}
              value={this.state.description}
            />
            <TextField
              label="Phone Number"
              returnKeyType="next"
              keyboardType="numeric"
              style={styles.formInput}
              ref={(input) => this.phoneInput = input}
              underlineColorAndroid="transparent"
              onSubmitEditing={() => this.amountInput.focus()}
              onChangeText={(phoneNumber) => { this.setState({ phoneNumber }) }}
              value={this.state.phoneNumber}
            />

            <TextField
              label="Amount"
              returnKeyType="next"
              keyboardType="numeric"
              style={styles.formInput}
              ref={(input) => this.amountInput = input}
              onSubmitEditing={() => this.addressInput.focus()}
              underlineColorAndroid="transparent"
              onChangeText={(amount) => { this.setState({ amount }) }}
              value={this.state.amount}
            />
            
            <TextField
              label="Address Line 1"
              returnKeyType="next"
              style={styles.formInput}
              ref={(input) => this.addressInput = input}
              underlineColorAndroid="transparent"
              onChangeText={(address_line) => { this.setState({ address_line }) }}
              value={this.state.address_line}
            />

            <GooglePlacesAutocomplete
              key={this.state.location}
              placeholder='Location'
              autoFocus={false}
              returnKeyType={'default'}
              fetchDetails={true}
              listViewDisplayed='auto'
              renderDescription={row => row.description}
              onPress={(data, details = null) => {
                console.log(data, details);
              }}
              getDefaultValue={() => this.state.location}
              query={{
                key: 'AIzaSyCYQHauEaqFsGItbv4ZyHBGWm2FDxsF2nQ',
                language: 'en',
                types: '(cities)'
              }}
              styles={{
                listView: {
                  // position: 'absolute',
                  // padding: 10,
                  // height: 500,
                  // marginTop: 50,
                  // width: 500
                },
                textInputContainer: {
                  backgroundColor: 'transparent',
                  borderTopWidth: 0,
                  borderBottomColor: 'grey',
                  borderBottomWidth: 0.5,
                  marginTop: 10,
                },
                textInput: {
                  marginLeft: -10,
                  marginRight: 0,
                  marginTop: 3,
                  height: 40,
                  backgroundColor: 'transparent',
                  marginBottom: 20,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
              }}
              currentLocation={false}
              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch'
              GooglePlacesSearchQuery={{
                rankby: 'distance',
                types: 'food'
              }}
              debounce={200}
            />

            <View style={styles.timepickerContainer}>
              <DatePicker
                ref={(datepicker) => { this.from = datepicker; }}
                date={this.state.from}
                mode="datetime"
                style={styles.timePickerBox}
                placeholder="From"
                format={'MMM D, YYYY LT'}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderColor: 'transparent',
                    borderWidth: 0.0,
                    alignItems: 'flex-start',
                    color: 'red'
                  },
                  btnTextConfirm: {
                    color: '#7dd3d5',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  btnTextCancel: {
                    color: 'black',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  dateText: {
                    alignItems: 'flex-start',
                  },
                  placeholderText: {
                    color: 'rgba(169, 169, 169, 1)',
                    fontSize: 16,
                  },
                }}
                onDateChange={(time) => { this.onFromTimeChange(time); }}
              />

              <View style={styles.seperator} />
            </View>

            <View style={styles.timepickerContainer}>
              <DatePicker
                ref={(datepicker) => { this.to = datepicker; }}
                date={this.state.to}
                mode="datetime"
                style={styles.timePickerBox}
                placeholder="To"
                format={'MMM D, YYYY LT'}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderColor: 'transparent',
                    borderWidth: 0.0,
                    alignItems: 'flex-start',
                  },
                  btnTextConfirm: {
                    color: '#7dd3d5',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  btnTextCancel: {
                    color: 'black',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  dateText: {
                    alignItems: 'flex-start',
                  },
                  placeholderText: {
                    color: 'rgba(169, 169, 169, 1)',
                    fontSize: 16,
                  },
                }}
                onDateChange={(time) => { this.onToTimeChange(time); }}
              />

              <View style={styles.seperator} />
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onSubmit}
            >
              <Text style={styles.buttonText}>
                SUBMIT
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
  image: {
    width: 120,
    height: 120,
  },
  formInput: {
    fontSize: 18,
  },
  formInner: {
    padding: 20,
    paddingTop: 0,
  },
  buttonContainer: {
    marginTop: 50,
    paddingVertical: 15,
    backgroundColor: 'rgba(25, 73, 165, 1)',
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  timePickerBox: {
    color: 'black',
    width: '100%',
  },
  seperator: {
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height: 1,
    width: '100%',
    marginTop: 0,
    marginBottom: 10,
  },
  timepickerContainer: {
    marginTop: 20,
  },
});

ParkingDetailsForm.propTypes = {
  addParking: PropTypes.func.isRequired,
  parking: PropTypes.object.isRequired,
};

export default ParkingDetailsForm;