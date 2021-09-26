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
	body: {
		flex:1,
		justifyContent: 'center'
	},
	mainMessage: {
		color: colors.primaryColor,
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	logoutQuestion: {
		color: colors.primaryInk,
		marginVertical: 20,
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center'
	}
});

export default styles;
