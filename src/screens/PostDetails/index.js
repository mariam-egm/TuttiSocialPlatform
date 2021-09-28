import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';

import { getPost } from '../../APIRequests/Posts';
import styles from './style';

const PostDetails = ({route}) => {
    const { postId } = route.params;
    const [post, setPost] = useState({owner: {}});

    useEffect(() => {
        getPost(postId)
        .then(response => setPost(response.data))
        .catch(error => {/** handle error */})
    }, []);

	return (
        <View style={styles.container}>
            <View style={styles.ownerContainer}>
                {!!post.owner.picture && 
                <Image
                    source={{uri: post.owner.picture}}
                    style={styles.personalImage}
                />}
                <Text style={styles.ownerName}>{post.owner.firstName} {post.owner.lastName}</Text>
            </View>
            <View style={styles.postContainer}>
                <Text style={styles.postText}>{post.text}</Text>
                {!!post.image && <Image
                    source={{uri: post.image}}
                    style={styles.postImage}
                />}
            </View>
            <View style={styles.likesContainer}>
                <Text style={styles.likesText}>{post.likes} Likes</Text>
            </View>
        </View>
	);
}

export default PostDetails;
