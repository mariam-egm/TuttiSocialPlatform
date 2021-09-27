import { 
	GET_POSTS,
	GET_MORE_POSTS 
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
		default:
			return {
				...prevState,
				isLoading: false
			};
	}
}

export default postsReducer;
