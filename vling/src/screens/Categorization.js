import React from 'react';
import Video from 'react-native-video';
import {useQuery, gql} from '@apollo/client';
import {StyleSheet, Text, View} from 'react-native';

const VIDEOS = gql`
  query GetVideos($taskName: String) {
    getVideos(taskName: $taskName) {
      _id
      videoId
      title
      taskName
    }
  }
`;

export default function Categorization({route}) {
  const {data} = useQuery(VIDEOS, {variables: {taskName: route.params.name}});
  if (data === undefined) {
    return;
  }
  const DATA = data.getVideos[0];
  const VideoUrl = 'youtube.com/watch?v=' + DATA.videoId;
  console.log(VideoUrl);
  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={{width: 400, height: 300}}
        controls={true}
        ref={ref => {
          this.player = ref;
        }}
      />
      <View style={styles.Categorization}>
        <Text>name: {route.params.name}</Text>
        <Text>kind: {route.params.kind}</Text>
      </View>
      <Text>ALL</Text>
      <Text>FASHION</Text>
      <Text>BEAUTY</Text>
      <Text>FOOD</Text>
      <Text>ENTN</Text>
      <Text>LIFE</Text>
      <Text>TRAVEL</Text>
      <Text>ASMR</Text>
      <Text>GAME</Text>
      <Text>PET</Text>
      <Text>TECH</Text>
      <Text>FILM</Text>
      <Text>CAR</Text>
      <Text>MUSIC</Text>
      <Text>SPORTS</Text>
      <Text>FUN</Text>
      <Text>POLITICS</Text>
      <Text>EDU</Text>
      <Text>SOCIETY</Text>
      <Text>KIDS</Text>
      <Text>ECONOMY</Text>
      <Text>INFO</Text>
      <Text>NEWS</Text>
      <Text>ETC</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  Categorization: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const {data} = await client.query(
//   {query: VIDEOS},
//   {variables: {taskName: route.params.name}},
// );
