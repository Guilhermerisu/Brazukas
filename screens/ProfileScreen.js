import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Avatar, Title, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const ProfileScreen = ({navigation, route}) => {
  const [userData, setUserData] = useState(null);
  const {user, logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/background1.png')}
        style={{
          height: scale(242),
          width: '100%',
          overflow: 'hidden',
          borderBottomLeftRadius: 27,
          borderBottomRightRadius: 27,
        }}>
        <View style={{alignItems: 'center', marginTop: scale(5)}}>
          <Avatar.Image
            source={{
              uri: userData
                ? userData.userImg
                : 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fa.rpassets.com%2Flocal%2Fdevelop-359%2Fimg%2Funiversal-assets%2Favatars%2Fno-profile-image.png&imgrefurl=https%3A%2F%2Fwww.ratedpeople.com%2Fprofile%2Fatlas-green%2F&tbnid=CgKY4UErTuKcKM&vet=12ahUKEwiei9O2t7vzAhWEmJUCHXV8BtkQMygXegUIARDNAQ..i&docid=bOJ_maZf4IZUoM&w=160&h=160&itg=1&q=no%20profile%20picture%20green&ved=2ahUKEwiei9O2t7vzAhWEmJUCHXV8BtkQMygXegUIARDNAQ',
            }}
            size={scale(113)}
          />
        </View>
        <View style={{marginTop: scale(10), alignItems: 'center'}}>
          <Title style={styles.title}>{userData ? userData.nome : ''}</Title>
          <Caption style={styles.caption}>
            {userData ? userData.conta : ''}
          </Caption>
        </View>
      </ImageBackground>
      <View style={{alignItems: 'center'}}>
        <View style={styles.box}>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CardScreenStack', {
                  userId: route.params ? route.params.userId : user.uid,
                })
              }
              style={{
                width: scale(75),
                height: scale(85),
                borderRadius: 17,
                backgroundColor: '#f1f1f1',
                marginLeft: scale(10),
              }}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                  source={require('../assets/dados-icon.png')}
                  style={{height: 48, width: 48, marginTop: 7}}
                />
                <Text style={{marginTop: 8, fontWeight: '600'}}>Ficha</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ContactScreenStack', {
                  userId: route.params ? route.params.userId : user.uid,
                })
              }
              style={{
                width: scale(75),
                height: scale(85),
                borderRadius: 17,
                backgroundColor: '#f1f1f1',
                marginLeft: scale(10),
              }}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                  source={require('../assets/contatos-icon.png')}
                  style={{height: 50, width: 50, marginTop: 7}}
                />
                <Text style={{marginTop: 7, fontWeight: '600'}}>Contato</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('HomeProfile', {
                  userId: route.params ? route.params.userId : user.uid,
                })
              }
              style={{
                width: scale(75),
                height: scale(85),
                borderRadius: 17,
                backgroundColor: '#f1f1f1',
                marginLeft: scale(10),
              }}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                  source={require('../assets/phot-icon.png')}
                  style={{height: 48, width: 48, marginTop: 7}}
                />
                <Text style={{marginTop: 8, fontWeight: '600'}}>Posts</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.lineOne}></View>
            <Text style={styles.sobre}>SOBRE MIM</Text>
            <View style={styles.lineTwo}></View>
          </View>
          <View style={styles.sobretext}>
            <Text style={{color: '#403F3F'}}>
              {userData ? userData.sobre : ''}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop: 10,
  },
  title: {
    fontSize: 20.5,
    fontWeight: '100',
    color: '#fff',
  },
  caption: {
    fontSize: 15,
    lineHeight: 14,
    fontWeight: '500',
    color: '#C6C5C5',
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  box: {
    margin: 8,
    width: Dimensions.get('window').width / 1.3,
    height: Dimensions.get('window').height / 2.0,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomEndRadius: 8,
    borderTopStartRadius: 8,
    borderColor: '#fff',
    borderTopEndRadius: 8,
    borderBottomStartRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 8,
    marginTop: -45,
  },
  divider: {
    borderBottomColor: '#F0EEEE',
    borderBottomWidth: 1,
    width: '92%',
    marginTop: 10,
    alignSelf: 'center',
  },
  lineOne: {
    borderBottomColor: '#017970',
    borderBottomWidth: 1,
    width: 20,
    marginTop: 60,
    marginLeft: 10,
  },
  lineTwo: {
    borderBottomColor: '#017970',
    borderBottomWidth: 1,
    width: 137,
    marginTop: 60,
    marginLeft: 7,
  },
  sobre: {
    color: '#017970',
    marginTop: 60,
    fontWeight: 'bold',
    marginLeft: 7,
  },
  sobretext: {
    margin: 10,
  },
});
