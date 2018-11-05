import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, View, Text, Alert } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CustomMarker from '../../CustomMarker';

class ParkingMapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinate: {
        latitude: 0.00,
        longitude: 0.00,
      },
      location: {
        coords: {
          latitude: 0.00,
          longitude: 0.00,
        }
      },
      searchLocation: undefined,
      userType: undefined,
      arrParking: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('userType').then((value) => {
      if (value != null) {
        this.setState({ userType: value })
      }
    }).done();
    this.getLocationAsync();
  }

  async getAllParkingList(location) {
    const { 
      getParkingList,
    } = this.props;
  
    getParkingList().then(() => {
      const { parkingList } = this.props;
      if (parkingList.error === 0) {
        console.log('PArking List--->' + JSON.stringify(parkingList.data))
        this.setState({ arrParking: parkingList.data, location });
      } else {
        Alert.alert('Alert', parkingList.data);
        this.setState({ error: parkingList.data, location });
      }
    })
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ location });
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    // this.setState({ location });
    this.getAllParkingList(location);
  };

  onMapPress(e) {
    this.setState({
      coordinate: e.nativeEvent.coordinate
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.userType != undefined && this.state.userType === 'Parking Owner'
        ? (
            <MapView
              key={ this.state.searchLocation !== undefined ? this.state.searchLocation.lat : this.state.location.coords.latitude}
              // key={this.state.location.coords.latitude}
              style={{ flex: 1 }}
              onPress={(e) => this.onMapPress(e)}
              region={{
                // latitude: this.state.location.coords.latitude,
                // longitude: this.state.location.coords.longitude,
                latitude: this.state.searchLocation !== undefined ? this.state.searchLocation.lat : this.state.location.coords.latitude,
                longitude: this.state.searchLocation !== undefined ? this.state.searchLocation.lng : this.state.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              <MapView.Marker
                onPress={() => this.props.navigation.navigate('ParkingDetailsForm', { coords: this.state.coordinate })}
                coordinate={this.state.coordinate}
              >
                <CustomMarker lot={'Add Parking Spot'} />
              </MapView.Marker>
            </MapView>
        ) : (
            <MapView
              key={ this.state.searchLocation !== undefined ? this.state.searchLocation.lat : this.state.location.coords.latitude}
              // provider={MapView.PROVIDER_GOOGLE}
              style={{ flex: 1 }}
              initialRegion={{
                latitude: this.state.searchLocation !== undefined ? this.state.searchLocation.lat : this.state.location.coords.latitude,
                longitude: this.state.searchLocation !== undefined ? this.state.searchLocation.lng : this.state.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {this.state.arrParking.map((item, i) => {
                  return (<MapView.Marker
                    key={i}
                    coordinate={{
                      latitude: parseFloat(item.lat),
                      longitude: parseFloat(item.long),
                    }}
                    onPress={() => this.props.navigation.navigate('SelectTime', { parkingID: item.ID, location: item.location })}
                  >
                    <CustomMarker lot={`$${item.amount}`} />
                  </MapView.Marker>)
              })}
              {/* <MapView.Marker
                key={1}
                coordinate={{
                  latitude: 1.3142337351723796,
                  longitude: 103.84271994087733,
                }}
                onPress={() => this.props.navigation.navigate('SelectTime', { parkingID: '2' })}
              >
                <CustomMarker lot={'$20'} />
              </MapView.Marker> */}
              {/* <MapView.Marker
                coordinate={{
                  latitude: this.state.location.coords.latitude + 0.000001,
                  longitude: this.state.location.coords.longitude + 0.01960,
                }}
                onPress={() => this.props.navigation.navigate('SelectTime', { parkingID: '2' })}
              >
                <CustomMarker lot={'$15'} />
              </MapView.Marker> */}
            </MapView>
        )
        }

        <View style={{ position: 'absolute', width: '100%' }}>
          <GooglePlacesAutocomplete
            placeholder='Location'
            autoFocus={false}
            returnKeyType={'search'}
            fetchDetails={true}
            listViewDisplayed={false}
            renderDescription={row => row.description}
            onPress={(data, details = null) => {
              console.log('DETAILS---->' + JSON.stringify(details));
              if (details && details.geometry && details.geometry.location) {
                this.setState({ searchLocation: details.geometry.location })
              }
            }}
            getDefaultValue={() => ''}
            query={{
              key: 'AIzaSyCYQHauEaqFsGItbv4ZyHBGWm2FDxsF2nQ',
              language: 'en',
              // types: '(cities)'
            }}
            styles={{
              container: {
                backgroundColor: 'transparent',
              },
              listView: {
                backgroundColor: 'white'
              },
              textInputContainer: {
                backgroundColor: 'rgba(25, 73, 165, 1)',
                borderTopWidth: 0,
                borderBottomWidth:0,
                height: 80,
                width: '100%',
              },
              textInput: {
                marginLeft: 10,
                marginRight: 10,
                height: 40,
                backgroundColor: 'white',
                marginTop: 30,
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
        </View>
      </View>
    );
  }
}

ParkingMapView.propTypes = {
  navigation: PropTypes.object.isRequired,
  getParkingList: PropTypes.func.isRequired,
  parkingList: PropTypes.object.isRequired,
};

export default ParkingMapView;
