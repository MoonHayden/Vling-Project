import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import CategoriesScreen from './Categories';
import MypageScreen from './Mypage';
import NERScreen from './NER';
import EmotionScreen from './Emotion';
// import Categorization from './Categorization';

const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

export default function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Mypage') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'podium' : 'podium-outline';
          } else if (route.name === 'Emotion') {
            iconName = focused ? 'happy' : 'happy-outline';
          } else if (route.name === 'NER') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Mypage" component={MypageScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Emotion" component={EmotionScreen} />
      <Tab.Screen name="NER" component={NERScreen} />
      {/* <Stack.Screen name="Categorization" component={Categorization} /> */}
    </Tab.Navigator>

    // <Stack.Screen name="Categories" component={CategoriesScreen} />
  );
}
