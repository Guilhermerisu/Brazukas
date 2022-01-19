import React from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostCard = ({item}) => {
  let likeIcon = item.liked ? 'heart' : 'heart-outline';
  let likeIconColor = item.liked ? '#017970' : '#333';
  let commentText;

  if (item.comments == 1) {
    commentText = '1 Comentário';
  } else if (item.likes > 1) {
    commentText = item.likes + ' Comentários ';
  } else {
    commentText = 'Comentar';
  }

  return (
    <Card>
      <UserInfo>
        <UserImg source={item.userImg} />

        <UserInfoText>
          <UserName>{item.userName}</UserName>
          <PostTime>{item.postTime}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg != 'none' ? <PostImg source={item.postImg} /> : <Divider />}
      <InteractionWrapper>
        <Interaction>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>{item.likes}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
