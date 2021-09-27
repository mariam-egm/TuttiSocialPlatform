import React, { useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValidation } from 'react-native-form-validator';

import loginSchema from '../../validationSchemas/loginSchema';
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

  const { 
    validate, 
    getErrorsInField, 
    isFieldInError 
  } = useValidation({
    state: { email, password }
  });
  

  const onLoginPress = (email, password) => {
    // validate login form
    // returns true when fields are valid
    // send login API request when validate returns true
    if(validate(loginSchema)){
      login(email, password)
      .then(response => {
        // Save token in async storage
        AsyncStorage.setItem('userToken', response.data.token)
        .then(() => 
          // dispatch signIn action to save token in context(global state)
          signIn(response.data.token)
        )
        .catch(e => console.log("async storage error", e))
      })
      .catch(error => {
        //handle errors
        console.log("login error", error.response.data)
      })
    }
  }

  return (
    <>
      <View style={styles.inputFieldContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onEmailChange}
          value={email}
          placeholder={'Email'}
        />
        {isFieldInError('email') && getErrorsInField('email').map((errorMessage, index) => 
          <Text style={styles.errorText} key={index}>{errorMessage}</Text>
        )}
      </View>
      <View style={styles.inputFieldContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onPasswordChange}
          value={password}
          placeholder={'Password'}
          secureTextEntry={true}
        />
        {isFieldInError('password') && getErrorsInField('password').map(errorMessage => 
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
      </View>
      
      <GeneralButton 
        title='LOGIN' 
        type={PRIMARY}
        onPress={() => onLoginPress(email, password, signIn)} 
      />
    </>
  )
}

export default Login;
