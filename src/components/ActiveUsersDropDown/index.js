import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList,
  Image,
  Pressable
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import GeneralButton from '../GeneralButton';
import Loader from '../Loader';
import Popup from '../Popup';
import { getActiveUsers } from '../../APIRequests/Users';
import { getPosts as getPostsRequest } from '../../APIRequests/Posts';
import PostsContext from '../../context/contexts/postContext';
import { SECONDARY } from '../../constants/buttonTypes';
import { BY_USER } from '../../constants/getPostType';
import { SCREEN_END } from '../../constants/popupType';
import colors from '../../constants/colors';
import styles from './style';

const ActiveUsersDropDown = () => {
	const [showActiveUsersModal, setShowActiveUsersModal] = useState(false);
	const [activeUsers, setActiveUsers] = useState([]);
	// setters and getters of postsContext
	const { getPosts, setLoading, setRetrievePostsType } = useContext(PostsContext);

	const renderItem = ({ item }) => (
		<ActiveUserRow user={item} onUserPress={() => onUserPress(item.id)} />
	);

	const onUserPress = (id) => {
		// OnUserPress:
		//---------------
		// setLoading to true, hide modal and make get posts request
		// get posts list by user, with userId
		setLoading(true)
		setShowActiveUsersModal(false)
		getPostsRequest({
			pageNumber: 0,
			getPostsType: BY_USER,
			id
		})
		.then(response => {
			setLoading(false)
			getPosts(response.data.data)
			// setting retrieve post type with 'BY_USER'
			setRetrievePostsType({type: BY_USER, id})
		})
		.catch(error => {
			// handle error
			console.log('active user drop down error', error)
			setLoading(false)
		})
	}

	const onActiveUsersDropdownPress = () => {
		// show modal with active users
		setShowActiveUsersModal(true)
		getActiveUsers()
		.then(response => setActiveUsers(response.data.data))
		.catch(error => console.log('active users drop down error', error))
	}

	return (
		<>
			<TouchableOpacity 
				onPress={onActiveUsersDropdownPress}
				style={styles.showUsersContainer}
			>
				<Text style={styles.showUsersTitle}>Active Users</Text>
				<AntDesign 
					name='caretdown'
					color={colors.secondaryInk}
				/>
			</TouchableOpacity>
			<Popup showPopup={showActiveUsersModal} type={SCREEN_END}>
				<Text style={styles.modalTitle}>Active Users</Text>
				<FlatList
					data={activeUsers}
					renderItem={renderItem}
					keyExtractor={item => item.id}
					ItemSeparatorComponent={() => <Separator />}
					ListEmptyComponent = {() => <Loader />}
				/>
				<GeneralButton
					title="close"
					type={SECONDARY}
					onPress={() => setShowActiveUsersModal(false)}
				/>
			</Popup>
		</>
	)
}

const ActiveUserRow = ({user, onUserPress}) => {
	return (
		<Pressable 
			style={styles.userRowContainer}
			onPress={onUserPress}
		>
		<Image
				style={styles.userPicture}
				source={{uri:user.picture}}
		/>
		<Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
		</Pressable>
	)
}

const Separator = () => {
	return (
		<View style={styles.separatorContainer}>
			<View style={styles.separator} >
			</View>
		</View>
	)
}

export default ActiveUsersDropDown;
