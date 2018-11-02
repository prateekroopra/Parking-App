import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Switch,
} from 'react-native';

class Business extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMainRide: false,
      SwitchOnValueHolder: false,
      loading: false,
    };
  }

  ShowAlert = (value) => {
    this.setState({
      SwitchOnValueHolder: value,
    });
  }

  render() {
    return (
      <ScrollView style={styles.scrollview}>
        <StatusBar
          barStyle="light-content"
        />

        <View style={styles.formInner}>
          <View style={styles.switchContainer}>
            <Switch
              onValueChange={value => this.ShowAlert(value)}
              value={this.state.SwitchOnValueHolder}
            />

            <Text style={styles.txt}>Business Profile</Text>
          </View>
        </View>
    </ScrollView>
    );
  }
}
    
const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: 'white'
  },
  formInner: {
    margin: 30,
    paddingLeft: 30,
    backgroundColor: 'white',
  },
  formInput: {
    // height: 45,
    // backgroundColor: '#f4f4f4',
    // borderBottomColor: 'grey',
    // borderBottomWidth: 0.5,
    // marginBottom: 10,
    // paddingHorizontal: 10,
    fontSize: 18,
  },
  buttonContainer: {
    paddingVertical: 15,
    backgroundColor: 'rgba(25, 73, 165, 1)',
    borderRadius: 4,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  subText: {
    fontSize: 18,
    color: 'grey',
    marginTop: 20,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  txt: {
    color: 'grey',
    fontSize: 20,
    marginLeft: 10,
    width: '82%',
  },
});
    
Business.propTypes = {
  navigation: PropTypes.object.isRequired,
};

module.exports = Business;
