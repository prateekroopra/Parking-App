import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';


class CustomMarker extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text style={[styles.amount]}>{this.props.lot}</Text>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(25, 73, 165, 1)',
    padding: 2,
    borderRadius: 3,
    borderColor: 'rgba(25, 73, 165, 1)',
    borderWidth: 0.5,
    width: 100
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: 'rgba(25, 73, 165, 1)',
    alignSelf: 'center',
    marginTop: -9,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: 'rgba(25, 73, 165, 1)',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = CustomMarker;