import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const HomeScreen = () => {
  const [atualizando, setAtualizando] = useState(false);
  function aoAtualizar() {
    setAtualizando(true);
    setTimeout(() => {
      setAtualizando(false);
    }, 1000);
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={atualizando} onRefresh={aoAtualizar} />
      }>
      <View style={{alignItems: 'center'}}>
        <Image source={require('../assets/amadeus.png')} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
