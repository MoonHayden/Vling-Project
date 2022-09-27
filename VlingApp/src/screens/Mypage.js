import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

export default function EmotionScreen() {
  return (
    <View style={styles.mypage}>
      <Text style={styles.text}>Logout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mypage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'blue',
  },
});
