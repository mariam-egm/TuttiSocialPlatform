import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
	container:{
		backgroundColor: colors.backgroundColor,
		padding: 20,
		flex: 1
	},
	title: {
		color: colors.primaryInk,
		fontWeight: 'bold',
		fontSize: 30
	},
	input: {
		borderColor: colors.primaryColor,
		borderRadius: 10,
		borderWidth: 3,
		marginTop: 20,
		marginBottom: 10,
		padding: 15,
		height: '80%',
		fontSize: 20,
		backgroundColor: colors.white
	},
	errorText: {
		color: colors.error,
		marginBottom: 5
	}
});

export default styles;
