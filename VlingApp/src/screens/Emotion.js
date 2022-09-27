import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

export default function EmotionScreen() {
  return (
    <View style={styles.emotion}>
      <Text>Emotion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emotion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
