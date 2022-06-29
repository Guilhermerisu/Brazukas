import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import {Avatar, Title, Caption} from 'react-native-paper';
import {scale} from 'react-native-size-matters';

const CardScreen = ({route, navigation}) => {
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
    <View style={{}}>
      <View style={styles.boxmargin}>
        <View style={{alignItems: 'center', marginBottom: -32, elevation: 1}}>
          <Avatar.Image
            source={{
              uri: userData
                ? userData.userImg
                : 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fa.rpassets.com%2Flocal%2Fdevelop-359%2Fimg%2Funiversal-assets%2Favatars%2Fno-profile-image.png&imgrefurl=https%3A%2F%2Fwww.ratedpeople.com%2Fprofile%2Fatlas-green%2F&tbnid=CgKY4UErTuKcKM&vet=12ahUKEwiei9O2t7vzAhWEmJUCHXV8BtkQMygXegUIARDNAQ..i&docid=bOJ_maZf4IZUoM&w=160&h=160&itg=1&q=no%20profile%20picture%20green&ved=2ahUKEwiei9O2t7vzAhWEmJUCHXV8BtkQMygXegUIARDNAQ',
            }}
            size={scale(97)}
          />
        </View>
        <View style={[styles.box, {backgroundColor: '#017970'}]}>
          <Title style={styles.title}>{userData ? userData.nome : null}</Title>
          <Caption style={styles.caption}>
            {userData ? userData.conta : ''}
          </Caption>
          <Text></Text>
        </View>
        <View style={styles.box}>
          <Text></Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.item}>Apelido: </Text>
            <Text>{userData ? userData.apelido : null}</Text>
            <View style={styles.dividerH}></View>
            <Text style={styles.item}>Clube: </Text>
            <Text>{userData ? userData.clube : null}</Text>
          </View>
          <View style={[styles.divider, {marginTop: 2}]}></View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.item}>Idade: </Text>
            <Text>{userData ? userData.idade : null}</Text>
            <View style={styles.dividerH}></View>
            <Text style={styles.item}>Cidade: </Text>
            <Text>
              {userData ? userData.cidade : null} (
              {userData ? userData.estado : null})
            </Text>
          </View>
          <View style={[styles.divider, {marginTop: 2}]}></View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.item}>Posição 1: </Text>
            <Text>{userData ? userData.posição1 : null}</Text>
            <View style={styles.dividerH}></View>
            <Text style={styles.item}>Posição 2: </Text>
            <Text>{userData ? userData.posição2 : null}</Text>
          </View>
          <View style={[styles.divider, {marginTop: 2}]}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={styles.item}>Altura: </Text>
            <Text>{userData ? userData.altura : null}</Text>
            <View style={styles.dividerH}></View>
            <Text style={styles.item}>Peso: </Text>
            <Text>{userData ? userData.peso : null}</Text>
          </View>
          <View style={[styles.divider, {marginTop: 2}]}></View>
          <Text></Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: -10,
            }}>
            <Text style={styles.item}>Interesse: </Text>
            <Text>{userData ? userData.interessepro : null}</Text>
          </View>
          <View style={[styles.divider, {marginTop: 2}]}></View>
          <Text></Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: -10,
            }}>
            <Text
              onPress={() => Linking.openURL(userData ? userData.site : null)}>
              {userData ? userData.site : null}
            </Text>
          </View>
          <View style={[styles.divider, {marginTop: 2}]}></View>
          <Text></Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: -10,
            }}>
            <Text style={styles.item}>Meta/Sonho: </Text>
            <Text style={{width: 199}}>{userData ? userData.meta : null}</Text>
          </View>
          <View style={[styles.divider, {marginTop: 2}]}></View>
          <Text></Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: -10,
            }}>
            <Text
              style={[
                styles.item,
                userData
                  ? userData.testimage1
                    ? {color: '#009387'}
                    : {color: 'red'}
                  : null,
              ]}>
              Ecocardiograma{' '}
            </Text>
            <Text>{userData ? userData.datatest1 : null}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                styles.item,
                userData
                  ? userData.testimage2
                    ? {color: '#009387'}
                    : {color: 'red'}
                  : null,
              ]}>
              Eletrocardiograma{' '}
            </Text>
            <Text>{userData ? userData.datatest2 : null}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                styles.item,
                userData
                  ? userData.testimage3
                    ? {color: '#009387'}
                    : {color: 'red'}
                  : null,
              ]}>
              Teste de Esforço{' '}
            </Text>
            <Text>{userData ? userData.datatest3 : null}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                styles.item,
                userData
                  ? userData.testimage4
                    ? {color: '#009387'}
                    : {color: 'red'}
                  : null,
              ]}>
              Hemoglobina Glicada{' '}
            </Text>
            <Text>{userData ? userData.datatest4 : null}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  box: {
    borderColor: '#017970',
    borderWidth: 1,
    width: '82%',
    alignSelf: 'center',
    backgroundColor: '#EBE8E8',
  },
  boxmargin: {
    margin: 0,
  },
  title: {
    marginTop: 35,
    alignSelf: 'center',
    color: '#F4F4F4',
  },
  caption: {
    fontSize: 15,
    lineHeight: 14,
    fontWeight: '500',
    color: '#C6C5C5',
    alignSelf: 'center',
  },
  divider: {
    borderBottomColor: '#017970',
    borderBottomWidth: 1.2,
    width: '100%',
    marginTop: 10,
    alignSelf: 'center',
  },
  dividerH: {
    borderRightColor: '#017970',
    borderRightWidth: 1.2,
    height: '100%',
    width: 10,
    marginRight: 10,
  },
  item: {
    fontWeight: 'bold',
  },
});
