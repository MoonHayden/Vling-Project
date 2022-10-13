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
  Alert,
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
    }
  }
`;
// const LABEL = gql`
//   mutation AddCategoryValue($id: ID, $labeler: ID, $label: String) {
//     addCategoryValue(_id: $id, labeler: $labeler, label: $label)
//   }
// `;
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
  {category: 'GAME'},
  {category: 'PET'},
  {category: 'TECH'},
  {category: 'FILM'},
  {category: 'CAR'},
  {category: 'MUSIC'},
  {category: 'SPORTS'},
  {category: 'FUN'},
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
    id: '',
    labeler: '',
    label: '',
  });
  const {name, labeler} = route.params;
  console.log(category);
  // console.log(name);
  // console.log(labeler);

  const [addLabel] = useMutation(LABEL);

  const {data, refetch, error} = useQuery(VIDEOS, {
    variables: {labeler: labeler, taskName: name},
  });

  if (data === undefined) {
    return;
  }

  const DATA = data.getRandomVideo;
  const VideoUrl = DATA.videoId;
  const title = DATA.title;
  const description = DATA.description;
  const tags = DATA.tags;
  const myArray = tags.split(',');
  const VideoObjectId = DATA._id;
  // console.log(DATA);
  // console.log(title);
  // const myArray = JSON.stringify(tags);
  // const TAGS = JSON.parse(myArray);
  // console.log(typeof myArray);
  // console.log(myArray);

  const renderItem = ({item}) => {
    const categoryTag = item.category;

    const showAlert = err => {
      Alert.alert('Alert Title', err, [
        {text: 'OK', onPress: () => console.log('ok')},
      ]);
    };

    const handleInput = async () => {
      setCategory(() => ({
        id: VideoObjectId,
        labeler: labeler,
        label: categoryTag,
      }));
      addLabel({
        variables: {id: VideoObjectId, labeler: labeler, label: categoryTag},
      });
      refetch();
      if (error) {
        showAlert(error.message); // navigation.navigate('Categories');
        navigation.navigate('MainScreen');
        navigation.navigate('MainScreen');
      }
    };
    return (
      <View style={styles.categoryWrap}>
        <TouchableOpacity>
          <Text style={styles.categoryName} onPress={handleInput}>
            {categoryTag}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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
        <View style={styles.flatWrap}>
          <FlatList
            data={categoryList}
            renderItem={renderItem}
            keyExtractor={item => item.category}
            numColumns={3}
          />
        </View>
        <Text style={styles.description}>
          {'\n'}
          <Text style={styles.Description}>[Description]</Text>
          {'\n'}
          {'\n'}
          {description}
          {'\n'}
        </Text>
        <Text>
          <Text style={styles.tagsTitle}>[Tags]</Text>
          {'\n'}
          {'\n'}
          <Text style={styles.tags}>{myArray}</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryWrap: {
    alignItems: 'center',
    borderRadius: 5,
    width: 100,
    marginTop: 8,
    marginLeft: 17,
    marginRight: 17,
    backgroundColor: '#FFBFCB',
  },
  categoryName: {
    color: '#7f424d',

    fontSize: 17,
  },
  Description: {
    fontSize: 25,
  },
  description: {
    color: 'black',
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
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
  },
  youtube: {
    width: '100%',
    height: 300,
  },
  container: {
    flex: 1,

    backgroundColor: 'white',
    alignitems: 'center',
    justifyContent: 'center',
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

// const renderItem2 = ({item}) => {
//   const categoryTag = item.category;
//   const handleInput = () => {
//     setCategory(() => ({label: categoryTag, videoId: VideoUrl}));
//     addLabel({
//       variables: {videoId: VideoUrl, label: categoryTag},
//     });
//     // window.location.reload();
//     // return navigation.navigate('Categorization');
//   };

//   return (
//     <View>
//       <TouchableOpacity>
//         <Text style={styles.Button} onPress={handleInput}>
//           {categoryTag}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// const renderItem3 = ({item}) => {
//   const categoryTag = item.category;
//   const handleInput = () => {
//     setCategory(() => ({label: categoryTag, videoId: VideoUrl}));
//     addLabel({
//       variables: {videoId: VideoUrl, label: categoryTag},
//     });
//     // return navigation.navigate('Categorization');
//   };

//   return (
//     <View>
//       <TouchableOpacity>
//         <Text style={styles.Button} onPress={handleInput}>
//           {categoryTag}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const renderItem4 = ({item}) => {
//   console.log(item);
//   return (
//     <View style={styles.Tags}>
//       <Text style={styles.tags}>{item}</Text>
//     </View>
//   );
// };

// const categoryList2 = [
//   {category: 'GAME'},
//   {category: 'PET'},
//   {category: 'TECH'},
//   {category: 'FILM'},
//   {category: 'CAR'},
//   {category: 'MUSIC'},
//   {category: 'SPORTS'},
//   {category: 'FUN'},
// ];

// const categoryList3 = [
//   {category: 'POLITICS'},
//   {category: 'EDU'},
//   {category: 'SOCIETY'},
//   {category: 'KIDS'},
//   {category: 'ECONOMY'},
//   {category: 'INFO'},
//   {category: 'NEWS'},
//   {category: 'ETC'},
// ];

// useEffect(() => {
//   console.log('data', data);
// }, [data]);
// const {Data} = useLazyQuery(VIDEOS, {
//   variables: {labeler: labeler, taskName: name},
// });
// useEffect((
//data 유즈쿼리
//유즈쿼리 날려서 받아온 데이터를 ㅅ긑에ㅣ트 에 저장하고
// ),[])
//핸들러에 이제 또 유즈쿼라 날려서
// 셋스테이트에 저장해서 업데이트 시키기
// console.log(data);
