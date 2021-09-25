import React, { useEffect, useState } from 'react';
import { 
	Text, 
	FlatList, 
	TouchableOpacity, 
	Image,
	View 
} from 'react-native';

import GeneralButton from '../../components/GeneralButton';
import { getPosts } from '../../APIRequests/Posts';
import { SECONDARY } from '../../constants/buttonTypes';
import styles from './style';

const PostsList = () => {
	const [posts, setPosts] = useState([]);
	const [numberOfPages, setNumberOfPages] = useState(0);

	useEffect(() => {
		getPosts()
		.then(response => setPosts(response.data.data))
		.catch(error => console.log("from posts lists error", error))
  },[]);

	const renderItem = ({ item }) => (
    <PostCard post={item} />
  );

	const onSeeMorePress = async () => {
		getPosts(numberOfPages + 1)
		.then(response => {
			setPosts([...posts, ...response.data.data])
			setNumberOfPages(numberOfPages + 1)
		})
		.catch(error => console.log("from posts lists error", error))
	}

  return (
		<>
			<Text style={styles.postsTitle}>Posts</Text> 
				<FlatList
					data={posts}
					renderItem={renderItem}
					keyExtractor={item => item.id}
					ListFooterComponent = {
            <GeneralButton 
              title="SEE MORE"
							type={SECONDARY}
							onPress={() => onSeeMorePress()}
            />
          }
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
				<View style={styles.postImageContainer}>
					<Image
						style={styles.postImage}
						source={{uri:post.image}}
					/>
				</View>
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
