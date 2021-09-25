import axios from 'axios';
import { APP_ID, DUMMY_API_URL } from '@env';

const getPosts = (pageNumber = 0) => {
    //TODO: set 10 in constants
	const url = `${DUMMY_API_URL}/post?page=${pageNumber}&limit=10`;
	const options = {
		headers: {
			'app-id': APP_ID
		}
	}
	
	return axios.get(url, options)
}

export {
	getPosts
}