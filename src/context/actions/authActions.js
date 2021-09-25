import { 
	RESTORE_TOKEN, 
	SIGN_IN, 
	SIGN_OUT 
} from '../../constants/actionTypes';

const signInAction = (token) => {
	return {
		type: SIGN_IN,
		payload: { token }
	}
}

const signOutAction = () => {
	return {
		type: SIGN_OUT
	}
}

const restoreTokenAction = (token) => {
	return {
		type: RESTORE_TOKEN,
		payload: { token }
	}
}

export {
	signInAction,
	signOutAction,
	restoreTokenAction
}
