import React, {useReducer, useMemo, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomTabNavigator from './src/navigation/TabNavigator';
import { AuthStackNavigator } from './src/navigation/StackNavigator';
import { 
  signInAction, 
  signOutAction,
  restoreTokenAction
} from './src/context/actions';
import AuthContext from './src/context/authContext';
import reducer from './src/context/reducer';

const App = () => {
  const initialState = {
    isLoading: true,
    userToken: null,
  }

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      dispatch(restoreTokenAction(userToken));
    };

    bootstrapAsync();
  }, []);

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
        {!state.userToken? 
          <AuthStackNavigator />
          :
          <BottomTabNavigator />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
