import React from 'react';
import { View, Text, TextInput } from 'react-native';

import GeneralButton from '../../components/GeneralButton';
import { PRIMARY } from '../../constants/buttonTypes';
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
        onPress={() => console.log('login pressed!')} 
      />
    </View>
  )
}


export default Login;
