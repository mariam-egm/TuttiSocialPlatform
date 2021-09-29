import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Settings from '../screens/Settings';
import NewPost from '../screens/NewPost';
import colors from '../constants/colors';
import { PostStackNavigator } from './StackNavigator';

const Tab = createBottomTabNavigator();

// Bottom tab navigator consists of Home, New Post, Settings screens
const BottomTabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{ 
				headerShown: false, 
				tabBarActiveTintColor: colors.primaryColor 
			}}
		>
			<Tab.Screen 
				name="Home" 
				component={PostStackNavigator} 
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color }) => (
					  <Entypo name="home" color={color} size={36} />
					),
				}}
			/>
			<Tab.Screen name="NewPost" component={NewPost} 
				options={{
					tabBarLabel: 'New Post',
					tabBarIcon: ({ color }) => (
					  <MaterialIcons name="add-box" color={color} size={36} />
					),
				}}
			/>
			<Tab.Screen 
				name="Settings" 
				component={Settings} 
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: ({ color }) => (
					  <MaterialIcons name="settings" color={color} size={36} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};
  
export default BottomTabNavigator;
