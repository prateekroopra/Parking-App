import React from 'react';
import {
  ScrollView, View, Image,
  TouchableOpacity, Text, StyleSheet, AsyncStorage, Platform
} from 'react-native';
import {Constants} from "expo";
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import Dimensions from 'Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageZoom from 'react-native-image-pan-zoom';
import Lot25 from '../images/Lot25Vec-IOS.psd';
import Lot123 from '../images/Lot123Vec-IOS.psd';
import ParkingMapView from './Home/ParkingList/index';
import ParkingDetailsForm from './Home/AddParking/index';
import ConfirmationScreen from './Home/ConfirmationScreen';
import TimeSummaryScreen from './Home/BookParking/index';
import SearchScreen from './Search/Search';
import SettingsScreen from './Settings/Settings';
import FreeParkingScreen from './Settings/FreeParking';
import MyVehiclesScreen from './Settings/MyVehicles/VehicleList/index';
import AddVehicleScreen from './Settings/MyVehicles/AddVehicle/index';
import PassesScreen from './Settings/Passes/MyBookings/index';
import MyProfileScreen from './Settings/MyProfile/index';
import PaymentScreen from './Settings/Payment/index';
import PassDetailsScreen from './Settings/Passes/PassDetails';
import BusinessScreen from './Settings/Business/index';
import RentalScreen from './Settings/Rental/index';

// lot 25 coords
const lot25 = {
  latitude: 33.2091237,
  longitude: -97.1502889,
};

// lot 1, 2, 3 coords
const lot123 = {
  latitude: 33.2115122,
  longitude: -97.1494314,
};

// Image panner screen/component
class ImagePanner extends React.Component {
  render() {
    return (
      <ImageZoom cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        onClick={() => this.props.nav.navigate('SelectTime')}
        imageWidth={Dimensions.get('window').width}
        imageHeight={this.props.maxHeight ? Dimensions.get('window').height : 300}>
        <Image style={{ width: Dimensions.get('window').width, height: this.props.maxHeight ? Dimensions.get('window').height : 300 }}
          source={this.props.img} />
      </ImageZoom>
    );
  }
}

// Home screen that uses MyMap component above
const MyHomeScreen = ({ navigation }) => (
  <ParkingMapView banner="Home Screen" navigation={navigation} />
);

// parking lot 25 screen with image panner component
const ParkingLot25Screen = ({ navigation }) => (
  <ScrollView maximumZoomScale={5} scrollEnabled={true} minimumZoomScale={1} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <ImagePanner img={Lot25} maxHeight={true} nav={navigation} />
  </ScrollView>
);

// parking lot 1, 2, 3 screen with image panner component
const ParkingLot123Screen = ({ navigation }) => (
  <ImagePanner img={Lot123} maxHeight={false} nav={navigation} />
);

// select time screen with select time class component
const SelectTimeScreen = ({ navigation, timeSelectOpen }) => (
  <TimeSummaryScreen navigation={navigation} />
);

// setting screen example with mynav
const MySettingsScreen = ({ navigation }) => (
  <SettingsScreen banner="" navigation={navigation} />
);
const MySearchScreen = ({ navigation }) => (
  <SearchScreen navigation={navigation} />
);

const TimeConfirmationScreen = ({ navigation }) => (
  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <Ionicons name="ios-checkmark-circle" size={150} color='rgba(25, 73, 165, 1)' />
    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 20 }}>Your Time Summary has been confirmed!</Text>
  </View>
);

const headerBack = (navigation) => (
  <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.goBack(null)}>
    <Ionicons name="ios-arrow-back" style={{ paddingHorizontal: 15 }} color="#f3f3f3" size={26} />
  </TouchableOpacity>
);

// stack navigator
const MainTab = StackNavigator({
  Home: {
    screen: MyHomeScreen,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      header: null,
      title: `Select parking lot`,
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
    }),
  },
  ParkingLot25: {
    screen: ParkingLot25Screen,
    path: '/parking-lot25',
    navigationOptions: ({ navigation }) => ({
      title: `Select parking spot`,
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  ParkingLot123: {
    screen: ParkingLot123Screen,
    path: '/parking-lot123',
    navigationOptions: ({ navigation }) => ({
      title: `Select parking spot`,
      headerLeft: (headerBack(navigation)),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  SelectTime: {
    screen: SelectTimeScreen,
    path: '/select-time',
    navigationOptions: ({ navigation }) => ({
      title: `Time Summary`,
      // headerLeft: (headerBack(navigation)),
      headerRight: (<View />),
      headerTintColor: 'white',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
  ConfirmTime: {
    screen: TimeConfirmationScreen,
    path: '/confirm-time',
    navigationOptions: ({ navigation }) => ({
      title: `Confirmed`,
      headerLeft: (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation
          .dispatch(NavigationActions.reset(
            {
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ]
            }))}>
          <Text style={{ paddingHorizontal: 15, fontWeight: 'bold', color: '#f3f3f3' }}>Close</Text>
        </TouchableOpacity>
      ),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: (<View />),
    }),
  },
  ParkingDetailsForm: {
    screen: ParkingDetailsForm,
    path: '/ParkingDetailsForm',
    navigationOptions: ({ navigation }) => ({
      title: `Parking Details`,
      headerLeft: (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation
          .dispatch(NavigationActions.reset(
            {
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ]
            }))}>
          <Text style={{ paddingHorizontal: 15, fontWeight: 'bold', color: '#f3f3f3' }}>Close</Text>
        </TouchableOpacity>
      ),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: (<View />),
    }),
  },
  ConfirmationScreen: {
    screen: ConfirmationScreen,
    path: '/confirmation',
    navigationOptions: ({ navigation }) => ({
      title: `Confirmed`,
      headerLeft: (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation
          .dispatch(NavigationActions.reset(
            {
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' })
              ]
            }))}>
          <Text style={{ paddingHorizontal: 15, fontWeight: 'bold', color: '#f3f3f3' }}>Close</Text>
        </TouchableOpacity>
      ),
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle
    }),
  },
});

const SearchTab = StackNavigator({
  Settings: {
    screen: MySearchScreen,
    path: '/',
    navigationOptions: () => ({
      title: 'Search',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerLeft: (<View />),
      headerRight: (<View />),
    }),
  },
});

const SettingsTab = StackNavigator({
  Settings: {
    screen: MySettingsScreen,
    path: '/',
    navigationOptions: () => ({
      title: 'Account',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerLeft: (<View />),
      headerRight: (<View />),
    }),
  },
  MyVehicles: {
    screen: MyVehiclesScreen,
    path: '/',
    navigationOptions: () => ({
      title: 'My Vehicles',
      headerTintColor: 'white',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: (<View />),
    }),
  },
  AddVehicle: {
    screen: AddVehicleScreen,
    path: '/',
    navigationOptions: (navigation) => ({
      title: 'Add Vehicle',
      headerTintColor: 'white',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: (<View />),
    }),
  },
  Passes: {
    screen: PassesScreen,
    path: '/',
    navigationOptions: (navigation) => ({
      title: 'Passes',
      headerTintColor: 'white',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: (<View />),
    }),
  },
  MyProfile: {
    screen: MyProfileScreen,
    path: '/',
    navigationOptions: (navigation) => ({
      title: 'My Profile',
      headerTintColor: 'white',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: (<View />),
    }),
  },
  Payment: {
    screen: PaymentScreen,
    path: '/',
    navigationOptions: (navigation) => ({
      title: 'Payment Method',
      headerTintColor: 'white',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: (<View />),
    }),
  },
  PassDetails: {
    screen: PassDetailsScreen,
    path: '/',
    navigationOptions: (navigation) => ({
      title: 'Details',
      headerTintColor: 'white',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: (<View />),
    }),
  },
  FreeParking: {
    screen: FreeParkingScreen,
    path: '/',
    navigationOptions: (navigation) => ({
      title: 'Free Parking',
      headerTintColor: 'white',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: (<View />),
    }),
  },
  Business: {
    screen: BusinessScreen,
    path: '/',
    navigationOptions: (navigation) => ({
      title: 'Business Profile',
      headerTintColor: 'white',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: (<View />),
    }),
  },
  Rental: {
    screen: RentalScreen,
    path: '/',
    navigationOptions: (navigation) => ({
      title: 'Rental',
      headerTintColor: 'white',
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerRight: (<View />),
    }),
  },
});

const MainApp = TabNavigator(
  {
    MainTab: {
      screen: MainTab,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    SearchTab: {
      screen: SearchTab,
      path: '/search',
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-search' : 'ios-search-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    SettingsTab: {
      screen: SettingsTab,
      path: '/settings',
      navigationOptions: {
        tabBarLabel: 'Account',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(25, 73, 165, 1)',
    height: Platform.OS === 'android' ? 56 : 44,
    // paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
  },
  headerTitle: {
    // color: 'white'
    alignSelf: 'center',
    color: 'white',
    width: '90%',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default MainApp;