import React, {useEffect} from 'react';
import Providers from './navigation';
import RNBootSplash from 'react-native-bootsplash';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({duration: 250, fade: true});
  }, []);

  return <Providers />;
};

export default App;
