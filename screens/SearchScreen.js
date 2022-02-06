import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchUserItem from '../components/userItem';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {AuthContext} from '../navigation/AuthProvider';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export const queryUsersByName = nome =>
  new Promise((resolve, reject) => {
    if (nome === '') {
      resolve([]);
    }
    firebase
      .firestore()
      .collection('users')
      .where('nome', '>=', nome)
      .where('nome', '<=', nome + '\uf8ff')
      .get()
      .then(snapshot => {
        let users = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });
        resolve(users);
      })
      .catch(() => reject());
  });

const SearchScreen = ({navigation}) => {
  const [textInput, setTextInput] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);

  useEffect(() => {
    queryUsersByName(textInput).then(setSearchUsers);
  }, [textInput]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginTop: 15, marginLeft: 5}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              size={27}
              backgroundColor="#fff"
              color="#009387"
            />
          </TouchableOpacity>
        </View>

        <TextInput
          onChangeText={setTextInput}
          style={[
            styles.txtInput,
            {width: scale(300), height: scale(36), color: 'black'},
          ]}
          placeholder={'Pesquisar'}
          placeholderTextColor="#A7A4A4"
          autoFocus={true}
        />
      </View>
      <View
        style={{
          borderBottomColor: '#DEDEDE',
          borderBottomWidth: 1,
        }}
      />
      <FlatList
        data={searchUsers}
        renderItem={({item}) => <SearchUserItem item={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  txtInput: {
    margin: 10,
    marginLeft: 5,
    backgroundColor: '#F1F1F1',
    padding: 5,
    borderRadius: 12,
  },
});
