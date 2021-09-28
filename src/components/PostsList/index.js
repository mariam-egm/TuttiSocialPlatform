import React, { useEffect, useState, useContext } from 'react';
import { 
	Text, 
	FlatList, 
	TouchableOpacity, 
	Image,
	View 
} from 'react-native';

import GeneralButton from '../../components/GeneralButton';
import { getPosts as getPostsRequest } from '../../APIRequests/Posts';
import { SECONDARY } from '../../constants/buttonTypes';
import PostsContext from '../../context/contexts/postContext';
import styles from './style';

const PostsList = () => {
	const [numberOfPages, setNumberOfPages] = useState(0);
	const { 
		getPosts, 
		getMorePosts, 
		getPostSelector,
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
		<PostCard post={item} />
  	);

	const onSeeMorePress = () => {
		setLoading(true)
		getPostsRequest({ pageNumber: numberOfPages + 1})
		.then(response => {
			getMorePosts(response.data.data)
			setNumberOfPages(numberOfPages + 1)
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

const PostCard = ({post}) => {
	return (
		<TouchableOpacity style={styles.cardContainer}>
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
						<Text>{post.likes} Likes</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default PostsList;
