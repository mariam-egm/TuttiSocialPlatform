import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from '../../context/contexts/authContext';
import GeneralButton from '../../components/GeneralButton';
import styles from './style';

const Settings = () => {
	const { signOut } = useContext(AuthContext);

	const onSignOutPress = async () => {
		await AsyncStorage.removeItem('userToken')
		signOut()
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Settings</Text>
			<View style={styles.body}>
				<Text style={styles.mainMessage}>We are always happy to have you with us!</Text>
				<Text style={styles.logoutQuestion}>Are you sure you want to logout?</Text>
				<GeneralButton 
				title="Logout"
				onPress={onSignOutPress}
				/>
			</View>
		</View>
	);
}

export default Settings;
