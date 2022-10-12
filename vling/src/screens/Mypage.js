import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';

export default function Mypage({navigation, route}) {
  const {userName, email, photo} = route.params;
  console.log('Params', route.params);
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('googleId');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('photo');
      await navigation.navigate('Login');
    } catch (error) {
      console.error('error', error);
    }
  };
  return (
    <View style={styles.mypage}>
      <Image
        style={styles.photo}
        source={{
          uri: photo,
        }}
      />
      <Text style={styles.nameInfo}>안녕하세요 {userName} 님 환영합니다</Text>
      <Text style={styles.mailInfo}>{email}</Text>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.signout}>Google Signout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mailInfo: {
    top: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  nameInfo: {
    top: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  button: {
    top: 12,
    width: 300,
    height: 40,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FF0044',
  },
  signout: {
    color: '#ededed',
    fontSize: 25,
  },
  mypage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ffffff',
  },
});

// const checkSign = async () => {
//   const check = await GoogleSignin.isSignedIn();
//   const info = await GoogleSignin.getCurrentUser();
//   console.log('check', check);
//   console.log('info', info.user.id);
//   console.log('info', info.user.email);
//   // id, email, name
// };
