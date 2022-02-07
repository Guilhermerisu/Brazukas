import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import 'moment/locale/pt-br';
import {useNavigation} from '@react-navigation/native';

const CommentItem = ({item}) => {
  const [creatorData, setCreatorData] = useState('');

  const navigation = useNavigation();

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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProfileOther', {userId: item.creator})
            }>
            <Text style={styles.displayName}>{creatorData.nome}</Text>
          </TouchableOpacity>
          {item.creation != null ? (
            <Text style={styles.time}>
              {moment(item.creation.toDate()).fromNow()}
            </Text>
          ) : null}
        </View>
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
  time: {
    fontSize: 11,
    color: '#787878',
    marginLeft: 5,
  },
});
