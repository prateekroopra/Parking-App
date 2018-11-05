import React from 'react';
import { ScreenOrientation } from 'expo';
import { Platform } from 'react-native';
import { Provider } from 'react-redux'
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import store from './src/store'
import MainApp from './src/containers/MainApp';
import LogInScreen from './src/containers/Login/index';

ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);

const Routes = {
  MainApp: {
    name: 'Stack in Tabs',
    description: 'testing stack in tabs after login page',
    screen: MainApp,
  },
};

const AppNavigator = SwitchNavigator(
  {
    ...Routes,
    Index: {
      screen: LogInScreen,
    },
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',

    /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
