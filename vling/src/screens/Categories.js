import React from 'react';
import {useQuery, gql} from '@apollo/client';
import * as Progress from 'react-native-progress';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const idSearch = gql`
  query SearchLabelerByGId($googleId: String) {
    searchLabelerByGId(googleId: $googleId) {
      _id
      googleId
      email
      name
      value
      created_at
    }
  }
`;

const TASKS = gql`
  query GetLabelersTasks($id: ID) {
    getLabelersTasks(_id: $id) {
      name
      totalVideos
      doneVideos
    }
  }
`;
export default function CategoriesScreen({navigation, route}) {
  const {googleId} = route.params;

  const {data: objId} = useQuery(idSearch, {
    variables: {googleId: googleId},
  });
  const objectId = objId?.searchLabelerByGId?._id;
  console.log(objectId);

  const {data} = useQuery(TASKS, {
    variables: {id: objectId},
  });
  if (data === undefined) {
    return;
  }
  // console.log(data);

  const DATA = data?.getLabelersTasks;
  console.log(DATA);

  // const doneVideos = DATA?.doneVideos;
  // const totalVideos = DATA?.totalVideos;
  // const rate = (doneVideos / totalVideos) * 100;
  // console.log(rate);

  const renderItem = ({item}) => {
    const categoryTitle = item?.name;
    const doneVideos = item?.doneVideos;
    const totalVideos = item?.totalVideos;
    const rate = (doneVideos / totalVideos) * 100;
    console.log(rate);

    // console.log(categoryTitle);
    return (
      <View style={styles.wrap}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Categorization', {
              name: categoryTitle,
              labeler: objectId,
            })
          }>
          <Text style={{fontWeight: 'bold', color: '#2323dd'}}>
            {categoryTitle}
          </Text>
        </TouchableOpacity>
        <Progress.Bar
          progress={rate / 100}
          width={null}
          height={10}
          marginTop={10}
          color={'#FF0044'}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', color: '#2b2525'}}>
            진행률 {rate}%
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.flat}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8ce',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  wrap: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#6250ed',
    marginTop: 20,
  },
});
// marginTop: StatusBar.currentHeight || 0,
// flat: {
//   justifyContent: 'center',
//   alignContent: 'center',
// },

//key value = name
