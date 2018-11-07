import _ from 'lodash';
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
  ListView,
  Alert,
} from 'react-native';
import { Loading } from '../../../utils/Loading';

class Rental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      defaultView: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    this.getParkingList();
  }

  getParkingList() {
    const { 
      getOwnerParking,
    } = this.props;
  
    AsyncStorage.getItem('email').then((value) => {
      if (value !== null) {
        this.setState({ loading: true });
        getOwnerParking(value).then(() => {
          const { ownerParkingList } = this.props;
          console.log('OWNER LIST0--->' + JSON.stringify(ownerParkingList));
          if (ownerParkingList.error === 0) {
            this.setState({ loading: false });
            if(ownerParkingList.data.length > 0) {
               this.setState({ dataSource: this.state.dataSource.cloneWithRows(ownerParkingList.data), defaultView: false })
            } else {
              this.setState({ defaultView: true })
            }
          } else {
            Alert.alert('Alert', ownerParkingList.data);
            this.setState({ error: ownerParkingList.data, loading: false });
          }
        })
      }
    })
  }

  renderGridItem(rowdata) {
    return (
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={1}
      >
        <View elevation={2} style={styles.row}>
          <Text style={{ fontSize: 16 }}>{rowdata.location}</Text>
          <Text style={{ fontSize: 16 }}>{rowdata.from}</Text>
          <Text style={{ fontSize: 16 }}>{rowdata.to}</Text>
          <Text style={{ fontSize: 16, marginTop: 5 }}>{rowdata.message}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
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
                  <Text style={styles.subText}>
                    You currently have no added Parking.
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
  row: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    padding: 20,
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

Rental.propTypes = {
  navigation: PropTypes.object.isRequired,
  ownerParkingList: PropTypes.object.isRequired,
  getOwnerParking: PropTypes.func.isRequired,
};

export default Rental;

