import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Modal,
  Image,
  Pressable
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './style';
import GeneralButton from '../../components/GeneralButton';
import { SECONDARY } from '../../constants/buttonTypes';
import { getActiveUsers } from '../../APIRequests/Users';
import { getPosts as getPostsRequest } from '../../APIRequests/Posts';
import PostsContext from '../../context/contexts/postContext';
import { BY_USER } from '../../constants/getPostType';
import colors from '../../constants/colors';

const ActiveUsersDropDown = () => {
  const [showActiveUsersModal, setShowActiveUsersModal] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);

  const { getPosts } = useContext(PostsContext);

  const renderItem = ({ item }) => (
    <ActiveUserRow user={item} onUserPress={() => onUserPress(item.id)} />
  );

  const onUserPress = (id) => {
    getPostsRequest({
      pageNumber: 0,
      getPostsType: BY_USER,
      id
    })
    .then(response => {
      getPosts(response.data.data)
      setShowActiveUsersModal(false)
    })
    .catch(error => console.log('active user drop down error', error))
  }

  return (
    <>
      <TouchableOpacity 
        onPress={() => {
          setShowActiveUsersModal(true)
          getActiveUsers()
          .then(response => setActiveUsers(response.data.data))
          .catch(error => console.log('active users drop down error', error))
        }}
        style={styles.showUsersContainer}
      >
        <Text style={styles.showUsersTitle}>Active Users</Text>
        <AntDesign 
          name='caretdown'
          color={colors.secondaryInk}
        />
      </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showActiveUsersModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Active Users</Text>
            <FlatList
              data={activeUsers}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <Separator />}
            />
              <GeneralButton 
                title="close"
                type={SECONDARY}
                onPress={() => setShowActiveUsersModal(false)}
              />
            </View>
          </View>
        </Modal>
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
