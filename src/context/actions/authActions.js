import { 
	RESTORE_TOKEN, 
	SIGN_IN, 
	SIGN_OUT 
} from '../../constants/authActionTypes';

const signInAction = (token, userRole) => {
	return {
		type: SIGN_IN,
		payload: { token, userRole }
	}
}

const signOutAction = () => {
	return {
		type: SIGN_OUT
	}
}

const restoreTokenAction = (token, userRole) => {
	return {
		type: RESTORE_TOKEN,
		payload: { token, userRole }
	}
}

export {
	signInAction,
	signOutAction,
	restoreTokenAction
}
