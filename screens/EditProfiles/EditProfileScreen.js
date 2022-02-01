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
import EditPadrao from './EditPadrao';
import EditOlheiro from './EditOlheiro';
import EditAtleta from './EditAtleta';

const Stack = createStackNavigator();

const EditScreens = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EditGeral" component={EditProfileScreen} />
      <Stack.Screen name="EditAtleta" component={EditAtleta} />
      <Stack.Screen name="EditPadrao" component={EditPadrao} />
      <Stack.Screen name="EditOlheiro" component={EditOlheiro} />
    </Stack.Navigator>
  );
};

const EditProfileScreen = ({navigation}) => {
  return (
    <ScrollView style={{marginTop: 15}}>
      <View style={styles.select}>
        <View style={{marginTop: 23}}>
          <TouchableOpacity onPress={() => navigation.navigate('EditPadrao')}>
            <View>
              <ImageBackground
                source={require('../../assets/padrão.png')}
                style={{height: 125, width: '100%'}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: 23}}>
          <TouchableOpacity onPress={() => navigation.navigate('EditAtleta')}>
            <View>
              <ImageBackground
                source={require('../../assets/atleta.png')}
                style={{height: 125, width: '100%'}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{paddingTop: 23}}>
          <TouchableOpacity onPress={() => navigation.navigate('EditOlheiro')}>
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
export default EditScreens;
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
  },
  text: {
    fontSize: 25,
    fontWeight: '700',
  },
  ScrollStyle: {
    alignContent: 'stretch',
    justifyContent: 'flex-end',
  },
});
