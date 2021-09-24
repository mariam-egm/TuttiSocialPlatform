import React from 'react';
import {
  SafeAreaView,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <Text>Hello here</Text>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
