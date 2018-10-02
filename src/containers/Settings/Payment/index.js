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
import { FloatingAction } from 'react-native-floating-action';
import GooglePay from '../../../images/googlepay.png';
import Paypal from '../../../images/paypal.png';

const actions = [{
  text: 'PAYPAL',
  icon: require('../../../images/paypal_round.png'),
  name: 'bt_paypal',
  position: 1,
  color: 'white',
}, {
  text: 'BUSINESS PROFILE',
  icon: require('../../../images/bussines_profile.png'),
  name: 'bt_business',
  position: 2,
  color: 'rgba(61, 87, 103, 1)',
}, {
  text: 'CREDIT CARD',
  icon: require('../../../images/credit_card.png'),
  name: 'bt_creditCard',
  position: 3,
  color: 'rgba(0, 168, 230, 1)',
}];

class Payment extends React.Component {
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

        <View>
          <View elevation={3} style={[styles.cardView, { marginTop: 30 }]}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => { }}
            >
              <Image
                style={{ width: 100, height: 50 }}
                source={GooglePay}
              />

              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>
                  GOOGLE PAY
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View elevation={3} style={[styles.cardView, { marginTop: 20 }]}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => { }}
            >
              <Image
                style={{ width: 100, height: 50 }}
                source={Paypal}
              />

              <View style={styles.textContainer}>
                <Text style={styles.buttonText}>
                  PAYPAL
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <FloatingAction
          ref={(ref) => { this.floatingAction = ref; }}
          actions={actions}
          onPressItem={() => {
            
          }}
        />
    </ScrollView>
    );
  }
}
    
const styles = StyleSheet.create({
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
  buttonContainer: {
    // paddingVertical: 20,
    flexDirection: 'row',
    display: 'flex',
    padding: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 30,
    fontSize: 16,
    marginTop: 5,
  },
});

Payment.propTypes = {
  navigation: PropTypes.object.isRequired,
};

module.exports = Payment;
