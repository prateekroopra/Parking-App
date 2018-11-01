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
  ListView,
  AsyncStorage,
  Alert,
  Image,
} from 'react-native';
import ParkingDefault from '../../../../images/parking_road.png';
import { Loading } from '../../../../utils/Loading';

// const data = [
//   {address: '34 Buswell St, Lawrence, MA', status: 'Paid', time: 'Hours 8:00 am  - 10:00 pm'},
//   {address: '233 South Broadway, Salem, NH', status: 'Paid', time: 'Hours 11:00 am  - 1:00 pm'},
//   {address: '233 Broadway, Providence, RI', status: 'Paid', time: 'Hours 8:00 am  - 10:00 pm'},
//   {address: '34 Buswell St,', status: 'Paid', time: 'Hours 8:00 am  - 10:00 pm'},
//   {address: '233 Broadway, Providence MA', status: 'Paid', time: 'Hours 8:00 am  - 10:00 pm'},
//   {address: '233 South Broadway', status: 'Paid', time: 'Hours 8:00 am  - 10:00 pm'},
// ];

class Passes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      defaultView: true,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('email').then((value) => {
      if (value !== null) {
        this.getAllUserBookings(value);
      }
    })
    // this.setState({ dataSource: this.state.dataSource.cloneWithRows(data) })
  }

  getAllUserBookings(email) {
    const { 
      getUserBookings,
    } = this.props;
  
    this.setState({ loading: true });
    console.log('BOOKING EMAIL--->' + this.state.email);
    getUserBookings(email).then(() => {
      const { bookingList } = this.props;
      console.log('BOOKING LIST--->' + JSON.stringify(bookingList));
      if (bookingList.error === 0) {
        this.setState({ loading: false });
        if(bookingList.data.length > 0) {
          this.setState({ dataSource: this.state.dataSource.cloneWithRows(bookingList.data), defaultView: false })
        } else {
          this.setState({ defaultView: true })
        }
      } else {
        Alert.alert('Alert', bookingList.data);
        this.setState({ error: bookingList.data, loading: false });
      }
    })
  }

  renderGridItem(rowdata) {
    return (
      <TouchableOpacity
        onPress={() => { this.props.navigation.navigate('PassDetails', { rowdata }); }}
        activeOpacity={1}
      >
        <View elevation={2} style={{ marginTop: 10, marginLeft: 10, marginRight: 10, backgroundColor: '#fff', padding: 20 }}>
          <Text style={{ fontSize: 16 }}>{rowdata.location}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView 
        contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
      >
        <StatusBar
          barStyle="light-content"
        />

        <View style={styles.container}>
          {this.state.loading
            ? (
              <Loading size={'large'}/>
            ) : null
          }

          {this.state.defaultView
            ? (
              <View style={styles.topContainer}>
                <Text style={styles.title}>
                  No Parking Passes Yet
                </Text>

                <Image
                  style={{ width: 250, height: 250 }}
                  source={ParkingDefault}
                />

                <Text style={styles.subText}>
                  When you book a space, your parking pass will appear here.
                </Text>
              </View> 
            ) : (
              <ListView
                dataSource={this.state.dataSource}
                renderRow={rowdata => this.renderGridItem(rowdata)}
              />
            )
          }
        </View>
      </ScrollView>
    );
  }
}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
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

Passes.propTypes = {
  navigation: PropTypes.object.isRequired,
  bookingList: PropTypes.object.isRequired,
  getUserBookings: PropTypes.func.isRequired,
};

export default Passes;
