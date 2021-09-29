import React, { useReducer, useMemo } from 'react';
import { View } from 'react-native';

import PostsList from '../../components/PostsList';
import Tags from '../../components/Tags';
import ActiveUsersDropDown from '../../components/ActiveUsersDropDown';
import PostsContext from '../../context/contexts/postContext';
import postsReducer from '../../context/reducers/postsReducer';
import {
  getPostsAction,
  getMorePostsAction
} from '../../context/actions/postActions';
import { setLoadingAction, setRetrievePostsTypeAction } from '../../context/actions/postActions';
import { DEFAULT } from '../../constants/getPostType';
import styles from './style';

const Home = ({navigation}) => {
	// Initialize state to send to useReducer
	const initialState = {
		posts: [],
		isLoading: true,
		retrievePostsType: DEFAULT,
		retreivePostTypeId: ''
	}
	
	// Use useReducer, useContext from ReactJS
	// Please note:
	// Another implementation could have been done using "Redux"
	// We would have had "containers" for screens containing props,
	// selectors(selecting values from global state)
	// dispatcher, for actions to change in the state
	// mapStateToProps and mapDispatchToProps
	// Here I used context from ReactJS to be suitable
	// with the simplicity of the project and the state
	const [state, dispatch] = useReducer(postsReducer, initialState);
	const postContext = useMemo(
		() => ({
			getPosts: posts => dispatch(getPostsAction(posts)),
			getMorePosts: posts => dispatch(getMorePostsAction(posts)),
			setLoading: loading => dispatch(setLoadingAction(loading)),
			setRetrievePostsType: ({type, id}) => dispatch(setRetrievePostsTypeAction(type, id)),
			getPostSelector: () => state.posts,
			getLoading: () => state.isLoading,
			getRetrievePostsType: () => state.retrievePostsType,
			getRetrievePostTypeId: () => state.retreivePostTypeId
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
					<PostsList navigation={navigation} />
				</View>
			</View>
		</PostsContext.Provider>
	);
}

export default Home;
