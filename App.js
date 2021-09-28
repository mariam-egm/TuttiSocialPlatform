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
} from './src/context/actions/authActions';
import AuthContext from './src/context/contexts/authContext';
import authReducer from './src/context/reducers/authReducer';

const App = () => {
  const initialState = {
    isLoading: true,
    userToken: null,
    userRole: ''
  }
  
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let userRole;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userRole = await AsyncStorage.getItem('userRole');
      } catch (e) {
        // Restoring token failed
      }
      dispatch(restoreTokenAction(userToken, userRole));
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: (token, userRole) => dispatch(signInAction(token, userRole)),
      signOut: () => dispatch(signOutAction()),
      getRole: () => state.userRole
    }),
    [state]
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
