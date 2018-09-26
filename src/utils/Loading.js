import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native'

const Loading = ({ size }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export { Loading };
