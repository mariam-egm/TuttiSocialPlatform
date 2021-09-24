import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
	container:{
		backgroundColor: colors.backgroundColor,
		paddingHorizontal: 20,
		flex: 1
	},
	activeUsersContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'		
	},
	tagsContainer: {
		flex: 1,
	},
	postsContainer: {
		flex: 5,
	},
	showUsersContainer: {
		backgroundColor: colors.white,
		height: 50,
		width: 300,
		borderRadius: 5,
		justifyContent: 'center',
		paddingHorizontal: 20
	},
	showUsersTitle: {
		color: colors.secondaryInk,
		fontWeight: 'bold'
	},
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
		fontSize: 18
	}
});

export default styles;
