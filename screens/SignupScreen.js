import {Input, Item, Label, ListItem, Body, Icon, CheckBox} from 'native-base';
import React, {useContext, useState} from 'react';
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
import Animated from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {login, googleLogin, fbLogin} = useContext(AuthContext);
  const [confirmPassword, setConfirmPassword] = useState();
  const {register} = useContext(AuthContext);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#ffffff'}}
      showsVerticalScrollIndicator={false}>
      <View>
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
              <View style={{marginTop: 8}}>
                <FormInput
                  labelValue={email}
                  onChangeText={userEmail => setEmail(userEmail)}
                  placeholderText="Email"
                  iconType="mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {email ? (
                  email.length > 15 ? null : (
                    <Text style={{color: 'red'}}>
                      Insira um endereço de email válido
                    </Text>
                  )
                ) : null}
                <View style={{marginTop: 3}}>
                  <FormInput
                    labelValue={password}
                    onChangeText={userPassword => setPassword(userPassword)}
                    placeholderText="Senha"
                    iconType="lock1"
                    secureTextEntry={true}
                  />
                  {password ? (
                    password.length >= 6 ? null : (
                      <Text style={{color: 'red'}}>
                        Senha deve conter pelo menos 6 carateres
                      </Text>
                    )
                  ) : null}
                  <View style={{marginTop: 3}}>
                    <FormInput
                      labelValue={confirmPassword}
                      onChangeText={confirmPassword =>
                        setConfirmPassword(confirmPassword)
                      }
                      placeholderText="Confirme sua senha"
                      iconType="unlock"
                      secureTextEntry={true}
                    />
                    {confirmPassword ? (
                      confirmPassword == password ? null : (
                        <Text style={{color: 'red', marginBottom: 10}}>
                          As senhas precisam ser iguais
                        </Text>
                      )
                    ) : null}
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Login')}>
                      <Text
                        style={[
                          styles.navButtonText,
                          {marginLeft: scale(174)},
                        ]}>
                        Já tem uma conta?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <FormButton
                buttonTitle="Registrar"
                onPress={() => register(email, password)}
              />

              <View style={{flex: 1}}>
                <Text style={{textAlign: 'center', marginTop: scale(34)}}>
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
            </View>
          </Animatable.View>
          <View></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#009387',
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
  AddImagebtn: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 70,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#009387',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
});
