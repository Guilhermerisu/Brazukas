import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import PostCard from '../components/PostCard';
import {AddPost, Container} from '../styles/HomeStyles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const list = [];
        await firestore()
          .collection('posts')
          .orderBy('postTime', 'desc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const {userId, post, postImg, postTime, likes, comments} =
                doc.data();
              list.push({
                id: doc.id,
                userId,
                postTime: postTime,
                post,
                postImg,
                liked: false,
                likes,
                comments,
              });
            });
          });

        setPosts(list);

        if (loading) {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchPosts();
    navigation.addListener('state', () => setLoad(!load));
  }, [navigation, load]);

  const handleDelete = postId => {
    Alert.alert(
      'Deletar Post',
      'Tem certeza?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                deleteFirestoreData(postId);
              })
              .catch(e => {
                console.log(e);
              });
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert('Post Deletado!', 'Seu post foi deletado com sucesso!', [
          {
            onPress: () => navigation.navigate('Inicio'),
          },
        ]);
      });
  };

  return (
    <Container>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <PostCard item={item} onDelete={handleDelete} />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default HomeScreen;
