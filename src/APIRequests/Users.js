import axios from 'axios';
import { APP_ID, DUMMY_API_URL } from '@env';

const getActiveUsers = (pageNumber = 0) => {
	const url = `${DUMMY_API_URL}/user?page=${pageNumber}&limit=10`;
	const options = {
		headers: {
			'app-id': APP_ID
		}
	}

	return axios.get(url, options)
}

export {
	getActiveUsers
}