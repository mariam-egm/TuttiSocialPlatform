import React, 
{ 
  useEffect, 
  useState, 
  useReducer, 
  useMemo, 
  useContext 
} from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import { getTags } from '../../APIRequests/Tags';
import { addIndex } from '../../utils/FlatListUtil';
import { getPosts as getPostsRequest } from '../../APIRequests/Posts';
import PostsList from '../../components/PostsList';
import styles from './style';
import PostsContext from '../../context/contexts/postContext';
import postsReducer from '../../context/reducers/postsReducer';
import {
  getPostsAction,
  getMorePostsAction
} from '../../context/actions/postActions';
import { BY_TAG } from '../../constants/getPostType';

const Home = () => {
  const initialState = {
		posts: [],
		isLoading: true
	}
	
	const [state, dispatch] = useReducer(postsReducer, initialState);
  const postContext = useMemo(
    () => ({
      getPosts: (posts) => {
        dispatch(getPostsAction(posts));
      },
			getMorePosts: (posts) => {
				dispatch(getMorePostsAction(posts));
			},
      getPostSelector: () => { 
        return state.posts
      }  
		}),[state]
	);

  return (
    <PostsContext.Provider value={postContext}>
      <View style={styles.container}>
        <View style={styles.activeUsersContainer}>
          <ActiveUsersDropDown />
        </View>
        <View style={styles.tagsContainer}>
          <Tags />
        </View>
        <View style={styles.postsContainer}>
          <PostsList />
        </View>
      </View>
    </PostsContext.Provider>
  );
}

const ActiveUsersDropDown = () => {
  return (
    <TouchableOpacity 
      onPress={() => console.log("pressed!")}
      style={styles.showUsersContainer}
    >
      <Text style={styles.showUsersTitle}>Active Users</Text>
    </TouchableOpacity>
  )
}

const Tags = () => {
  const [tags, setTags] = useState([]);
  const { getPosts } = useContext(PostsContext);

  useEffect(() => {
    getTags()
    .then(response => setTags(addIndex(response.data.data)))
    .catch(error => console.log('tags', error))
  }, []);

  const renderItem = ({ item }) => (
    <TagCard title={item.name} onTagPress={() => onTagPress(item.name)} />
  );

  const onTagPress = (tagName) => {
    getPostsRequest({
      pageNumber: 0,
      getPostsType: BY_TAG,
      id: tagName
    })
		.then(response => getPosts(response.data.data))
		.catch(error => console.log("from home error", error))
  }

  return (
    <>
      <Text style={styles.tagsTitle}>Tags</Text> 
        <FlatList
          data={tags}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
        />
    </>
  )
}

const TagCard = ({title, onTagPress}) => {
  return (
    <TouchableOpacity 
      style={styles.tagCardContainer}
      onPress={onTagPress}
    >
      <Text style={styles.tagName}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Home;
