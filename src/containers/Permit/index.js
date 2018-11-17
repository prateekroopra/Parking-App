import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  AsyncStorage,
  ScrollView,
  Image,
} from 'react-native';

class Permit extends React.Component {
  render() {
    return (
      <ScrollView style={styles.scrollview}>
        <StatusBar
          barStyle="light-content"
        />

        <View elevation={2} style={styles.cardView}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                Home Permit
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View elevation={2} style={styles.cardView}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                Work Permit
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View elevation={2} style={styles.cardView}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                Current Permit
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View elevation={2} style={styles.cardView}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                Favorites Permit
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View elevation={2} style={styles.cardView}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                History Permit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    height: '100%',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgba(67,88,102, 1)',
    fontWeight: 'bold',
    marginLeft: 30,
    fontSize: 12,
  },
});
    
Permit.propTypes = {
  navigation: PropTypes.object.isRequired,
};
      
module.exports = Permit;
