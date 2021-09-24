import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import { getTags } from '../../APIRequests/Tags';
import { addIndex } from '../../utils/FlatListUtil';
import styles from './style';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.activeUsersContainer}>
        <ActiveUsersDropDown />
      </View>
      <View style={styles.tagsContainer}>
        <Tags />
      </View>
      <View style={styles.postsContainer}>

      </View>
		</View>
  );
}

const ActiveUsersDropDown = () => {
  return (
    <TouchableOpacity 
      onPress={ () => console.log("pressed!")}
      style={styles.showUsersContainer}
    >
      <Text style={styles.showUsersTitle}>Active Users</Text>
    </TouchableOpacity>
  )
}

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags()
    .then(response => setTags(addIndex(response.data.data)))
    .catch(error => console.log('tags', error))
  }, []);

  const renderItem = ({ item }) => (
    <TagCard title={item.name} />
  );

  return (
    <View>
      <Text style={styles.tagsTitle}>Tags</Text> 
        <FlatList
          data={tags}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
        />
    </View>
  )
}

const TagCard = ({title}) => {
  return (
    <TouchableOpacity style={styles.tagCardContainer}>
      <Text style={styles.tagName}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Home;
