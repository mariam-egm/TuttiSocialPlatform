import React, { useEffect, useState, useContext } from 'react';
import { 
	Text, 
	FlatList, 
	TouchableOpacity, 
	Image,
	View,
	Alert 
} from 'react-native';

import GeneralButton from '../../components/GeneralButton';
import { 
	getPosts as getPostsRequest,
	deletePost as deletePostRequest
} from '../../APIRequests/Posts';
import { SECONDARY } from '../../constants/buttonTypes';
import PostsContext from '../../context/contexts/postContext';
import styles from './style';
import { ADMIN } from '../../constants/userRoles';
import AuthContext from '../../context/contexts/authContext';

const PostsList = ({navigation}) => {
	const [numberOfPages, setNumberOfPages] = useState(0);
	const [lastPress, setLastPress] = useState(null);

	const { getRole } = useContext(AuthContext);

	const { 
		getPosts, 
		getMorePosts, 
		getPostSelector,
		getRetrievePostsType,
		getRetrievePostTypeId,
		getLoading,
		setLoading
	} = useContext(PostsContext);

	useEffect(() => {
		setLoading(true)
		getPostsRequest({})
		.then(response => {
			getPosts(response.data.data)
			setLoading(false);
		})
		.catch(error => {
			console.log("from posts lists error", error)
			setLoading(false);
		})
  	},[]);


	const renderItem = ({ item }) => (
		<PostCard post={item} onPostCardPress={() => onPostCardPress(item.id)}  />
  	);

	const onPostCardPress = (postId) => {
		const timeDifference = new Date().getTime() - lastPress;
		if (getRole() == ADMIN && timeDifference < 200) {
		  	Alert.alert(
				'Delete Post',
				'Are you sure you want to delete this post?',
				[
					{ text: "Cancel", onPress: () => {}},
					{ text: "Delete", onPress: () => onDeletePress(postId) }
				]
			);
		} else {
			// navigate to details screen
			navigation.navigate('PostDetails', { postId })
		}
		setLastPress(new Date().getTime())
	}

	const onDeletePress = (postId) => {
		deletePostRequest(postId)
		.then(response => console.log(response))
		.catch(error => console.log("delete post error"))
	}

	const onSeeMorePress = () => {
		setLoading(true)
		getPostsRequest({ 
			pageNumber: numberOfPages + 1, 
			getPostsType: getRetrievePostsType(),
			id: getRetrievePostTypeId() 
		})
		.then(response => {
			getMorePosts(response.data.data)
			const numberOfPagesRendered = getPostSelector().length <= 10 ? 1 : numberOfPages + 1;  
			setNumberOfPages(numberOfPagesRendered)
			setLoading(false)
		})
		.catch(error => {
			console.log("from posts lists error", error)
			setLoading(false)
		})
	}

  	return (
		<>
			<Text style={styles.postsTitle}>Posts</Text> 
			<FlatList
				data={getPostSelector()}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				ListFooterComponent = {
				!getLoading() && getPostSelector().length && !(getPostSelector().length%10) &&
				<GeneralButton 
					title="SEE MORE"
					type={SECONDARY}
					onPress={() => onSeeMorePress()}
				/>}
				ListEmptyComponent = {() => 
					<Text style={styles.noPostsText}>
						There are no posts for now
					</Text>}
				refreshing={getLoading()}
				onRefresh={() => console.log("refreshed!")}
			/>
		</>
	);
}

const PostCard = ({post, onPostCardPress}) => {
	return (
		<TouchableOpacity 
			style={styles.cardContainer}
			onPress={onPostCardPress}
		>
			<View style={styles.postOwnerNameContainer}>
				<View style={styles.ownerImageContainer}>
					<Image
						style={styles.ownerImage}
						source={{uri:post.owner.picture}}
					/>
				</View>				
				<Text style={styles.ownerName}>{post.owner.firstName} {post.owner.lastName}</Text>
			</View>
			<View style={styles.postContainer}>
				<Text style={styles.postText}>{post.text}</Text>
				{!!post.image &&<View style={styles.postImageContainer}>
					<Image
						style={styles.postImage}
						source={{uri:post.image}}
					/>
				</View>}
				<View style={styles.bottomInfoContainer}>
					<View style={styles.likesContainer}>
						<Text style={styles.likeText}>{post.likes} Likes</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default PostsList;
