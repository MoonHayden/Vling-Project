import React from 'react';
import StyleSheet, {Text, View} from 'react-native';

export default function Categorization() {
  return (
    <View name="Categorization" style={styles.Categorization}>
      <Text>Categorization</Text>
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
