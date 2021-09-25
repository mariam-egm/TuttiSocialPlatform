import React, {useReducer, useMemo, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import BottomTabNavigator from './src/navigation/TabNavigator';
import { AuthStackNavigator } from './src/navigation/StackNavigator';
import {signInAction, signOutAction} from './src/context/actions';
import AuthContext from './src/context/authContext';
import reducer from './src/context/reducer';

const App = () => {
  const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const authContext = useMemo(
    () => ({
      signIn: (username, password) => {
        dispatch(signInAction('dummy_token'));
      },
      signOut: () => dispatch(signOutAction())
    }),
    []
  );
  
  useEffect(() => {
    SplashScreen.hide();
  }, []);


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.isSignout? 
          <AuthStackNavigator />
          :
          <BottomTabNavigator />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
