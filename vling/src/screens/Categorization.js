import React from 'react';
// import {useQuery, gql} from '@apollo/client';
import {StyleSheet, Text, View} from 'react-native';

export default function Categorization({route}) {
  console.log(route.params.status);
  return (
    <View style={styles.Categorization}>
      <Text>name: {route.params.name}</Text>
      <Text>status: {route.params.status}</Text>
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
