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

const TASKS = gql`
  query GetAllTasks {
    getAllTasks {
      name
      kind
      labelers {
        labeler
      }
      status
      rate
      expiration_date
    }
  }
`;

export default function CategoriesScreen({navigation}) {
  const {data} = useQuery(TASKS);
  if (data === undefined) {
    return;
  }

  const DATA = data.getAllTasks;
  // console.log(data);

  const renderItem = ({item}) => {
    const categoryTitle = item.name;
    // console.log(item);
    return (
      <View style={styles.wrap}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('Categorization', {
              name: item.name,
              kind: item.kind,
            })
          }>
          <Text style={{fontWeight: 'bold', color: '#2323dd'}}>
            {categoryTitle}
          </Text>
        </TouchableOpacity>
        <Progress.Bar
          progress={item.rate / 100}
          width={null}
          height={10}
          marginTop={10}
          color={'#FF0044'}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', color: '#2b2525'}}>
            진행률 {item.rate} %
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
