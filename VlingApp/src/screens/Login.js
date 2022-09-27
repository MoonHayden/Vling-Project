import React from 'react';
import {View, Button, Image} from 'react-native';
import {StyleSheet} from 'react-native';

export default function Login({navigation}) {
  return (
    <View style={styles.login}>
      <Image
        style={styles.logo}
        source={require('/Users/haydenmoon/Desktop/labeling/VlingApp/android/app/src/main/res/mipmap-xxxhdpi/logo.png')}
      />
      <Button
        title="Google Social Login"
        onPress={() => navigation.reset({routes: [{name: 'MainScreen'}]})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 20,
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
    backgroundColor: '#FF0044',
  },
});
