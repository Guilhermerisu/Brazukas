import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const CustomDrawer = props => {
  const [data, setData] = useState([]);
  const {user, logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const getUser = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setData(documentSnapshot.data());
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser();
    navigation.addListener('state', () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#009387'}}>
        <ImageBackground
          source={require('../assets/backgroundBlur.png')}
          style={{padding: 18, marginTop: -4.5}}>
          <Image
            style={{
              height: scale(80),
              width: scale(80),
              borderRadius: scale(40),
              marginBottom: 10,
            }}
            source={{
              uri: data
                ? data.userImg
                : 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fa.rpassets.com%2Flocal%2Fdevelop-359%2Fimg%2Funiversal-assets%2Favatars%2Fno-profile-image.png&imgrefurl=https%3A%2F%2Fwww.ratedpeople.com%2Fprofile%2Fatlas-green%2F&tbnid=CgKY4UErTuKcKM&vet=12ahUKEwiei9O2t7vzAhWEmJUCHXV8BtkQMygXegUIARDNAQ..i&docid=bOJ_maZf4IZUoM&w=160&h=160&itg=1&q=no%20profile%20picture%20green&ved=2ahUKEwiei9O2t7vzAhWEmJUCHXV8BtkQMygXegUIARDNAQ',
            }}
          />
          <Text style={{color: '#fff', fontSize: 16.5, fontWeight: '500'}}>
            {data.nome}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#fff', fontSize: 14, marginTop: 1}}>
              {data.conta}
            </Text>
            <Ionicons
              name="md-trophy"
              size={16}
              color="#fff"
              style={{marginTop: 4, marginLeft: 3}}
            />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 9}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 10, borderTopWidth: 1.2, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => logout()}
          style={{paddingVertical: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sair
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
