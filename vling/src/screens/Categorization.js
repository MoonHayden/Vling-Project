import React, {useState} from 'react';
import YouTube from 'react-native-youtube';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useQuery, gql, useMutation} from '@apollo/client';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';

const VIDEOS = gql`
  query GetRandomVideo($taskName: String) {
    getRandomVideo(taskName: $taskName) {
      videoId
      title
      description
      tags
    }
  }
`;
const LABEL = gql`
  mutation AddCategoryValue($videoId: String, $label: String) {
    addCategoryValue(videoId: $videoId, label: $label) {
      name
    }
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

export default function Categorization({route}) {
  const [category, setCategory] = useState({
    videoId: '',
    label: '',
  });

  const [addLabel] = useMutation(LABEL);

  const {data} = useQuery(VIDEOS, {variables: {taskName: route.params.name}});
  if (data === undefined) {
    return;
  }

  const DATA = data.getRandomVideo[0];
  const VideoUrl = DATA.videoId;

  console.log(category);

  const renderItem = ({item}) => {
    // console.log(item);
    const categoryTag = item.category;

    const handleInput = () => {
      setCategory(() => ({label: categoryTag, videoId: VideoUrl}));
      addLabel({
        variables: {videoId: VideoUrl, label: categoryTag},
      });
    };
    // console.log(categoryTag);

    return (
      <View>
        <TouchableOpacity>
          <Text style={styles.button} onPress={handleInput}>
            {categoryTag}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem2 = ({item}) => {
    // console.log(item);
    const categoryTag = item.category;
    const handleInput = () => {
      setCategory(() => ({label: categoryTag, videoId: VideoUrl}));
      addLabel({
        variables: {videoId: VideoUrl, label: categoryTag},
      });
    };
    // console.log(categoryTag);
    return (
      <View>
        <TouchableOpacity>
          <Text style={styles.button} onPress={handleInput}>
            {categoryTag}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem3 = ({item}) => {
    // console.log(item);
    const categoryTag = item.category;
    const handleInput = () => {
      setCategory(() => ({label: categoryTag, videoId: VideoUrl}));
      addLabel({
        variables: {videoId: VideoUrl, label: categoryTag},
      });
    };
    // console.log(categoryTag);
    return (
      <View>
        <TouchableOpacity>
          <Text style={styles.button} onPress={handleInput}>
            {categoryTag}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <YouTube
        videoId={VideoUrl}
        apiKey="AIzaSyBpEiykhELvQ6kySUMrIPcCYfd6WvnGxkU"
        play={true}
        fullscreen={false}
        loop={false}
        onReady={e => console.log('onReady')}
        onChangeState={e => console.log('onChangeState:', e.state)}
        onChangeQuality={e => console.log('onChangeQuality: ', e.quality)}
        onError={e => console.log('onError: ', e.error)}
        style={{width: '100%', height: 300}}
      />
      <View style={styles.Buttons}>
        <FlatList
          data={categoryList}
          renderItem={renderItem}
          keyExtractor={item => item.category}
        />
        <FlatList
          data={categoryList2}
          renderItem={renderItem2}
          keyExtractor={item => item.category}
        />

        <FlatList
          data={categoryList3}
          renderItem={renderItem3}
          keyExtractor={item => item.category}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#e8e8ce',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#FF0044',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#6250ed',
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  test: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  category: {
    // backgroundColor: 'blue',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

// const {data} = await client.query(
//   {query: VIDEOS},
//   {variables: {taskName: route.params.name}},
// );
// const handleInput = e => {
//   setCategory({...category, label: e.nativeEvent.text});
// };

// console.log(category);
// console.log(VideoUrl);
// return (
//   <View style={styles.container}>
//     <YouTube
//       videoId={VideoUrl}
//       apiKey="AIzaSyBpEiykhELvQ6kySUMrIPcCYfd6WvnGxkU"
//       play={true}
//       fullscreen={false}
//       loop={false}
//       onReady={e => console.log('onReady')}
//       onChangeState={e => console.log('onChangeState:', e.state)}
//       onChangeQuality={e => console.log('onChangeQuality: ', e.quality)}
//       onError={e => console.log('onError: ', e.error)}
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
