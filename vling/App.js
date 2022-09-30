import React, {useEffect} from 'react';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import MainScreen from './src/screens/MainScreen';

const client = new ApolloClient({
  uri: 'http://192.168.0.221:4000/bzznbyd',
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    LottieSplashScreen.hide(); // here
  }, []);
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="MainScreen"
            options={{headerShown: false}}
            component={MainScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
