import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
	tagsTitle: {
		color: colors.primaryInk,
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 20
	},
	tagCardContainer:{
		backgroundColor: colors.primaryColor,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginHorizontal: 5,
		borderRadius: 10
	},
	tagName: {
		color: colors.white,
		fontWeight: 'bold',
		fontSize: 16
	}
});

export default styles;
