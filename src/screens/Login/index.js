import React, { useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from '../../context/contexts/authContext';
import GeneralButton from '../../components/GeneralButton';
import { PRIMARY } from '../../constants/buttonTypes';
import { login } from '../../APIRequests/Auth';
import styles from './style';

const Login = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome to Tutti!</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
      </View>
    </>
  );
}

const LoginForm = () => {
  const { signIn } = useContext(AuthContext);

  const [email, onEmailChange] = React.useState('');
  const [password, onPasswordChange] = React.useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onEmailChange}
        value={email}
        placeholder={'Email'}
      />
      <TextInput
        style={styles.input}
        onChangeText={onPasswordChange}
        value={password}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      <GeneralButton 
        title='LOGIN' 
        type={PRIMARY}
        onPress={() => onLoginPress(email, password, signIn)} 
      />
    </View>
  )
}

const onLoginPress = (email, password, signIn) => {
  login(email, password)
  .then(response => {
    AsyncStorage.setItem('userToken', response.data.token)
    .then(() => signIn(response.data.token))
    .catch(e => console.log("async storage error", e))
  })
  .catch(error => {
    //handle errors
    console.log("login error", error.response.data)
  })
}

export default Login;
