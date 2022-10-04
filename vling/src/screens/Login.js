import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Login({navigation}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '937607842726-j4s6oq4anspnfi1gr99mj1uckpub529j.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
    isSignedIn();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('due___', userInfo);
      setUser(userInfo);
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

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log('please login');
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('edit___', user);
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert('Someting went wrong.');
        console.log('Someting went wrong.');
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.login}>
      <Image
        source={require('/Users/haydenmoon/Desktop/labeling/vling/src/asset/images/logo.png')}
      />
      <View>
        {!user.idToken ? (
          <GoogleSigninButton style={styles.Google} onPress={signIn} />
        ) : (
          <TouchableOpacity onPress={signOut}>
            <Text>Signout</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.reset({routes: [{name: 'MainScreen'}]})}>
        <Text style={{fontWeight: 'bold'}}>Login</Text>
      </TouchableOpacity>
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
