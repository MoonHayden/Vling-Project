import React, {useEffect, useState} from 'react';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import MainScreen from './src/screens/MainScreen';
import Categorization from './src/screens/Categorization';
import CategoriesScreen from './src/screens/Categories';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const client = new ApolloClient({
  uri: 'http://www2.wecode.buzzntrend.com:4000/graphql',
  cache: new InMemoryCache(),
});
const Stack = createStackNavigator();
export default function App() {
  const [isSigned, setIsSigned] = useState({
    googleId: '',
    email: '',
    name: '',
    photo: '',
  });

  useEffect(() => {
    LottieSplashScreen.hide();
    (async () => {
      const googleId = await AsyncStorage.getItem('googleId');
      const email = await AsyncStorage.getItem('email');
      const name = await AsyncStorage.getItem('name');
      const photo = await AsyncStorage.getItem('photo');
      if (googleId) {
        setIsSigned({
          googleId: googleId,
          email: email,
          name: name,
          photo: photo,
        });
      } else if (!googleId) {
        setIsSigned({
          googleId: '',
          email: '',
          name: '',
          photo: '',
        });
      }
    })();
  }, []);
  const googleId = isSigned.googleId;
  console.log(googleId);
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {!googleId && (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          )}
          <Stack.Screen
            name="MainScreen"
            options={{headerShown: false}}
            component={MainScreen}
            initialParams={{
              email: isSigned.email,
              userName: isSigned.name,
              photo: isSigned.photo,
              googleId: isSigned.googleId,
            }}
          />
          <Stack.Screen name="Categorization" component={Categorization} />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
