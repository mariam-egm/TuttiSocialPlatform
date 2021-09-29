import axios from 'axios';
import { APP_ID, DUMMY_API_URL } from '@env';
import { BY_TAG, BY_USER } from '../constants/getPostType';

const getPosts = ({ pageNumber = 0, getPostsType, id }) => {
	// let default path for retrieving posts is 'post'
	// check on the type the user would like to retrieve the posts with
	// set the path depending on the getPostsType
	let path = 'post';
	switch(getPostsType) {
		case BY_USER:
			path = `user/${id}/post` 
			break;
		case BY_TAG:
			path = `tag/${id}/post`
			break;		
	}
	const url = `${DUMMY_API_URL}/${path}?page=${pageNumber}&limit=10`;

	const options = {
		headers: {
			'app-id': APP_ID
		}
	}
	
	return axios.get(url, options)
}

const createPost = ({text}) => {
	const url = `${DUMMY_API_URL}/post/create`;
	// get userId from async storage when provided in login 
	// Using static id from dummyapi users for now
	// Please note: 
	// Dummyapi is used for creation post
	// Reqres is used for auth and does not provide user data
	const owner = '60d0fe4f5311236168a109ca';
	const data = { 
		owner,
		text 
	}

	const options = {
		headers: {
			'app-id': APP_ID
		}
	}

	return axios.post(url, data, options);
}

const deletePost = postId => {
	const url = `${DUMMY_API_URL}/post/${postId}`;

	const options = {
		headers: {
			'app-id': APP_ID
		}
	}

	return axios.delete(url, options);
}

const getPost = postId => {
	const url = `${DUMMY_API_URL}/post/${postId}`;

	const options = {
		headers: {
			'app-id': APP_ID
		}
	}

	return axios.get(url, options);
}

export {
	getPosts,
	createPost,
	deletePost,
	getPost
}