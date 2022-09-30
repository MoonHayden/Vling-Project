import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function CategorizationScreen(route) {
  return (
    <View style={styles.Categorization}>
      <Text>id: {route.parems.id}</Text>
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
