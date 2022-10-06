import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Text, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';

export default function Mypage(navigation) {
  // const checkSign = async () => {
  //   const check = await GoogleSignin.isSignedIn();
  //   const info = await GoogleSignin.getCurrentUser();
  //   console.log('check', check);
  //   console.log('info', info.user.id);
  //   console.log('info', info.user.email);
  //   // id, email, name
  // };

  const signOut = async () => {
    try {
      const LogOut = await GoogleSignin.revokeAccess();
      const SignOut = await GoogleSignin.signOut();
      console.log(LogOut);
      console.log(SignOut);
      const check = await GoogleSignin.isSignedIn();
      console.log('check', check);
      if (check) {
        return navigation.reset({routes: [{name: 'Login'}]});
      } else {
        console.log('없엉');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity style={styles.mypage} onPress={signOut}>
      <Text style={styles.signout}>Signout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mypage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  signout: {
    // flex: 1,
    color: 'blue',
    borderWidth: 1,
    height: 20,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
