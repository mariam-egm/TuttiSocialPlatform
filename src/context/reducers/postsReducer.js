import { SET_LOADING } from '../../constants';
import { 
	GET_POSTS,
	GET_MORE_POSTS, 
	SET_RETRIEVE_TYPE
} from '../../constants/postActionTypes';

const postsReducer = (prevState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return {
				...prevState,
				posts: action.payload.posts,
				isLoading: false,
			};
		case GET_MORE_POSTS:
			return {
				...prevState,
				posts: [
					...prevState.posts,
					...action.payload.newPosts
				],
				isLoading: false,
			};
		case SET_LOADING:
			return {
				...prevState,
				isLoading: action.payload.loading
			}
		case SET_RETRIEVE_TYPE:
			return {
				...prevState,
				retrievePostsType: action.payload.type,
				retreivePostTypeId: action.payload.id
			}
		default:
			return {
				...prevState,
				isLoading: false
			};
	}
}

export default postsReducer;
