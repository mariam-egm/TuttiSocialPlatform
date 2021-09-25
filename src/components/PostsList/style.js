import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
	cardContainer:{
		backgroundColor: colors.primaryColor,
		padding: 20,
		flex: 1,
		margin: 5,
		borderRadius: 10
	},
	postOwnerNameContainer:{
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	postContainer: {
		backgroundColor: colors.white,
		borderRadius: 10,
		padding: 10
	},
	ownerName: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	postText: {
		color: colors.secondaryInk,
		fontWeight: 'bold',
		marginBottom: 10
	},
	postImageContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	postImage: {
		width: 245,
		height: 245,
		borderRadius: 10
	},
	ownerImageContainer: {
		paddingRight: 10
	},
	ownerImage: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	bottomInfoContainer: {
		flexDirection: 'row',
		paddingTop: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	likesContainer: {
		backgroundColor: colors.secondaryColor,
		paddingVertical: 5,
		paddingHorizontal: 20,
		borderRadius: 15
	},
	postsTitle: {
		color: colors.primaryInk,
		fontWeight: 'bold',
		fontSize: 20,
		marginVertical: 20
	}
});

export default styles;
