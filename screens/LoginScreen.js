import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  View,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import firebase from '@react-native-firebase/app';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState();
  const {login, googleLogin, fbLogin} = useContext(AuthContext);

  useEffect(() => {}, []);
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#ffffff'}}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../assets/background123.png')}
        style={{height: Dimensions.get('window').height / 2.5}}>
        <View style={styles.brandView}>
          <Animatable.Image
            animation="bounceIn"
            source={require('../assets/amadeus.png')}
          />
        </View>
      </ImageBackground>
      <View style={styles.bottomView}>
        <Animatable.View style={{padding: 30}} animation="fadeInUpBig">
          <View style={{marginTop: 2}}>
            <FormInput
              labelValue={email}
              onChangeText={userEmail => setEmail(userEmail)}
              placeholderText="Email"
              iconType="user"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={{marginTop: 8}}>
              <FormInput
                labelValue={password}
                onChangeText={userPassword => setPassword(userPassword)}
                placeholderText="Senha"
                iconType="lock"
                secureTextEntry={true}
              />
              <TouchableOpacity 
                onPress={() => {
                  { email == null ? 
                    Alert.alert(
                      'Email inv??lido',
                      'Insira um email para redefinir a senha',
                    )
                    :
                    firebase
                    .auth()
                    .sendPasswordResetEmail(email)
                    .catch(error => {
                      Alert.alert(
                        'Email inv??lido',
                        'O email inserido n??o est?? registrado',
                      )
                    }). then (
                    Alert.alert(
                      'Email enviado',
                      'Verifique seu email para redefinir a senha',
   )) }  
                }}> 
                <Text style={[styles.navButtonText, {marginLeft: scale(170)}]}>
                  Esqueceu a senha?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <FormButton
            buttonTitle="Entrar"
            onPress={() => { 
              email == null ?
              Alert.alert(
                'Email/Senha inv??lidos',
                'Insira o email e a senha para fazer login',
              ) 
              : login(email, password) }}
          />
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'center', marginTop: scale(52)}}>
              Fa??a login com uma conta de terceiros
            </Text>
            <View style={styles.socialLoginView}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  size={30}
                  name="facebook"
                  onPress={() => fbLogin()}
                  style={{color: '#3b5998'}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  size={30}
                  name="twitter"
                  style={{color: '#00acee'}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  size={30}
                  name="google-plus"
                  onPress={() => googleLogin()}
                  style={{color: '#db4a39'}}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text
                style={[
                  styles.navButtonText,
                  {alignSelf: 'center', marginTop: 20},
                ]}>
                N??o tem uma conta?
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#009387',
    //  marginLeft:170
  },
  EnterText: {
    marginTop: '2',
  },
  brandViewText: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  forgotPassView: {
    height: 50,
    marginTop: 20,
    flexDirection: 'row',
  },
  loginBtn: {
    alignSelf: 'center',
    backgroundColor: '#009387',
    width: Dimensions.get('window').width / 1.7,
    justifyContent: 'center',
  },
  socialLoginView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 17,
  },
  shadowBtn: {
    shadowOffset: {width: 1, height: 10},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 15,
  },
});
/*         <Text style={{color:'#009387', fontSize: 34}}>Bem Vindo</Text>
          <Text>
            N??o tem uma conta?
            <Text style={{color:'red', fontStyle:'italic'}}>
              {' '} 
              Crie Agora
          </Text>
          </Text> */
