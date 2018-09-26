import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ConfirmationScreen = () => (
  <View style={styles.container}>
    <Ionicons name="ios-checkmark-circle" size={150} color='rgba(25, 73, 165, 1)' />
    <Text style={styles.txtMessage}>
      Your parking has been added.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  }
});

module.exports = ConfirmationScreen;
