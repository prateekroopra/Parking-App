import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyCYQHauEaqFsGItbv4ZyHBGWm2FDxsF2nQ');

class ParkingDetailsForm extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />

        <View style={styles.formInner}>
          <TextInput
            placeholder="Name"
            returnKeyType="next"
            style={styles.formInput}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => this.phoneInput.focus()}
            underlineColorAndroid="transparent"
          />
          <TextInput
            placeholder="Phone Number"
            returnKeyType="next"
            keyboardType="numeric"
            style={styles.formInput}
            ref={(input) => this.phoneInput = input}
            onSubmitEditing={() => this.addressInput.focus()}
            underlineColorAndroid="transparent"
          />
          
          <TextInput
            placeholder="Address Line 1"
            returnKeyType="next"
            style={styles.formInput}
            ref={(input) => this.addressInput = input}
            onSubmitEditing={() => this.locationInput.focus()}
            underlineColorAndroid="transparent"
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
              },
              textInput: {
                marginLeft: 0,
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

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.props.navigation.navigate('ConfirmationScreen')
            }}
          >
            <Text style={styles.buttonText}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  formInput: {
    height: 40,
    // backgroundColor: '#f4f4f4',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 10
  },
  formInner: {
    padding: 20
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
});

module.exports = ParkingDetailsForm;
