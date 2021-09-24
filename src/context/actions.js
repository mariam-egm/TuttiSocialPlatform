import { SIGN_IN, SIGN_OUT } from '../constants/actionTypes';

const signInAction = (token) => {
	return {
		type: SIGN_IN,
		payload: token
	}
}

const signOutAction = () => {
	return {
		type: SIGN_OUT
	}
}

export {
	signInAction,
	signOutAction
}
