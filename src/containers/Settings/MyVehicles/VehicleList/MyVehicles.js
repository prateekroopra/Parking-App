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
import { FloatingAction } from 'react-native-floating-action';
import { Loading } from '../../../../utils/Loading';

const actions = [{
  text: '+',
  icon: require('../../../../images/add.png'),
  name: 'bt_add',
  position: 1
}];

class MyVehicles extends React.Component {
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
    this.getVehicleList();
  }

  getVehicleList() {
    const { 
      getUserVehicle,
    } = this.props;
  
    AsyncStorage.getItem('email').then((value) => {
      if (value !== null) {
        this.setState({ loading: true });
        getUserVehicle(value).then(() => {
          const { VehicleList } = this.props;
          
          if (VehicleList.error === 0) {
            this.setState({ loading: false });
            if(VehicleList.data.length > 0) {
              this.setState({ dataSource: this.state.dataSource.cloneWithRows(VehicleList.data), defaultView: false })
            } else {
              this.setState({ defaultView: true })
            }
          } else {
            Alert.alert('Alert', VehicleList.data);
            this.setState({ error: VehicleList.data, loading: false });
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
        <View elevation={2} style={{ marginTop: 10, marginLeft: 10, marginRight: 10, backgroundColor: '#fff', padding: 20 }}>
          <Text style={{ fontSize: 16 }}>{rowdata.license_num}</Text>
          <Text style={{ fontSize: 16, marginTop: 5 }}>{rowdata.nickname}</Text>
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
                  <Text style={styles.title}>
                    ADD A VEHICLE
                  </Text>

                  <Text style={styles.subText}>
                    You currently have no saved vehicles. Add one now 
                    to quickly complete bookings.
                  </Text>
                </View>
            ) : (
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={rowdata => this.renderGridItem(rowdata)}
                />
            )
          }

          <FloatingAction
            ref={(ref) => { this.floatingAction = ref; }}
            actions={actions}
            showBackground={false}
            overrideWithAction={true}
            onPressItem={() => {
              this.props.navigation.navigate('AddVehicle', { returnData: this.getVehicleList.bind(this)});
            }}
          />
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
  VehicleList: PropTypes.object.isRequired,
  getUserVehicle: PropTypes.func.isRequired,
};

export default MyVehicles;

