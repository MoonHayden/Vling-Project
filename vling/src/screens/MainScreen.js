import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import CategoriesScreen from './Categories';
import MypageScreen from './Mypage';
import NERScreen from './NER';
import EmotionScreen from './Emotion';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function MainScreen({route}) {
  const {userName, email, photo, googleId} = route.params;

  useEffect(() => {
    (async () => {
      const check = await AsyncStorage.getItem('googleId');
      console.log('Check', check);
    })();
  }, []);

  return (
    <Tab.Navigator
      headerMode="none"
      screenOptions={({route}) => ({
        headerShown: false,
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
      })}>
      <Tab.Screen
        name="Mypage"
        component={MypageScreen}
        initialParams={{
          email: email,
          userName: userName,
          photo: photo,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        initialParams={{googleId: googleId}}
      />
      <Tab.Screen name="Emotion" component={EmotionScreen} />
      <Tab.Screen name="NER" component={NERScreen} />
    </Tab.Navigator>
  );
}

// const idSearch = gql`
//   query SearchLabelerByGId($googleId: String) {
//     searchLabelerByGId(googleId: $googleId) {
//       _id
//       googleId
//       email
//       name
//       value
//       created_at
//     }
//   }
// `;

// console.log(googleId);
// const {data} = useQuery(idSearch, {
//   variables: {googleId: googleId},
// });
// if (data === undefined) {
//   return;
// }
// console.log(data);

// const objectId = data.searchLabelerByGId._id;

// console.log(objectId);
