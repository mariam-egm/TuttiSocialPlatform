import React, { useContext } from 'react';
import { Text, Button } from 'react-native';

import AuthContext from '../context/authContext';

const Login = () => {
	const { signIn } = useContext(AuthContext);

  return (
		<>
			<Text>Hello, I am your Login!</Text>
			<Button title="Login" onPress={() => signIn('dummyName', 'dummy_password')} />
		</>
  );
}

export default Login;
