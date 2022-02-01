import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const CommentItem = ({item, navigation}) => {
  const [creatorData, setCreatorData] = useState('');

  const getCreator = () => {
    firestore()
      .collection('users')
      .doc(item.creator)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setCreatorData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getCreator();
  }, []);

  return (
    <View style={styles.renderContainer}>
      <Image style={styles.avatar} source={{uri: creatorData.userImg}} />

      <View style={styles.containerText}>
        <Text style={styles.displayName}>{creatorData.nome}</Text>
        <Text>{item.comment}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  renderContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    flex: 1,
  },
  avatar: {
    height: 34,
    width: 34,
    borderRadius: 20,
  },
  containerText: {
    marginHorizontal: 15,
  },
  displayName: {
    fontWeight: 'bold',
    fontSize: 12.5,
  },
});
