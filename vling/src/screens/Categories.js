import React from 'react';
import {useQuery, gql} from '@apollo/client';
import * as Progress from 'react-native-progress';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';

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

export default function CategoriesScreen({navigation}) {
  const {data} = useQuery(TASKS);
  if (data === undefined) {
    return;
  }
  const {tasks} = data;

  const renderItem = ({item}) => {
    const categoryTitle = `Category ${item.name}`;
    return (
      <View>
        <Button
          title={categoryTitle}
          onPress={() => navigation.navigate('Categorization')}
          style={styles.item}
        />
        <Progress.Bar
          progress={item.rate / 100}
          width={null}
          height={8}
          color={'#FF0044'}
          padding={(10, 0, 5, 0)}
        />

        <Text style={styles.title}>{item.rate} %</Text>
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
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 15,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
