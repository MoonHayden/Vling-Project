import React from 'react';
import {useQuery, gql} from '@apollo/client';
import {Text, View, FlatList, SafeAreaView, StatusBar} from 'react-native';
import {StyleSheet} from 'react-native';

const TASKS = gql`
  query getTask {
    tasks {
      id
      name
      numVideos
      labeler
      rate
    }
  }
`;

export default function CategoriesScreen() {
  const {data} = useQuery(TASKS);
  if (data === undefined) {
    return;
  }
  const {tasks} = data;

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>TaskName: {item.name}</Text>
        <Text style={styles.title}>Task진행률: {item.rate}%</Text>
      </View>
    );
  };

  console.log(tasks);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

//ProgressBar
