import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Text, View, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';

export default function Mypage({navigation, route}) {
  const userName = route.params;
  console.log(route.params.userName);
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      navigation.reset({routes: [{name: 'Login'}]});
    } catch (error) {
      console.error('error', error);
    }
  };
  return (
    <View style={styles.mypage}>
      <Text>name: 님 </Text>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.signout}>Google Signout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mypage: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FF0044',
  },
  signout: {
    color: 'white',
    fontSize: 25,
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
