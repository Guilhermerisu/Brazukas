import {Input, Item, Label, ListItem, Body, Icon, CheckBox} from 'native-base';
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

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
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
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={[styles.navButtonText, {marginLeft: scale(165)}]}>
                  Não tem uma conta?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <FormButton
            buttonTitle="Entrar"
            onPress={() => login(email, password)}
          />
          <View style={{flex: 1}}>
            <Text style={{textAlign: 'center', marginTop: scale(60)}}>
              Faça login com uma conta de terceiros
            </Text>
            <View style={styles.socialLoginView}>
              <TouchableOpacity icon style={{}} rounded>
                <Icon
                  type="MaterialCommunityIcons"
                  size={30}
                  name="facebook"
                  onPress={() => fbLogin()}
                  style={{color: '#3b5998'}}
                />
              </TouchableOpacity>
              <TouchableOpacity icon style={{}} rounded>
                <Icon
                  type="MaterialCommunityIcons"
                  name="twitter"
                  style={{color: '#00acee'}}
                />
              </TouchableOpacity>
              <TouchableOpacity icon style={{}} rounded>
                <Icon
                  type="MaterialCommunityIcons"
                  name="google-plus"
                  onPress={() => googleLogin()}
                  style={{color: '#db4a39'}}
                />
              </TouchableOpacity>
            </View>
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
            Não tem uma conta?
            <Text style={{color:'red', fontStyle:'italic'}}>
              {' '} 
              Crie Agora
          </Text>
          </Text> */
