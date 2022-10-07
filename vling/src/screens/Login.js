import React /*, {useState}*/ from 'react';
import {View, Image, StyleSheet} from 'react-native';
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
  // const [user, setUser] = useState();
  const [LoginInfo] = useMutation(LOGINGQL);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setUser(userInfo);
      // console.log('userInfo:', userInfo);
      const {email, name, photo} = userInfo.user;
      console.log(email);
      console.log(name);
      console.log(photo);

      if (userInfo) {
        return (
          navigation.navigate('MainScreen', {
            email: email,
            userName: name,
            photo: photo,
          }),
          // navigation.reset(
          //   {routes: [{name: 'MainScreen'}]},
          //   {
          //     email: userInfo.user.email,
          //     name: userInfo.user.name,
          //     photo: userInfo.user.photo,
          //   },
          // ),
          LoginInfo({
            variables: {
              email: userInfo.user.email,
              googleId: userInfo.user.id,
              name: userInfo.user.name,
              idToken: userInfo.idToken,
            },
          })
        );
      } else {
        console.log('로그인 실패');
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
