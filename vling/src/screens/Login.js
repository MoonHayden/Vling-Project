import React /*, {useState}*/ from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Image, Text, StyleSheet} from 'react-native';
import {gql, useMutation} from '@apollo/client';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const LOGINGQL = gql`
  mutation LabelerLogIn(
    $email: String
    $googleId: String
    $name: String
    $idToken: String
  ) {
    labelerLogIn(
      email: $email
      googleId: $googleId
      name: $name
      idToken: $idToken
    ) {
      _id
      googleId
      idToken
      email
      name
      value
      created_at
    }
  }
`;
GoogleSignin.configure({
  webClientId:
    '224145633081-g145bsnbpscdau8pdbrkp37gnk1lnvrk.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export default function Login({navigation}) {
  const [LoginInfo] = useMutation(LOGINGQL);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setUser(userInfo);
      // console.log(userInfo);

      const {email, name, photo, id} = userInfo.user;

      await AsyncStorage.setItem('googleId', id);
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('photo', photo);

      // if ('googleId') {
      return (
        navigation.navigate('MainScreen', {
          email: email,
          userName: name,
          photo: photo,
          googleId: id,
        }),
        LoginInfo({
          variables: {
            email: userInfo.user.email,
            googleId: userInfo.user.id,
            name: userInfo.user.name,
            idToken: userInfo.idToken,
          },
        })
      );
      // } else {
      //   console.log('로그인 실패');
      // }
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
  //   } catch (error) {
  //     console.error('error', error);
  //   }
  // };

  return (
    <View style={styles.login}>
      <Image
        source={require('/Users/haydenmoon/Desktop/labeling/vling/src/asset/images/vling_logo.png')}
      />
      <Image
        source={require('/Users/haydenmoon/Desktop/labeling/vling/src/asset/images/logo.png')}
      />
      <View>
        <GoogleSigninButton style={styles.Google} onPress={signIn} />
        {/* <Button title="signOut" style={styles.Google} onPress={signOut} /> */}
      </View>
      <View style={styles.companyInfo}>
        <Text style={styles.legalInfo}>Trade name : Sway mobile Co., Ltd</Text>
        <Text style={styles.legalInfo}>Address : 경기도 성남시 분당구</Text>
        <Text style={styles.legalInfo}>
          분당내곡로 117, 크래프톤타워 스웨이모바일㈜
        </Text>
        <Text style={styles.legalInfo}>
          Copyright 2021 Sway mobile. All Rights Reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legalInfo: {
    fontSize: 10,
  },
  companyInfo: {
    top: 100,
  },
  Google: {
    marginTop: 20,
    width: 300,
    height: 50,
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
// const signOut = async () => {
//   try {
//     await GoogleSignin.revokeAccess();
//     await GoogleSignin.signOut();
//     setUser({});
//   } catch (error) {
//     console.error(error);
//   }
// };
// navigation.reset(
//   {routes: [{name: 'MainScreen'}]},
//   {
//     email: userInfo.user.email,
//     name: userInfo.user.name,
//     photo: userInfo.user.photo,
//   },
// ),
