import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  ScrollView,
  FlatList,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import PostCard from '../components/PostCard';
import {AddPost, Container} from '../styles/HomeStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Posts = [
  {
    id: '1',
    userName: 'Feer',
    userImg: require('../assets/transferir.png'),
    postTime: 'há 4 minutos',
    post: 'First Post',
    postImg: require('../assets/atleta.png'),
    liked: true,
    likes: '14',
    comments: '5',
  },
  {
    id: '2',
    userName: 'Lattice',
    userImg: require('../assets/transferir.jpg'),
    postTime: 'há 2 horas',
    post: 'First Post actually!',
    postImg: 'none',
    liked: false,
    likes: '0',
    comments: '0',
  },
];

const HomeScreen = ({navigation}) => {
  const [atualizando, setAtualizando] = useState(false);
  function aoAtualizar() {
    setAtualizando(true);
    setTimeout(() => {
      setAtualizando(false);
    }, 1000);
  }

  return (
    <Container>
      <FlatList
        data={Posts}
        renderItem={({item}) => <PostCard item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default HomeScreen;

/*   <ScrollView  refreshControl={
        <RefreshControl refreshing={atualizando} onRefresh={aoAtualizar} />>

    </ScrollView> */
