import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../navigation/AuthProvider';

export default function SearchUserItem({item}) {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('ProfileOther', {
          userId: item.id,
        })
      }>
      <Text style={styles.text}>{item.nome}</Text>
      <Image style={styles.searchImg} source={{uri: item.userImg}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchImg: {
    backgroundColor: 'gray',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  text: {
    flex: 1,
  },
});
