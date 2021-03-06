import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthProvider';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const RegistroAtleta = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const [city, setCity] = useState('');
  const [cidade, setCidade] = useState('');

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        nome: userData.nome ? userData.nome : null,
        genero: userData.genero ? userData.genero : null,
        emailCom: userData.emailCom ? userData.emailCom : null,
        telefone: userData.telefone ? userData.telefone : null,
        estado: userData.estado ? userData.estado : null,
        cidade: userData.cidade ? userData.cidade : null,
        sobre: userData.sobre ? userData.sobre : null,
        apelido: userData.apelido ? userData.apelido : null,
        idade: userData.idade ? userData.idade : null,
        interessepro: userData.interessepro ? userData.interessepro : null,
        site: userData.site ? userData.site : null,
        clube: userData.clube ? userData.clube : null,
        altura: userData.altura ? userData.altura : null,
        peso: userData.peso ? userData.peso : null,
        posi????o1: userData.posi????o1 ? userData.posi????o1 : null,
        posi????o2: userData.posi????o2 ? userData.posi????o2 : null,
        meta: userData.meta ? userData.meta : null,
        emailres: userData.emailres ? userData.emailres : null,
        telefoneres: userData.telefoneres ? userData.telefoneres : null,
        conta: 'Atleta',
        userImg: imgUrl,
      })
      .then(() => {
        Alert.alert(
          'Perfil atualizado',
          'Suas altera????es foram salvas com sucesso!',
          [
            {
              onPress: () => navigation.navigate('Home'),
            },
          ],
        );
      });
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}></View>

      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Tirar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Escolher da Galeria</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Conclu??do</Text>
      </TouchableOpacity>
    </View>
  );
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  useEffect(() => {
    getUser();
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        setCity(response.data);
      });
  }, []);

  useEffect(() => {
    userData
      ? axios
          .get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${userData.estado}/municipios`,
          )
          .then(response => {
            setCidade(response.data);
          })
      : null;
  }, [userData ? userData.estado : null]);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImage(image.path);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setImage(image.path);
    });
  };

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <ScrollView style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[1010, 1]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />

      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: scale(100),
                width: scale(100),
                borderRadius: 15,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : userData
                    ? userData.userImg ||
                      'data:image/png;base64,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'
                    : 'data:image/png;base64,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',
                }}
                style={{height: scale(110), width: scale(110)}}
                imageStyle={{borderRadius: 60}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={27}
                    style={{
                      opacity: 0.8,
                      color: '#fff',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}></Icon>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.action, {marginTop: 26}]}>
          <FontAwesome name="user-o" size={20} color="#009387" />
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.nome : ''}
            onChangeText={txt => setUserData({...userData, nome: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {userData ? (
            userData.genero == 'masculino' ? (
              <Icon name="gender-male" size={25} color="#009387" />
            ) : userData.genero == 'feminino' ? (
              <Icon name="gender-female" size={26} color="#009387" />
            ) : (
              <FontAwesome name="genderless" size={25} color="#009387" />
            )
          ) : (
            <FontAwesome name="genderless" size={25} color="#009387" />
          )}
          <Picker
            selectedValue={userData ? userData.genero : 'G??nero'}
            onValueChange={(itemValue, itemIndex) =>
              setUserData({...userData, genero: itemValue})
            }
            style={{width: 220}}
            dropdownIconColor="#009387">
            <Picker.Item
              style={{fontSize: 13.9}}
              label="G??nero"
              enabled={false}
            />
            <Picker.Item
              style={{fontSize: 13.9}}
              label="Masculino"
              value="masculino"
            />
            <Picker.Item
              style={{fontSize: 13.9}}
              label="Feminino"
              value="feminino"
            />
          </Picker>
        </View>
        <View style={styles.action}>
          <Feather name="mail" size={20} color="#009387" />
          <TextInput
            placeholder="Email Comercial"
            keyboardType="email-address"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.emailCom : ''}
            onChangeText={txt => setUserData({...userData, emailCom: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" size={20} color="#009387" />
          <TextInput
            placeholder="Telefone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            value={userData ? userData.telefone : ''}
            onChangeText={txt => setUserData({...userData, telefone: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="map-marker-outline" size={23} color="#009387" />
          <Picker
            selectedValue={userData ? userData.estado : 'Estado'}
            onValueChange={(itemValue, itemIndex) =>
              setUserData({...userData, estado: itemValue})
            }
            style={{width: 220}}
            dropdownIconColor="#009387">
            <Picker.Item style={{fontSize: 13.9}} label="Estado" value={null} />
            {city
              ? city.map(cities => (
                  <Picker.Item
                    label={cities.nome}
                    value={cities.sigla}
                    key={cities.id}
                    style={{fontSize: 13.9}}
                  />
                ))
              : null}
          </Picker>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="map-marker-outline" size={23} color="#009387" />
          <Picker
            selectedValue={userData ? userData.cidade : 'Cidade'}
            onValueChange={(itemValue, itemIndex) =>
              setUserData({...userData, cidade: itemValue})
            }
            style={{width: 220}}
            dropdownIconColor="#009387">
            <Picker.Item style={{fontSize: 13.9}} label="Cidade" value={null} />
            {cidade
              ? cidade.map(cities => (
                  <Picker.Item
                    label={cities.nome}
                    value={cities.nome}
                    key={cities.id}
                    style={{fontSize: 13.9}}
                  />
                ))
              : null}
          </Picker>
        </View>
        <View style={styles.action}>
          <Icon name="pencil-box-outline" size={25} color="#009387" />
          <TextInput
            placeholder="Sobre mim"
            placeholderTextColor="#666666"
            autoCorrect={false}
            multiline
            numberOfLines={4}
            value={userData ? userData.sobre : ''}
            onChangeText={txt => setUserData({...userData, sobre: txt})}
            style={[styles.textInput, {marginTop: -32}]}
          />
        </View>
        <Image
          style={styles.ficha}
          source={require('../../assets/dados-icon.png')}
        />
        <View style={styles.box}>
          <View style={styles.action}>
            <TextInput
              placeholder="Apelido"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.apelido : ''}
              onChangeText={txt => setUserData({...userData, apelido: txt})}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Idade"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.idade : ''}
              onChangeText={txt => setUserData({...userData, idade: txt})}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Interesse Profissional"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.interessepro : ''}
              onChangeText={txt =>
                setUserData({...userData, interessepro: txt})
              }
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Site"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.site : ''}
              onChangeText={txt => setUserData({...userData, site: txt})}
              style={styles.textInput}
            />
          </View>
          {userData ? (
            userData.idade < 18 ? (
              <View style={styles.action}>
                <TextInput
                  placeholder="Email do respons??vel"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  value={userData ? userData.emailres : ''}
                  onChangeText={txt =>
                    setUserData({...userData, emailres: txt})
                  }
                  style={styles.textInput}
                />
              </View>
            ) : null
          ) : null}
          {userData ? (
            userData.idade < 18 ? (
              <View style={styles.action}>
                <TextInput
                  placeholder="Telefone do respons??vel"
                  placeholderTextColor="#666666"
                  autoCorrect={false}
                  value={userData ? userData.telefoneres : ''}
                  onChangeText={txt =>
                    setUserData({...userData, telefoneres: txt})
                  }
                  style={styles.textInput}
                />
              </View>
            ) : null
          ) : null}
          <View style={styles.action}>
            <TextInput
              placeholder="Clube Afiliado"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.clube : ''}
              onChangeText={txt => setUserData({...userData, clube: txt})}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Altura (m)"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.altura : ''}
              onChangeText={txt => setUserData({...userData, altura: txt})}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Peso (kg)"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.peso : ''}
              onChangeText={txt => setUserData({...userData, peso: txt})}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Posi????o 1"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.posi????o1 : ''}
              onChangeText={txt => setUserData({...userData, posi????o1: txt})}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Posi????o 2"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.posi????o2 : ''}
              onChangeText={txt => setUserData({...userData, posi????o2: txt})}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <TextInput
              placeholder="Meta/Sonho"
              placeholderTextColor="#666666"
              autoCorrect={false}
              multiline
              numberOfLines={3}
              value={userData ? userData.meta : ''}
              onChangeText={txt => setUserData({...userData, meta: txt})}
              style={styles.textInput}
            />
          </View>
        </View>
        {uploading ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#009387'}}>{transferred} % </Text>
            <ActivityIndicator size="small" color="#009387" />
          </View>
        ) : (
          <TouchableOpacity onPress={handleUpdate} style={styles.commandButton}>
            <Text style={styles.panelButtonTitle}>Salvar </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </ScrollView>
  );
};

export default RegistroAtleta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#009387',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
  box: {
    borderColor: '#009387',
    borderWidth: 1,
    width: '100%',
    marginTop: 0,
    alignSelf: 'center',
  },
  ficha: {
    marginTop: 10,
    alignSelf: 'center',
    height: 50,
    width: 50,
  },
});
