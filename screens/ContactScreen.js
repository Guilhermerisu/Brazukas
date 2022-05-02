import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ContactScreen = ({navigation, route}) => {
  const [userData, setUserData] = useState(null);
  const {user, logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [Email, setEmail] = useState('');
  const [Assunto, setAssunto] = useState('');

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };
  useEffect(() => {
    getUser();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <View style={styles.container}>
      <Icon
        name="email-outline"
        size={40}
        color="white"
        style={{alignSelf: 'center'}}
      />
      <TextInput
        placeholder="Assunto"
        placeholderTextColor="#A7A4A4"
        onChangeText={Assunto => setAssunto(Assunto)}
        backgroundColor="#fff"
        width="70%"
        style={{alignSelf: 'center', textAlign: 'center'}}
      />

      <TextInput
        placeholder="Mensagem"
        placeholderTextColor="#A7A4A4"
        multiline
        numberOfLines={4}
        onChangeText={Email => setEmail(Email)}
        backgroundColor="#fff"
        width="70%"
        style={{alignSelf: 'center', textAlign: 'center', marginTop: 10}}
      />
      <TouchableOpacity
        style={styles.send}
        onPress={() => {
          Linking.openURL(
            `mailto:${
              userData.idade < 18 ? userData.emailres : userData.emailCom
            }?subject=${Assunto}&body=${Email}`,
          ),
            navigation.goBack();
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 4,
          }}>
          Enviar
        </Text>
      </TouchableOpacity>
      <View style={styles.divider}></View>

      <TouchableOpacity
        style={styles.phone}
        onPress={() => Linking.openURL(`tel:${userData.telefone}`)}>
        <FontAwesome
          name="phone-square"
          size={40}
          color="#fff"
          style={{alignSelf: 'center'}}
        />
        <Text style={{color: '#fff', fontSize: 17}}>
          {userData
            ? userData.idade < 18
              ? userData.telefoneres
              : userData.telefone
            : null}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#017970',
    width: '100%',
    height: '100%',
  },
  send: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    width: 70,
    height: 30,
  },
  divider: {
    borderBottomColor: '#F0EEEE',
    borderBottomWidth: 1,
    width: '92%',
    marginTop: 40,
    alignSelf: 'center',
  },
  phone: {
    marginTop: 60,
    alignSelf: 'center',
  },
});
