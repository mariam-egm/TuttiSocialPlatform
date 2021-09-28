import React, { useEffect, useState, useContext } from 'react';
import { 
	Text,
	FlatList,
	Image,
	View,
	Alert
} from 'react-native';
import DoubleClick from 'react-native-double-tap';

import GeneralButton from '../../components/GeneralButton';
import { 
	getPosts as getPostsRequest,
	deletePost as deletePostRequest
} from '../../APIRequests/Posts';
import { SECONDARY } from '../../constants/buttonTypes';
import { ADMIN } from '../../constants/userRoles';
import PostsContext from '../../context/contexts/postContext';
import AuthContext from '../../context/contexts/authContext';
import styles from './style';

const PostsList = ({navigation}) => {
	const [numberOfPages, setNumberOfPages] = useState(0);

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
		<PostCard 
			post={item} 
			onPostCardPress={() => onPostCardPress(item.id)}  
			onDoublePress={() => onDoublePress(item.id)}
		/>
  	);

	const onPostCardPress = (postId) => {
		navigation.navigate('PostDetails', { postId })
	}

	const onDoublePress = (postId) => {
		getRole() == ADMIN && 
		Alert.alert(
			'Delete Post',
			'Are you sure you want to delete this post?',
			[
				{ text: "Cancel", onPress: () => {}},
				{ text: "Delete", onPress: () => onDeletePress(postId) }
			]
		);
	}

	const onDeletePress = (postId) => {
		setLoading(true);
		deletePostRequest(postId)
		.then(response => {
			setNumberOfPages(0);
			getPostsRequest({
				pageNumber: numberOfPages,
				getPostsType: getRetrievePostsType(),
				id: getRetrievePostTypeId() 
			})
			.then(response => {
				setLoading(false);
				getPosts(response.data.data);
				setLoading(false);
			})
			.catch(error => {
				console.log("from posts lists error", error)
				setLoading(false);
			})
		})
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

const PostCard = ({post, onPostCardPress, onDoublePress}) => {
	return (
		<View style={styles.cardContainer}>
			<DoubleClick 
				singleTap={onPostCardPress}
				doubleTap={onDoublePress}
				delay={200}
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
			</DoubleClick>
		</View>
	)
}

export default PostsList;
