import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ContactUsScreen = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [Assunto, setAssunto] = useState('');

  return (
    <View style={styles.container}>
      <Icon
        name="email-outline"
        size={40}
        color="white"
        style={{alignSelf: 'center', marginTop: -30}}
      />
      <TextInput
        placeholder="Assunto"
        placeholderTextColor="#A7A4A4"
        onChangeText={Assunto => setAssunto(Assunto)}
        backgroundColor="#fff"
        width="70%"
        style={{alignSelf: 'center', textAlign: 'center', color: 'black'}}
      />

      <TextInput
        placeholder="Mensagem"
        placeholderTextColor="#A7A4A4"
        multiline
        numberOfLines={4}
        onChangeText={Email => setEmail(Email)}
        backgroundColor="#fff"
        width="70%"
        style={{
          alignSelf: 'center',
          textAlign: 'center',
          marginTop: 10,
          color: 'black',
        }}
      />
      <TouchableOpacity
        style={styles.send}
        onPress={() => {
          Linking.openURL(
            `mailto:brazukasclub@gmail.com?subject=${Assunto}&body=${Email}`,
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
    </View>
  );
};

export default ContactUsScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#017970',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  send: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    width: 70,
    height: 30,
  },
});
