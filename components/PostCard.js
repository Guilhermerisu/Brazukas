import React, {useContext, useState, useEffect, useMemo} from 'react';
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/HomeStyles';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import 'moment/locale/pt-br';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {throttle} from 'throttle-debounce';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const PostCard = ({item, onDelete, onPress, onComment}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [load, setLoad] = useState(true);

  // Likes

  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: item.likes,
  });

  let likeIcon = currentLikeState.state ? 'heart' : 'heart-outline';
  let likeIconColor = currentLikeState.state ? '#017970' : '#333';
  let likeCount;

  currentLikeState.counter;
  if (currentLikeState.counter == 1) {
    likeCount = '1';
  } else if (currentLikeState.counter > 1) {
    likeCount = currentLikeState.counter;
  } else {
    likeCount = '';
  }

  useEffect(postId => {
    getLikeById(item.id, user.uid).then(res => {
      setCurrentLikeState({
        ...currentLikeState,
        state: res,
      });
    });
  }, []);

  const handleUpdateLike = useMemo(
    () =>
      throttle(500, true, currentLikeStateInst => {
        setCurrentLikeState({
          state: !currentLikeStateInst.state,
          counter:
            currentLikeStateInst.counter +
            (currentLikeStateInst.state ? -1 : 1),
        });
        updateLike(item.id, user.uid, currentLikeStateInst.state);
      }),
    [],
  );

  const getLikeById = postId =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('posts')
        .doc(item.id)
        .collection('likes')
        .doc(user.uid)
        .get()
        .then(res => resolve(res.exists));
    });

  const updateLike = async (postId, uid, currentLikeState) => {
    if (currentLikeState) {
      firestore()
        .collection('posts')
        .doc(item.id)
        .update({likes: firestore.FieldValue.increment(-1)});
      firestore()
        .collection('posts')
        .doc(item.id)
        .collection('likes')
        .doc(user.uid)
        .delete();
    } else {
      firestore()
        .collection('posts')
        .doc(item.id)
        .update({likes: firestore.FieldValue.increment(1)});
      firestore()
        .collection('posts')
        .doc(item.id)
        .collection('likes')
        .doc(user.uid)
        .set({});
    }
  };
  // get users
  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  // Comments
  let commentText;
  if (item.comments == 1) {
    commentText = '1 Comentário';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comentários ';
  } else {
    commentText = 'Comentar';
  }

  return (
    <View>
      <Card>
        <UserInfo>
          <UserImg
            source={{
              uri: userData ? userData.userImg || null : null,
            }}
          />
          <UserInfoText>
            <TouchableOpacity onPress={onPress}>
              <UserName>{userData ? userData.nome || null : null} </UserName>
            </TouchableOpacity>
            <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
          </UserInfoText>
        </UserInfo>
        <PostText>{item.post}</PostText>
        {item.postImg != null ? (
          <PostImg source={{uri: item.postImg}} />
        ) : (
          <Divider />
        )}
        <InteractionWrapper>
          <Interaction onPress={() => handleUpdateLike(currentLikeState)}>
            <Ionicons name={likeIcon} size={25} color={likeIconColor} />
            <InteractionText active={item.liked}>{likeCount}</InteractionText>
          </Interaction>
          <Interaction onPress={onComment}>
            <Ionicons name="md-chatbubble-outline" size={25} />
            <InteractionText>{commentText}</InteractionText>
          </Interaction>
          {user.uid == item.userId ? (
            <Interaction onPress={() => onDelete(item.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                size={25}
                color={'red'}
              />
            </Interaction>
          ) : null}
        </InteractionWrapper>
      </Card>
    </View>
  );
};

export default PostCard;
