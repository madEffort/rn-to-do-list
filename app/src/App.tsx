import React from 'react';
import TodoPage from './pages/TodoPage';
import { Image, Pressable, SafeAreaView, View } from 'react-native';

function App(): React.JSX.Element {
  return (
    // 이 프로젝트는 리팩토링이 필요함
    <View style={{ flex: 1 }}>
      {/* <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/hand-drawn-blue-lined-paper-background_23-2151105441.jpg?t=st=1727853457~exp=1727857057~hmac=554dd12789464e87b187e45fcf1231490962ad42ae55366c87afb857c27895d1&w=1800',
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: -1,
        }}
      /> */}
      <TodoPage />
    </View>
  );
}

export default App;
