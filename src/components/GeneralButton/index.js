import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Loader from '../../components/Loader';
import { PRIMARY, SECONDARY } from '../../constants/buttonTypes';
import styles from './style';

const GeneralButton = ({onPress, title, type, loading}) => {
	return (
		<TouchableOpacity onPress={onPress} style={getStyle(type)}>
			{loading? 
				<Loader /> 
				:
				<Text style={getTitleStyle(type)}>{title}</Text>
			}
		</TouchableOpacity>
	);
}

const getStyle = type => {
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
