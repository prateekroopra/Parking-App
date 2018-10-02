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
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

const actions = [{
  text: '+',
  icon: require('../../../images/add.png'),
  name: 'bt_add',
  position: 1
}];

class MyVehicles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
        <StatusBar
          barStyle="light-content"
        />

        <View style={styles.topContainer}>
          <Text style={styles.title}>
            ADD A VEHICLE
          </Text>

          <Text style={styles.subText}>
            You currently have no saved vehicles. Add one now 
            to quickly complete bookings.
          </Text>
        </View>

        <FloatingAction
          ref={(ref) => { this.floatingAction = ref; }}
          actions={actions}
          showBackground={false}
          overrideWithAction={true}
          onPressItem={() => {
            this.props.navigation.navigate('AddVehicle');
          }}
        />
    </ScrollView>
    );
  }
}
    
const styles = StyleSheet.create({
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 20,
    color: 'grey',
    marginTop: 20,
    textAlign: 'center',
    marginLeft: 50,
    marginRight: 50,
  }
});

MyVehicles.propTypes = {
  navigation: PropTypes.object.isRequired,
};

module.exports = MyVehicles;
