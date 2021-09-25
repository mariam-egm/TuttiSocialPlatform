import { 
	GET_POSTS,
	GET_MORE_POSTS
} from '../../constants/postActionTypes';

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

export {
	getMorePostsAction,
	getPostsAction
}
