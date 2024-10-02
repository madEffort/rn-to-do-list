import React from 'react';
import TodoPage from './pages/TodoPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image, Pressable, View } from 'react-native';

function App(): React.JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c',
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: -1,
        }}
      />
      <TodoPage />
    </View>
  );
}

export default App;
