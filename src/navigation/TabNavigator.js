import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Settings from '../screens/Settings';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Settings" component={Settings} />
		</Tab.Navigator>
	);
};
  
export default BottomTabNavigator;
