import React, {useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '224145633081-g145bsnbpscdau8pdbrkp37gnk1lnvrk.apps.googleusercontent.com',
  // offlineAccess: true,
  forceCodeForRefreshToken: true,
});
export default function Login({navigation}) {
  const [user, setUser] = useState({});
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log(userInfo.user.email);
      console.log('로그인 완료');
      if (userInfo) {
        console.log(userInfo);
        setUser(userInfo);
        return navigation.reset({routes: [{name: 'MainScreen'}]});
      } else {
        console.log('없엉');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('error1', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('error2', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('error3', error);
      } else {
        // some other error happened
        console.log('error', error);
      }
    }
  };

  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     setUser({});
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <View style={styles.login}>
      <Image
        source={require('/Users/haydenmoon/Desktop/labeling/vling/src/asset/images/logo.png')}
      />

      <View>
        {!user.idToken && (
          <GoogleSigninButton style={styles.Google} onPress={signIn} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  Google: {width: 250, height: 50},
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
    backgroundColor: '#FF0044',
  },
});

// const isSignedIn = async () => {
//   const isSignedIn = await GoogleSignin.isSignedIn();
//   if (!!isSignedIn) {
//     getCurrentUserInfo();
//   } else {
//     console.log('please login');
//   }
// };

// const getCurrentUserInfo = async () => {
//   try {
//     const userInfo = await GoogleSignin.signInSilently();
//     console.log('edit___', user);
//     setUser(userInfo);
//   } catch (error) {
//     if (error.code === statusCodes.SIGN_IN_REQUIRED) {
//       alert('User has not signed in yet');
//       console.log('User has not signed in yet');
//     } else {
//       alert('Someting went wrong.');
//       console.log('Someting went wrong.');
//     }
//   }
// };
