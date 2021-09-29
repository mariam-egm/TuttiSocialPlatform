import { 
  RESTORE_TOKEN,
  SIGN_IN, 
  SIGN_OUT 
} from '../../constants/authActionTypes';

const authReducer = (prevState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...prevState,
        userToken: action.payload.token,
        userRole: action.payload.userRole
      };
    case SIGN_IN:
      return {
        ...prevState,
        userToken: action.payload.token,
        userRole: action.payload.userRole
      };
    case SIGN_OUT:
      return {
        ...prevState,
        userToken: null,
        userRole: ''
      };
  }
}

export default authReducer;
