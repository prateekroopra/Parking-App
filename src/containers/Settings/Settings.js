import _ from "lodash";
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
import Payment from '../../images/payment.png';
import User from '../../images/user.png';
import Vehicle from '../../images/vehicle.png';
import Passes from '../../images/parking_road.png';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userType: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('userType').then((value) => {
      if (value != null) {
        this.setState({ userType: value })
      }
    }).done();

    AsyncStorage.getItem('email').then((value) => {
      if (value !== null) {
        this.setState({ email: value })
      }
    })
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
        />

        <View elevation={5} style={styles.topContainer}>
          <Text style={styles.signInText}>
            You are signed in as
          </Text>

          <Text style={styles.userText}>
            {this.state.email.toUpperCase()}
          </Text>

          <TouchableOpacity
            onPress={() => {
              AsyncStorage.removeItem('userType');
              this.props.navigation.navigate('Index');
            }}
          >
            <Text style={styles.signOut}>
              SIGN OUT
            </Text>
          </TouchableOpacity>
        </View>

        <View elevation={2} style={[styles.cardView, { marginTop: 30 }]}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { this.props.navigation.navigate('MyProfile'); }}
          >
            <Image
              style={styles.icon}
              source={User}
            />

            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                MY PROFILE
              </Text>
            </View>
          </TouchableOpacity>
        </View>
            
        {this.state.userType === 'Parking Finder' &&
        <View>
        <View elevation={2} style={styles.cardView}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { this.props.navigation.navigate('MyVehicles'); }}
          >
            <Image
              style={styles.icon}
              source={Vehicle}
            />

            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                MY VEHICLES
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View elevation={2} style={styles.cardView}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { this.props.navigation.navigate('Passes'); }}
          >
            <Image
              style={styles.icon}
              source={Passes}
            />

            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                Free Parking
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View elevation={2} style={styles.cardView}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { this.props.navigation.navigate('Payment'); }}
          >
            <Image
              style={styles.icon}
              source={Payment}
            />

            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                PAYMENT METHOD
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View elevation={2} style={styles.cardView}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { this.props.navigation.navigate('Payment'); }}
          >
            <Image
              style={styles.icon}
              source={Payment}
            />

            <View style={styles.textContainer}>
              <Text style={styles.buttonText}>
                BUSINESS PROFILE
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
      }
    </ScrollView>
    );
  }
}
    
const styles = StyleSheet.create({
  icon: {
    marginLeft: 30,
    width: 30,
    height: 30,
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
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
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgba(67,88,102, 1)',
    fontWeight: 'bold',
    marginLeft: 30,
  },
  signOut: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signInText: {
    fontSize: 16,
    marginTop: 10,
  },
  userText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 4,
    marginLeft: 40,
    marginRight: 40,
    paddingVertical: 15,
    backgroundColor: 'rgba(25, 73, 165, 1)',
  }
});
    
Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

module.exports = Settings;
