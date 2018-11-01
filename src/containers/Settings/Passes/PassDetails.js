import _ from "lodash";
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
} from 'react-native';

class PassDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        address: '',
        status: '',
        time: '',
      }
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const data = params ? params.rowdata : undefined;
    this.setState({ data });
  }

  render() {
    const from = Moment(`${this.state.data.from}`, 'YYYY-MM-DDTHH:mm:ssZ').format('MMM D YYYY, LT');
    const to = Moment(`${this.state.data.to}`, 'YYYY-MM-DDTHH:mm:ssZ').format('MMM D YYYY, LT');

    return (
      <ScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
        <StatusBar
          barStyle="light-content"
        />

        <View style={styles.topContainer}>
          <Text style={styles.title}>
            {this.state.data.location}
          </Text>

          <Text style={styles.subText}>
            STATUS: PAID
          </Text>

          <Text style={styles.subText}>
            {`Start Time: ${from}`}
          </Text>

           <Text style={styles.subText}>
            {`End Time: ${to}`}
          </Text>
        </View>
    </ScrollView>
    );
  }
}
    
const styles = StyleSheet.create({
  topContainer: {
    height: '100%',
  },
  title: {
    fontSize: 22,
    marginTop: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    color: 'grey',
    marginTop: 15,
    marginLeft: 10,
  }
});

PassDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
};

module.exports = PassDetails;
