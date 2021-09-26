import React from 'react';
import { Text, TextInput, View } from 'react-native';

import GeneralButton from '../../components/GeneralButton';
import { createPost } from '../../APIRequests/Posts';
import styles from './style';

const NewPost = ({navigation}) => {
  const [text, onTextChange] = React.useState('');

  const onCreatePostPress = () => {
    createPost({text})
    .then(response => navigation.navigate('Home'))
    .catch(error => console.log(error.response))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Post</Text>
      <TextInput
        style={styles.input}
        onChangeText={onTextChange}
        value={text}
        placeholder={'Tell us here...'}
        multiline
        textAlignVertical='top'
      />
      <GeneralButton 
        title="Create Post"
        onPress={onCreatePostPress}
      />
    </View>
  );
}

export default NewPost;
