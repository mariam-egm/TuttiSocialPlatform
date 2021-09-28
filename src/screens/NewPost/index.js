import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useValidation } from 'react-native-form-validator';

import postSchema from '../../validationSchemas/postSchema';
import GeneralButton from '../../components/GeneralButton';
import { createPost } from '../../APIRequests/Posts';
import styles from './style';

const NewPost = ({navigation}) => {
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);

	const { 
		validate, 
		getErrorsInField, 
		isFieldInError 
	} = useValidation({
		state: { text }
	});

	const onCreatePostPress = () => {
		// validate post form
		// send createPost API request when there are no errors
		setLoading(true)
		if(!validate(postSchema)){
			setLoading(false)
		} else {
			createPost({text})
			.then(response => {
				// navigate to Home after success
				setText('')
				setLoading(false)
				navigation.jumpTo('Home')
				
			})
			.catch(error => {
				console.log(error.response)
				setLoading(false);
			})
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Create New Post</Text>
			<TextInput
				style={styles.input}
				onChangeText={setText}
				value={text}
				placeholder={'Tell us here...'}
				multiline
				textAlignVertical='top'
			/>
			{isFieldInError('text') && getErrorsInField('text').map(errorMessage => 
				<Text style={styles.errorText}>{errorMessage}</Text>
			)}
			<GeneralButton 
				title="Create Post"
				onPress={onCreatePostPress}
				loading={loading}
			/>
		</View>
	);
}

export default NewPost;
