import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValidation } from 'react-native-form-validator';
import Snackbar from 'react-native-snackbar';

import loginSchema from '../../validationSchemas/loginSchema';
import AuthContext from '../../context/contexts/authContext';
import { login } from '../../APIRequests/Auth';
import GeneralButton from '../../components/GeneralButton';
import Popup from '../../components/Popup';
import { SCREEN_CENTER } from '../../constants/popupType';
import { PRIMARY } from '../../constants/buttonTypes';
import images from '../../constants/images';
import { ADMIN, NORMAL_USER } from '../../constants/userRoles';
import styles from './style';

const Login = () => {
	return (
		<>
			<View style={styles.container}>
				<View style={styles.welcomeContainer}>
					<Text style={styles.welcomeTitleText}>Welcome to Tutti!</Text>
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

	const [email, onEmailChange] = useState('');
	const [password, onPasswordChange] = useState('');
	const [loading, setLoading] = useState(false);
	const [showWelcomePopup, setShowWelcomePopup] = useState(false);

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
		setLoading(true)
		if(!validate(loginSchema)){
			setLoading(false)
		} else {
			login(email, password)
			.then(response => {
				// Calculate role
				const role = email === 'michael.lawson@reqres.in' ? ADMIN : NORMAL_USER;
				// Save token and user data in async storage
				AsyncStorage.setItem('userToken', response.data.token)
				AsyncStorage.setItem('userEmail', email)
				AsyncStorage.setItem('userRole', role)
				.then(() => {
					setLoading(false)
					// show Welcome Popup and hide it after 4 seconds
					setShowWelcomePopup(true)
					setTimeout(() => setShowWelcomePopup(false), 2000);
					// dispatch signIn action to save token in context(global state)
					setTimeout(() => signIn(response.data.token, role), 2000);
				})
				.catch(e => {
					// handle error
					setLoading(false)
				})
			})
			.catch(error => {
				//handle errors
				setLoading(false);
				Snackbar.show({
					text: error.response.data.error,
					duration: Snackbar.LENGTH_SHORT,
				});
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
				{/** show error when there is an error from validator */}
				{isFieldInError('email') && getErrorsInField('email').map((errorMessage, index) => 
				<Text key={index} style={styles.errorText}>{errorMessage}</Text>
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
				{/** show error when there is an error from validator */}
				{isFieldInError('password') && getErrorsInField('password').map(errorMessage => 
				<Text style={styles.errorText}>{errorMessage}</Text>
				)}
			</View>
			<GeneralButton 
				title='LOGIN' 
				type={PRIMARY}
				onPress={() => onLoginPress(email, password, signIn)}
				loading={loading} 
			/>
			<Popup showPopup={showWelcomePopup} type={SCREEN_CENTER}>
				<Text style={styles.welcomeText}>Welcome </Text>
				<Text style={styles.emailText}>{email} </Text>
				<Text style={styles.welcomeText}>to Tutti!</Text>
				<Image
					source={images.celebrate}
					style={styles.welcomeImage}
				/>
			</Popup>
		</>
	)
}

export default Login;
