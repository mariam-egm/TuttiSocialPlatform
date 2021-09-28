import { 
	GET_POSTS,
	GET_MORE_POSTS,
	SET_RETRIEVE_TYPE
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

const setRetrievePostsTypeAction = (type, id) => {
	return {
		type: SET_RETRIEVE_TYPE,
		payload: { type, id }
	}
}

const setLoadingAction = loading => {
	return {
		type: SET_LOADING,
		payload: { loading }
	}
}

export {
	getMorePostsAction,
	getPostsAction,
	setLoadingAction,
	setRetrievePostsTypeAction
}
