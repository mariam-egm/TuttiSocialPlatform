import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Loader from '../../components/Loader';
import { PRIMARY, SECONDARY } from '../../constants/buttonTypes';
import styles from './style';

const GeneralButton = ({onPress, title, type, loading}) => {
	return (
		<TouchableOpacity onPress={onPress} style={getStyle(type)}>
		{/** display loading or button title depending on loading param */}
			{loading? 
				<Loader /> 
				:
				<Text style={getTitleStyle(type)}>{title}</Text>
			}
		</TouchableOpacity>
	);
}

const getStyle = type => {
// return style depending on the type of the button
	switch(type) {
		case PRIMARY:
			return styles.primaryContainer
		case SECONDARY:
			return styles.secondaryContainer
		default:
			return styles.primaryContainer
	}
} 

const getTitleStyle = type => {
	// return title style depending on the type of the button
	switch(type) {
		case PRIMARY:
			return styles.primaryTitle
		case SECONDARY:
			return styles.secondaryTitle
		default:
			return styles.primaryTitle
	}
}

export default GeneralButton;
