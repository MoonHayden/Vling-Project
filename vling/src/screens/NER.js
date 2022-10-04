import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

export default function NERScreen() {
  return (
    <View style={styles.NER}>
      <Text>NER Coming Soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  NER: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
