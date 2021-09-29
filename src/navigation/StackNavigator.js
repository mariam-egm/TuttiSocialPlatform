import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Home from '../screens/Home';
import PostDetails from '../screens/PostDetails';
import colors from '../constants/colors';

const Stack = createNativeStackNavigator();

// Auth Stach navigator consists of Login Screen
const AuthStackNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	);
}
  
// PostStack Navigator consists of All Posts screen and PostDetails screen
const PostStackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen 
				name="Posts" 
				component={Home} 
				options={{ headerShown: false }} 
			/>
			<Stack.Screen
				name="PostDetails"
				component={PostDetails}
				options={{
					title: 'Post Details',
					headerStyle: {
						backgroundColor: colors.primaryColor,
					},
					headerTitleStyle: {
						color: colors.white,
					},
				}}
			/>
		</Stack.Navigator>
	);
}


export { AuthStackNavigator, PostStackNavigator };
