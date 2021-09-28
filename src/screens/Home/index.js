import React, 
{ 
	useEffect, 
	useState, 
	useReducer, 
	useMemo, 
	useContext 
} from 'react';
import { 
	View, 
	Text, 
	TouchableOpacity, 
	FlatList
} from 'react-native';

import { getTags } from '../../APIRequests/Tags';
import { addIndex } from '../../utils/FlatListUtil';
import { getPosts as getPostsRequest } from '../../APIRequests/Posts';
import PostsList from '../../components/PostsList';
import ActiveUsersDropDown from '../../components/ActiveUsersDropDown';
import PostsContext from '../../context/contexts/postContext';
import postsReducer from '../../context/reducers/postsReducer';
import {
  getPostsAction,
  getMorePostsAction
} from '../../context/actions/postActions';
import { setLoadingAction } from '../../context/actions/postActions';
import { BY_TAG } from '../../constants/getPostType';
import styles from './style';

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
			getPostSelector: () => state.posts,
			setLoading: (loading) => {
				dispatch(setLoadingAction(loading))
			},
			getLoading: () => state.isLoading
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

const Tags = () => {
	const [tags, setTags] = useState([]);
	const { getPosts, setLoading, getLoading } = useContext(PostsContext);
	const [tagLoading, setTagLoading] = useState(false);

	useEffect(() => {
		setTagLoading(true);
		getTags()
		.then(response => {
			setTags(addIndex(response.data.data));
			setTagLoading(false);
		})
		.catch(error => { 
			console.log('tags', error);
			setTagLoading(false);
		})
	}, []);

	const renderItem = ({ item }) => (
		<TagCard disabled={getLoading()} title={item.name} onTagPress={() => onTagPress(item.name)} />
	);

	const onTagPress = (tagName) => {
		setLoading(true)
		getPostsRequest({
			pageNumber: 0,
			getPostsType: BY_TAG,
			id: tagName
		})
		.then(response => {
			getPosts(response.data.data)
			setLoading(false)
		})
		.catch(error => {
			console.log("from home error", error)
			setLoading(false)
		})
	}

  return (
	<>
		<Text style={styles.tagsTitle}>Tags</Text> 
		<FlatList
			data={tags}
			renderItem={renderItem}
			keyExtractor={item => item.id}
			horizontal
			refreshing={tagLoading}
			onRefresh={() => {}}
		/>
	</>
  )
}

const TagCard = ({title, onTagPress, disabled}) => {
  return (
	<TouchableOpacity 
		style={styles.tagCardContainer}
		onPress={onTagPress}
		disabled={disabled}
	>
		<Text style={styles.tagName}>{title}</Text>
	</TouchableOpacity>
  )
}

export default Home;
