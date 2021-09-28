import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
	showUsersContainer: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		height: 50,
		width: 300,
		borderRadius: 5,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	showUsersTitle: {
		color: colors.secondaryInk,
		fontWeight: 'bold'
	},
	userRowContainer: {
		padding: 20	,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center'
	},
	userName: {
		color: colors.primaryInk,
	},
	userPicture: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 10
	},
	separatorContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	separator: {
		width: '90%',
		height: 1,
		backgroundColor: colors.secondaryInk
	},
	modalTitle: {
		color: colors.primaryInk,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20
	}
});

export default styles;
