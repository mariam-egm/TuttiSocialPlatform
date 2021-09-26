import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const basicContainerStyle = {
	justifyContent:'center',
	alignItems: 'center',
	height: 50,
	borderRadius: 10
}

const basicTitleStyle = {
	fontSize: 20,
	fontWeight: 'bold'
}

const styles = StyleSheet.create({
	primaryContainer: {
		...basicContainerStyle,
		backgroundColor: colors.primaryColor
	},
	secondaryContainer: {
		...basicContainerStyle
	},
	primaryTitle: {
		...basicTitleStyle,
		color: colors.white
	},
	secondaryTitle: {
		...basicContainerStyle,
		color: colors.primaryColor,
		fontWeight: 'bold'
	}
});

export default styles;