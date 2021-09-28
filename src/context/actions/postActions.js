import { 
	GET_POSTS,
	GET_MORE_POSTS
} from '../../constants/postActionTypes';
import { SET_LOADING } from '../../constants';

const getPostsAction = (posts) => {
	return {
		type: GET_POSTS,
		payload: { posts }
	}
}

const getMorePostsAction = (newPosts) => {
	return {
		type: GET_MORE_POSTS,
		payload: { newPosts }
	}
}

const setLoadingAction = (loading) => {
	return {
		type: SET_LOADING,
		payload: { loading }
	}
}

export {
	getMorePostsAction,
	getPostsAction,
	setLoadingAction
}
