import { RESTORE_TOKEN, SIGN_IN, SIGN_OUT } from '../constants/actionTypes';

const Reducer = (prevState, action) => {
  console.log('reducer', action)
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...prevState,
        userToken: action.payload.token,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...prevState,
        userToken: action.payload.token,
      };
    case SIGN_OUT:
      return {
        ...prevState,
        userToken: null,
      };
  }
}

export default Reducer;
