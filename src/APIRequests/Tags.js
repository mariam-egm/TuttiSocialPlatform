import axios from 'axios';
import { APP_ID, DUMMY_API_URL } from '@env';

const getTags = () => {
	// get all tags
	const url = `${DUMMY_API_URL}/tag`;
	const options = {
		headers: {
			'app-id': APP_ID
		}
	}

	return axios.get(url, options)
}

export {
	getTags
}