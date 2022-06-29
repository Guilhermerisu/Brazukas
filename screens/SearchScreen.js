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
import Icon from 'react-native-vector-icons/Ionicons';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {AuthContext} from '../navigation/AuthProvider';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const Stack = createStackNavigator();

export const queryUsersByName = (nome, state, city, position) =>
  new Promise((resolve, reject) => {
    if (nome === '' && state == null && position == null) {
      resolve([]);
    }
    let query = firebase.firestore().collection('users');
    nome ? (query = query.where('nome', '>=', nome)) : null;
    nome ? (query = query.where('nome', '<=', nome + '\uf8ff')) : null;
    state != null ? (query = query.where('estado', '==', state)) : null;
    city != null ? (query = query.where('cidade', '==', city)) : null;
    position != null ? (query = query.where('posição1', '==', position)) : null;

    query
      .get()
      .then(snapshot => {
        let users = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });
        resolve(users);
      })
      .catch(e => console.log(e));
  });

const SearchScreen = ({navigation}) => {
  const [textInput, setTextInput] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);
  const [city, setCity] = useState(null);
  const [citydata, setCityData] = useState(null);
  const [states, setStates] = useState(null);
  const [position, setPosition] = useState(null);
  const [statesdata, setStatesData] = useState(null);

  useEffect(() => {
    queryUsersByName(textInput, states, city, position).then(setSearchUsers);
  }, [textInput, states, city, position]);

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        setStatesData(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${states}/municipios`,
      )
      .then(response => {
        setCityData(response.data);
      });
  }, [states]);
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Picker
          selectedValue={states}
          onValueChange={value => setStates(value)}
          style={{width: 95}}
          mode={'dropdown'}
          dropdownIconColor="#009387">
          <Picker.Item label="UF" value={null} />
          {statesdata
            ? statesdata.map(state => (
                <Picker.Item
                  label={state.sigla}
                  value={state.sigla}
                  key={state.id}
                />
              ))
            : null}
        </Picker>
        <Picker
          selectedValue={city}
          onValueChange={value => setCity(value)}
          style={{width: 120}}
          dropdownIconColor="#009387">
          <Picker.Item label="Cidade" value={null} />
          {citydata
            ? citydata.map(city => (
                <Picker.Item
                  label={city.nome}
                  value={city.nome}
                  key={city.id}
                />
              ))
            : null}
        </Picker>
        <Picker
          selectedValue={position}
          onValueChange={value => setPosition(value)}
          mode="dropdown"
          style={{width: 130}}
          dropdownIconColor="#009387">
          <Picker.Item label="Posição" value={null} />
          <Picker.Item label="Goleiro" value={'Goleiro'} />
          <Picker.Item label="Lateral" value={'Lateral'} />
          <Picker.Item label="Zagueiro" value={'Zagueiro'} />
          <Picker.Item label="Meia" value={'Meia'} />
          <Picker.Item label="Atacante" value={'Atacante'} />
        </Picker>
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
