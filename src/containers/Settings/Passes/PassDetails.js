import _ from "lodash";
import React from 'react';
import PropTypes from 'prop-types';
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
    return (
      <ScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
        <StatusBar
          barStyle="light-content"
        />

        <View style={styles.topContainer}>
          <Text style={styles.title}>
            {this.state.data.address}
          </Text>

          <Text style={styles.subText}>
            {this.state.data.status}
          </Text>

          <Text style={styles.subText}>
            {this.state.data.time}
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
    fontSize: 20,
    color: 'grey',
    marginTop: 10,
    marginLeft: 10,
  }
});

PassDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
};

module.exports = PassDetails;
