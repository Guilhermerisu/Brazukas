import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import RegistroPadrao from './RegistroPadrao';
import RegistroOlheiro from './RegistroOlheiro';
import RegistroAtleta from './RegistroAtleta';

const Stack = createStackNavigator();

const RegisterScreens = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RegistroGeral" component={RegistroGeral} />
      <Stack.Screen name="RegistroAtleta" component={RegistroAtleta} />
      <Stack.Screen name="RegistroPadrao" component={RegistroPadrao} />
      <Stack.Screen name="RegistroOlheiro" component={RegistroOlheiro} />
    </Stack.Navigator>
  );
};

const RegistroGeral = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.select}>
        <View style={{marginTop: 23}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegistroPadrao')}>
            <View>
              <ImageBackground
                source={require('../../assets/padrão.png')}
                style={{height: 125, width: '100%'}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: 23}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegistroAtleta')}>
            <View>
              <ImageBackground
                source={require('../../assets/atleta.png')}
                style={{height: 125, width: '100%'}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: 23}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegistroOlheiro')}>
            <View>
              <ImageBackground
                source={require('../../assets/olheiro.png')}
                style={{height: 125, width: '100%'}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default RegisterScreens;
const styles = StyleSheet.create({
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  select: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  text: {
    fontSize: 25,
    fontWeight: '700',
  },
});
