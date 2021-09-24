import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Settings from '../screens/Settings';
import Home from '../screens/Home';
import NewPost from '../screens/NewPost';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{ 
				headerShown: false, 
				tabBarActiveTintColor: colors.primaryColor 
			}}
		>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="NewPost" component={NewPost} 
				options={{title:'New Post'}}
			/>
			<Tab.Screen name="Settings" component={Settings} />
		</Tab.Navigator>
	);
};
  
export default BottomTabNavigator;
