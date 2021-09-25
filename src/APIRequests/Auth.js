import axios from 'axios';
import { REQRES_API_URL } from '@env';

const login = (email, password) => {
	const url = `${REQRES_API_URL}/api/login`; 
	const data = { email, password }
	
	return axios.post(url, data);
}

export {
	login
}