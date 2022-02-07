import React, {useContext, useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

import RegistroGeral from '../screens/Registro/Registro';
import {AuthContext} from '../navigation/AuthProvider';
import HomeScreen from '../screens/HomeScreen';
import EditProfileScreen from '../screens/EditProfiles/EditProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from '../components/CustomDrawer';
import SearchScreen from '../screens/SearchScreen';
import AddPostScreen from '../screens/AddPostScreen';
import CardScreen from '../screens/CardScreen';
import ContactScreen from '../screens/ContactScreen';
import TournamentScreen from '../screens/TournamentScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Inicio"
      component={HomeScreen}
      options={{
        title: '',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
        },
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <View style={{marginRight: 18}}>
              <FontAwesome5
                name="plus"
                size={22}
                backgroundColor="transparent"
                color="#009387"
                onPress={() => navigation.navigate('AddPostStack')}
              />
            </View>
            <View style={{marginRight: 18}}>
              <FontAwesome5
                name="search"
                size={22}
                backgroundColor="transparent"
                color="#009387"
                onPress={() => navigation.navigate('SearchStack')}
              />
            </View>
          </View>
        ),
        headerLeft: () => (
          <View style={{marginLeft: 10}}>
            <Icon
              name="ios-menu"
              size={28}
              backgroundColor="transparent"
              color="#009387"
              onPress={() => navigation.openDrawer()}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="SearchStack"
      component={SearchScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="AddPostStack"
      component={AddPostScreen}
      options={{
        title: '',
        headerStyle: {
          backgroundColor: '#017970',
          shadowColor: '#017970',
          height: 45,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => <View style={{marginLeft: 10}}></View>,
      }}
    />
    <Stack.Screen
      name="ProfileOther"
      component={ProfileScreen}
      options={{
        title: '',
        headerStyle: {
          backgroundColor: '#017970',
          shadowColor: '#017970',
          height: 45,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#fff" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={HomeScreen}
      options={{
        title: '',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 7}}>
            <Ionicons name="arrow-back" size={25} color="#009387" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="CardScreenStack"
      component={CardScreen}
      options={{
        title: '',
        headerStyle: {
          backgroundColor: 'transparent',
          shadowColor: 'transparent',
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 7}}>
            <Ionicons name="arrow-back" size={25} color="#009387" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="ContactScreenStack"
      component={ContactScreen}
      options={{
        title: '',
        headerStyle: {
          backgroundColor: '#017970',
          shadowColor: '#017970',
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 7}}>
            <Ionicons name="arrow-back" size={25} color="#fff" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#017970',
            shadowColor: '#017970',
            height: 45,
          },
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={{marginRight: 15}}>
              <FontAwesome5
                name="user-edit"
                size={23}
                backgroundColor="transparent"
                color="#fff"
                onPress={() => navigation.navigate('EditProfileScreenStack')}
              />
            </View>
          ),
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon
                name="ios-menu"
                size={28}
                backgroundColor="transparent"
                color="#fff"
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="EditProfileScreenStack"
        component={EditProfileScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: 'transparent',
            shadowColor: '#fff',
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View style={{marginLeft: 15}}>
              <Ionicons name="arrow-back" size={25} color="#009387" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="HomeProfile"
        component={HomeScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View style={{marginLeft: 15}}>
              <Ionicons name="arrow-back" size={25} color="#009387" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="CardScreenStack"
        component={CardScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: 'transparent',
            shadowColor: 'transparent',
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View style={{marginLeft: 7}}>
              <Ionicons name="arrow-back" size={25} color="#009387" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ContactScreenStack"
        component={ContactScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#017970',
            shadowColor: '#017970',
          },
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View style={{marginLeft: 7}}>
              <Ionicons name="arrow-back" size={25} color="#fff" />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const [FirstTime, setFirstTime] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('FirstTime').then(value => {
      if (value == null) {
        AsyncStorage.setItem('FirstTime', 'true');
        setFirstTime(true);
      } else {
        setFirstTime(false);
      }
    });
  });

  if (FirstTime === null) {
    return null;
  } else if (FirstTime == true) {
    routeName = 'Registro';
  } else {
    routeName = 'Home';
  }

  return (
    <Drawer.Navigator
      initialRouteName={routeName}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#009387',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {marginLeft: -25, fontFamily: 'Roboto-Medium'},
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={FeedStack}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="ios-person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Torneios"
        component={TournamentScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="md-trophy-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Procurar"
        component={SearchScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="search" size={22} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Registro"
        component={RegistroGeral}
        options={{title: () => null}}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
