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

// 백

// 항상 프론트에서 접근 할수 있게 서버 구축
// 배포, 개발 버전 엄격하게 분류
// 새로 생기는 사항은 즉각 보고하기 EC2배포
// 윕 소켓

// 프론트
// CTO 님 이야기
// 하나로 합치기는거 최우선적으로 처리하기 우려스려움 올릴수 있도록
// 시스템 설정 서버
// ui flow 버그 없도록 하기

// 기능적인 부분을 단단히 자리매김 할 수 있도록

// 지금의 진행 상황이 시한을 맞출 수 있을지 우려스러운 상황
// 팀장의 역량이 매우 필요한 때

// 다음주 목요일 완성 필요

// 다다음 주 미흡했던 부분

// 결과물로 보여주자
