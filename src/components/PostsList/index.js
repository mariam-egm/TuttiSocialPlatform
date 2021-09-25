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
import postsReducer from '../../context/reducers/postsReducer';
import PostsContext from '../../context/contexts/postContext';
import { 
	getPostsAction, 
	getMorePostsAction 
} from '../../context/actions/postActions';
import styles from './style';

const PostsList = () => {
	const [posts, setPosts] = useState([]);
	const [numberOfPages, setNumberOfPages] = useState(0);

	const [state, dispatch] = useReducer(postsReducer);

	useEffect(() => {
		getPosts()
		.then(response => dispatch(getPostsAction(response.data.data)))
		.catch(error => console.log("from posts lists error", error))
  },[]);

  const postContext = useMemo(
    () => ({
      getPosts: (posts) => {
        dispatch(getPostsAction(posts));
      },
			getMorePosts: (posts) => {
				dispatch(getMorePostsAction(posts));
			}    
		}),[]
	);

	const renderItem = ({ item }) => (
    <PostCard post={item} />
  );

	const onSeeMorePress = () => {
		getPosts(numberOfPages + 1)
		.then(response => {
			dispatch(getMorePostsAction(response.data.data))
			setNumberOfPages(numberOfPages + 1)
		})
		.catch(error => console.log("from posts lists error", error))
	}

  return (
		<PostsContext.Provider value={postContext}>
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
	</PostsContext.Provider>
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
