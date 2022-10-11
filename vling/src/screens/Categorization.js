import React, {useState} from 'react';
import YouTube from 'react-native-youtube';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useQuery, gql, useMutation} from '@apollo/client';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const VIDEOS = gql`
  query GetRandomVideo($labeler: String!, $taskName: String!) {
    getRandomVideo(labeler: $labeler, taskName: $taskName) {
      _id
      videoId
      title
      category
      tags
      tags_str
      description
      category_ori
      category_label
      category_predict
      taskName
      in_progress
      labeler {
        _id
      }
      label {
        name
      }
      check
    }
  }
`;
const LABEL = gql`
  mutation AddCategoryValue($id: ID, $labeler: ID, $label: String) {
    addCategoryValue(_id: $id, labeler: $labeler, label: $label)
  }
`;

const categoryList = [
  {category: 'ALL'},
  {category: 'FASHION'},
  {category: 'BEAUTY'},
  {category: 'FOOD'},
  {category: 'ENTN'},
  {category: 'LIFE'},
  {category: 'TRAVEL'},
  {category: 'ASMR'},
];

const categoryList2 = [
  {category: 'GAME'},
  {category: 'PET'},
  {category: 'TECH'},
  {category: 'FILM'},
  {category: 'CAR'},
  {category: 'MUSIC'},
  {category: 'SPORTS'},
  {category: 'FUN'},
];

const categoryList3 = [
  {category: 'POLITICS'},
  {category: 'EDU'},
  {category: 'SOCIETY'},
  {category: 'KIDS'},
  {category: 'ECONOMY'},
  {category: 'INFO'},
  {category: 'NEWS'},
  {category: 'ETC'},
];

export default function Categorization({route, navigation}) {
  const [category, setCategory] = useState({
    videoId: '',
    label: '',
  });
  const {name, labeler} = route.params;
  console.log(category);
  // console.log(name);
  // console.log(labeler);

  const [addLabel] = useMutation(LABEL);
  const {data} = useQuery(VIDEOS, {
    variables: {labeler: labeler, taskName: name},
  });
  if (data === undefined) {
    return;
  }
  // console.log(data);
  // console.log(DATA);

  const DATA = data.getRandomVideo;
  const VideoUrl = DATA.videoId;
  const title = DATA.title;
  const description = DATA.description;
  const tags = DATA.tags;
  const myArray = tags.split(',');
  // console.log(title);

  // const myArray = JSON.stringify(tags);
  // const TAGS = JSON.parse(myArray);

  // console.log(typeof myArray);
  // console.log(myArray);

  const renderItem = ({item}) => {
    const categoryTag = item.category;

    const handleInput = () => {
      setCategory(() => ({label: categoryTag, videoId: VideoUrl}));
      addLabel({
        variables: {videoId: VideoUrl, label: categoryTag},
      });
      // return navigation.navigate('Categorization');
    };

    return (
      <View>
        <TouchableOpacity>
          <Text style={styles.Button} onPress={handleInput}>
            {categoryTag}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem2 = ({item}) => {
    const categoryTag = item.category;
    const handleInput = () => {
      setCategory(() => ({label: categoryTag, videoId: VideoUrl}));
      addLabel({
        variables: {videoId: VideoUrl, label: categoryTag},
      });
      // return navigation.navigate('Categorization');
    };

    return (
      <View>
        <TouchableOpacity>
          <Text style={styles.Button} onPress={handleInput}>
            {categoryTag}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem3 = ({item}) => {
    const categoryTag = item.category;
    const handleInput = () => {
      setCategory(() => ({label: categoryTag, videoId: VideoUrl}));
      addLabel({
        variables: {videoId: VideoUrl, label: categoryTag},
      });
      // return navigation.navigate('Categorization');
    };

    return (
      <View>
        <TouchableOpacity>
          <Text style={styles.Button} onPress={handleInput}>
            {categoryTag}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // const renderItem4 = ({item}) => {
  //   console.log(item);
  //   return (
  //     <View style={styles.Tags}>
  //       <Text style={styles.tags}>{item}</Text>
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <YouTube
          style={styles.youtube}
          videoId={VideoUrl}
          apiKey="AIzaSyBpEiykhELvQ6kySUMrIPcCYfd6WvnGxkU"
          play={true}
          fullscreen={false}
          loop={false}
          onReady={e => console.log('onReady')}
          onChangeState={e => console.log('onChangeState:', e.state)}
          onChangeQuality={e => console.log('onChangeQuality: ', e.quality)}
          onError={e => console.log('onError: ', e.error)}
        />
        <Text style={styles.title}>{title}</Text>

        <View style={styles.ButtonDirection}>
          <View style={styles.Buttons}>
            <FlatList
              data={categoryList}
              renderItem={renderItem}
              keyExtractor={item => item.category}
            />
          </View>
          <View style={styles.Buttons}>
            <FlatList
              data={categoryList2}
              renderItem={renderItem2}
              keyExtractor={item => item.category}
            />
          </View>
          <View style={styles.Buttons}>
            <FlatList
              data={categoryList3}
              renderItem={renderItem3}
              keyExtractor={item => item.category}
            />
          </View>
        </View>
        <Text style={styles.description}>
          {'\n'}
          <Text style={styles.Description}>[Description]</Text>
          {'\n'}
          {'\n'}
          {description}
          {'\n'}
        </Text>
        <Text style={styles.tagTop}>
          <Text style={styles.tagsTitle}>[Tags]</Text>
          {'\n'}
          {'\n'}
          {/* <FlatList
            data={myArray}
            renderItem={renderItem4}
            keyExtractor={item => item.tags}
          /> */}
          <Text style={styles.tags}>{myArray}</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Description: {
    fontSize: 25,
  },
  description: {
    // height: 300,
    color: 'black',
    // height: 100,
  },
  tagTop: {
    // flex: 1,
    // borderWidth: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  Tags: {
    // borderWidth: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  tags: {
    color: 'black',
    borderWidth: 3,
  },
  tagsTitle: {
    color: 'black',
    fontSize: 25,
  },
  title: {
    // justifyContent: 'center',
    // alignItems: 'center',
    color: 'black',
  },
  youtube: {
    // borderWidth: 10,
    // borderColor: 'red',
    width: '100%',
    height: 300,
  },

  Button: {
    backgroundColor: '#e8e8ce',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FF0044',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#6250ed',
  },
  Buttons: {
    flex: 1,
    // borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonDirection: {
    flex: 1,
    // borderWidth: 10,
    // borderColor: 'lightblue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignitems: 'center',
    justifyContent: 'center',
    // borderWidth: 10,
    // borderColor: 'gray',
  },
});

// const {data} = await client.query(
//   {query: VIDEOS},
//   {variables: {taskName: route.params.name}},
// );
// const handleInput = e => {
//   setCategory({...category, label: e.nativeEvent.text});
// };

// return (
//   <View style={styles.container}>
//     <YouTube
//       videoId={VideoUrl}
//       apiKey="AIzaSyBpEiykhELvQ6kySUMrIPcCYfd6WvnGxkU"
//       play={true}
//       fullscreen={false}
//       loop={false}
//       onReady={e => .log('onReady')}
//       onChangeState={e => .log('onChangeState:', e.state)}
//       onChangeQuality={e => .log('onChangeQuality: ', e.quality)}
//       onError={e => .log('onError: ', e.error)}
//       style={{width: '100%', height: 300}}
//     />
//     <View style={styles.Buttons}>
//       {/* <Text>name: {route.params.name}</Text> */}
//       {/* <Text>kind: {route.params.kind}</Text> */}
//       <View style={styles.test}>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>{TEST[0]}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>FASHION</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>BEAUTY</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>FOOD</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>ENTN</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>LIFE</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>TRAVEL</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>ASMR</Text>
//         </TouchableOpacity>
//       </View>
//       <View>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>GAME</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>PET</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>TECH</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>FILM</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>CAR</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>MUSIC</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>SPORTS</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>FUN</Text>
//         </TouchableOpacity>
//       </View>
//       <View>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>POLITICS</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>EDU</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>SOCIETY</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>KIDS</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>ECONOMY</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>INFO</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>NEWS</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.category}>
//           <Text style={styles.button}>ETC</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </View>
// );
//빌드 APK 한번 해보기 배포하는 단계 경험하기
