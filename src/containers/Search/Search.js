import React from 'react';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class Search extends React.Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Start by Searching Here'
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        listViewDisplayed='auto'
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        getDefaultValue={() => ''}
        query={{
          key: 'AIzaSyCYQHauEaqFsGItbv4ZyHBGWm2FDxsF2nQ',
          language: 'en',
          components: 'country:us'
          // types: '(cities)'
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
            borderBottomWidth:0,
            height: 60,
          },
          textInput: {
            marginLeft: 10,
            marginRight: 10,
            height: 40,
            backgroundColor: '#f4f4f4',
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
    )
  }
}

Search.propTypes = {
  navigation: PropTypes.object.isRequired,
};
      
module.exports = Search;
