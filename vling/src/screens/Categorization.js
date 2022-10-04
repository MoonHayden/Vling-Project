import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Categorization({route}) {
  console.log(route.params.name);

  return (
    <View style={styles.Categorization}>
      <Text>name: {route.params.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Categorization: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
