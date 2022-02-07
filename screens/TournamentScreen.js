import React from 'react';
import {Image, View} from 'react-native';

const TournamentScreen = ({}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
      <Image
        source={require('../assets/tournament.png')}
        style={{height: 200, width: '100%'}}
      />
    </View>
  );
};

export default TournamentScreen;
