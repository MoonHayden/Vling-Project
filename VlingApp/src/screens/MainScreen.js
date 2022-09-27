import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CategoriesScreen from './Categories';
import MypageScreen from './Mypage';
import NERScreen from './NER';
import EmotionScreen from './Emotion';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mypage" component={MypageScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Emotion" component={EmotionScreen} />
      <Tab.Screen name="NER" component={NERScreen} />
    </Tab.Navigator>
  );
}
