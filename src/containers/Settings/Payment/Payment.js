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
  AsyncStorage,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { Loading } from '../../../utils/Loading';

const actions = [{
  text: 'UsaEpay',
  icon: require('../../../images/credit_card.png'),
  name: 'bt_creditCard',
  position: 3,
  color: 'rgba(0, 168, 230, 1)',
}];

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      paymentData: '',
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('payment_method').then((value) => {
      if (value !== null) {
        this.setState({ paymentData: value })
      }
    })
  }

  handleUsaEPayClick = () => {
    const { 
      addUsaEpay,
    } = this.props;
  
    this.setState({ loading: true });
    addUsaEpay().then(() => {
      this.setState({ loading: false });
      const { payment } = this.props;
      AsyncStorage.setItem('payment_method', payment.creditcard.number);
      this.setState({ paymentData: payment.creditcard.number });
      console.log('SUCCESS PAYMENT--->' + JSON.stringify(payment));
    })
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }} style={styles.scrollview}>
        <StatusBar
          barStyle="light-content"
        />

        {this.state.loading
          ? (
            <Loading size={'large'}/>
          ) : null
        }
        
        {!_.isEmpty(this.state.paymentData)
          ? (
            <View>
              <View elevation={3} style={[styles.cardView, { marginTop: 30 }]}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => { }}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.buttonText}>
                      {this.state.paymentData}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        }

        <FloatingAction
          ref={(ref) => { this.floatingAction = ref; }}
          actions={actions}
          onPressItem={this.handleUsaEPayClick}
        />
    </ScrollView>
    );
  }
}
    
const styles = StyleSheet.create({
  cardView: {
    backgroundColor: '#f4f4f4',
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
    // marginLeft: 30,
    fontSize: 16,
    marginTop: 5,
  },
});

Payment.propTypes = {
  navigation: PropTypes.object.isRequired,
  addUsaEpay: PropTypes.func.isRequired,
  payment: PropTypes.object.isRequired,
};

module.exports = Payment;
