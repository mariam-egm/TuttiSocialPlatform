import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primaryColor
	},
	welcomeText: {
		color: colors.white,
		fontWeight: 'bold',
		fontSize: 30
	},
	welcomeContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	formContainer: {
		flex: 6,
		borderTopEndRadius: 50,
		borderTopLeftRadius: 50,
		backgroundColor: colors.backgroundColor,
		paddingHorizontal: 25,
		paddingTop: 100
	},
	input: {
		shadowColor: colors.shadowColor,
		shadowRadius: 10,
		shadowOpacity: 1,
		elevation: 8,
		borderRadius: 10,
		backgroundColor: colors.white,
		marginBottom: 50,
		paddingLeft: 20
	}
});

export default styles;