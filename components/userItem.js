import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function SearchUserItem({item}) {
  return (
    <TouchableOpacity style={styles.container}>
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
