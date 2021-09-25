import { 
	GET_POSTS,
  GET_MORE_POSTS 
} from '../../constants/getPostsTypes';

const initialState = {
  posts: [],
  isLoading: true
}

const postsReducer = (prevState = initialState, action) => {
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
				isLoading = false
			};
  }
}

export default postsReducer;
