import React, 
{ useEffect, useState, useContext } from 'react';
import { Text, TouchableOpacity, FlatList } from 'react-native';

import { getTags } from '../../APIRequests/Tags';
import { addIndex } from '../../utils/FlatListUtil';
import { getPosts as getPostsRequest } from '../../APIRequests/Posts';
import PostsContext from '../../context/contexts/postContext';
import { BY_TAG } from '../../constants/getPostType';
import styles from './style';

const Tags = () => {
	const [tags, setTags] = useState([]);
	const [tagLoading, setTagLoading] = useState(false);
	
	const { 
        getPosts,
        setLoading,
        getLoading,
        setRetrievePostsType
    } = useContext(PostsContext);

	useEffect(() => {
		setTagLoading(true);
		getTags()
		.then(response => {
			setTags(addIndex(response.data.data));
			setTagLoading(false);
		})
		.catch(error => { 
			console.log('tags', error);
			setTagLoading(false);
		})
	}, []);

	const renderItem = ({ item }) => (
		<TagCard disabled={getLoading()} title={item.name} onTagPress={() => onTagPress(item.name)} />
	);

	const onTagPress = (tagName) => {
		setLoading(true)
		getPostsRequest({
			pageNumber: 0,
			getPostsType: BY_TAG,
			id: tagName
		})
		.then(response => {
            getPosts(response.data.data)
            setRetrievePostsType({type: BY_TAG, id: tagName})
			setLoading(false)
		})
		.catch(error => {
			console.log("from home error", error)
			setLoading(false)
		})
	}

    return (
        <>
            <Text style={styles.tagsTitle}>Tags</Text> 
            <FlatList
                data={tags}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                refreshing={tagLoading}
                onRefresh={() => {}}
            />
        </>
    )
}

const TagCard = ({title, onTagPress, disabled}) => {
    return (
        <TouchableOpacity 
            style={styles.tagCardContainer}
            onPress={onTagPress}
            disabled={disabled}
        >
            <Text style={styles.tagName}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Tags;
