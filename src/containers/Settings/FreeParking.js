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
  Image,
} from 'react-native';

class FreeParking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }} style={styles.scrollview}>
        <StatusBar
          barStyle="light-content"
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
          }}
        >
          <Text style={styles.buttonText}>
            SHARE APP
          </Text>
        </TouchableOpacity>
    </ScrollView>
    );
  }
}
    
const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 15,
    backgroundColor: 'rgba(25, 73, 165, 1)',
    borderRadius: 4,
    margin: 50,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  cardView: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
  },
  scrollview: {
    backgroundColor: 'white',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

FreeParking.propTypes = {
  navigation: PropTypes.object.isRequired,
};

module.exports = FreeParking;
