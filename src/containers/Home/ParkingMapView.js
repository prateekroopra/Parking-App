import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import CustomMarker from '../CustomMarker';

// lot 25 coords
const lot25 = {
  latitude: 33.2091237,
  longitude: -97.1502889,
};

// lot 1, 2, 3 coords
const lot123 = {
  latitude: 33.2115122,
  longitude: -97.1494314,
};

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
          latitude: 33.2091237,
          longitude: -97.1502889,
        }
      },
      userType: undefined,
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

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ location });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  onMapPress(e) {
    this.setState({
      coordinate: e.nativeEvent.coordinate
    });
  }

  render() {
    return (
      this.state.userType != undefined && this.state.userType === 'Parking Owner'
       ? (
          <MapView
            style={{ flex: 1 }}
            onPress={(e) => this.onMapPress(e)}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
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
            style={{ flex: 1 }}
            initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.0080,
              longitudeDelta: 0.0080,
            }}
          >
            <MapView.Marker
              key={1}
              coordinate={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
              }}
              onPress={() => this.props.navigation.navigate('SelectTime')}
            >
              <CustomMarker lot={'Lot 25'} />
            </MapView.Marker>
            <MapView.Marker
              coordinate={{
                latitude: this.state.location.coords.latitude + 0.000001,
                longitude: this.state.location.coords.longitude + 1.000001,
              }}
              onPress={() => this.props.navigation.navigate('SelectTime')}
            >
              <CustomMarker lot={'Lot 1, 2, 3'} />
            </MapView.Marker>
          </MapView>
       )
    );
  }
}

ParkingMapView.propTypes = {
  navigation: PropTypes.object.isRequired,
};

module.exports = ParkingMapView;
