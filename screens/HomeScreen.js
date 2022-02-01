import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import PostCard from '../components/PostCard';
import {AddPost, Container} from '../styles/HomeStyles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {AuthContext} from '../navigation/AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommentItem from '../components/renderComments';

const HomeScreen = ({navigation, item, route}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [comment, setComment] = useState('');
  const [postUid, setPostUid] = useState(null);
  const [commentList, setCommentList] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const list = [];
        route.params
          ? await firestore()
              .collection('posts')
              .where('userId', '==', route.params.userId)
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
              })
          : await firestore()
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
  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
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

  //comments bottomsheet

  const renderInner = () => (
    <View
      style={{
        padding: 19,
        backgroundColor: '#FFFFFF',
        height: '100%',
      }}>
      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <FlatList
          data={commentList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{marginTop: -19}}
        />
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.avatar}
            source={{
              uri: userData ? userData.userImg || null : null,
            }}
          />
          <TextInput
            value={comment}
            onChangeText={setComment}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => handleCommentSend()}>
            <Ionicons
              name="md-send"
              size={22}
              color={'#009387'}
              style={{marginTop: 8}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  // add comment
  const AddComment = (postId, creator, comment) => {
    firestore().collection('posts').doc(postUid).collection('comments').add({
      creator,
      comment,
      creation: firestore.FieldValue.serverTimestamp(),
    });
  };

  const handleCommentSend = postId => {
    if (comment.length == 0) {
      return;
    }
    setComment('');
    AddComment(postId, user.uid, comment);
  };

  // query comments
  let commentListenerInstance = null;

  const commentListener = () => {
    commentListenerInstance = firestore()
      .collection('posts')
      .doc(postUid)
      .collection('comments')
      .orderBy('creation', 'desc')
      .onSnapshot(snapshot => {
        if (snapshot.docChanges().length == 0) {
          return;
        }
        let comments = snapshot.docs.map(value => {
          const id = value.id;
          const data = value.data();
          return {id, ...data};
        });
        setCommentList(comments);
      });
  };

  const clearCommentListener = () => {
    setCommentList(null);
    if (commentListenerInstance != null) {
      commentListenerInstance();
      commentListenerInstance = null;
    }
  };

  const renderItem = ({item}) => {
    return <CommentItem item={item} />;
  };
  return (
    <View style={{flex: 1}}>
      {loading ? (
        <ScrollView
          style={{flex: 1, marginTop: 15}}
          contentContainerStyle={{alignItems: 'center'}}>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 60, height: 60, borderRadius: 50}} />
              <View style={{marginLeft: 20}}>
                <View style={{width: 120, height: 20, borderRadius: 4}} />
                <View
                  style={{
                    marginTop: 6,
                    width: 80,
                    height: 20,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <View style={{width: 300, height: 20, borderRadius: 4}} />
              <View
                style={{
                  marginTop: 6,
                  width: 250,
                  height: 20,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 350,
                  height: 200,
                  borderRadius: 4,
                }}
              />
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 60, height: 60, borderRadius: 50}} />
              <View style={{marginLeft: 20}}>
                <View style={{width: 120, height: 20, borderRadius: 4}} />
                <View
                  style={{
                    marginTop: 6,
                    width: 80,
                    height: 20,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <View style={{width: 300, height: 20, borderRadius: 4}} />
              <View
                style={{
                  marginTop: 6,
                  width: 250,
                  height: 20,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 350,
                  height: 200,
                  borderRadius: 4,
                }}
              />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <View style={{flex: 1}}>
          <BottomSheet
            ref={bs}
            snapPoints={[290, 0]} //330
            renderContent={renderInner}
            renderHeader={renderHeader}
            initialSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
            enabledContentGestureInteraction={false}
            onOpenEnd={commentListener}
            onCloseEnd={() => clearCommentListener()}
          />
          <Container>
            <FlatList
              data={posts}
              renderItem={({item}) => (
                <PostCard
                  item={item}
                  onDelete={handleDelete}
                  onComment={() => {
                    bs.current.snapTo(0);
                    setPostUid(item.id);
                  }}
                  onPress={() =>
                    navigation.navigate('ProfileOther', {userId: item.userId})
                  }
                />
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </Container>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F1F1F1',
    borderRadius: 6,
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 36,
  },
  avatar: {
    height: 37,
    width: 37,
    borderRadius: 20,
  },
});
