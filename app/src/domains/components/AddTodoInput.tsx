import React from 'react';
import { Pressable, SafeAreaView, TextInput, View } from 'react-native';
import { ITEM_WIDTH } from '../../constants/item_constant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';

type AddTodoInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onPressAdd: () => void;
  onSubmitEditing: () => void;
  onFocus: () => void;
};

const AddTodoInput = ({
  value,
  onChangeText,
  placeholder,
  onPressAdd,
  onSubmitEditing,
  onFocus,
}: AddTodoInputProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        onFocus={onFocus}
        style={{
          paddingVertical: 6,
          paddingHorizontal: 10,
          width: ITEM_WIDTH + 20,
          height: 40,
        }}
      />
      <TouchableOpacity
        hitSlop={10}
        onPress={onPressAdd}
        style={{
          paddingHorizontal: 6,
          borderWidth: 0.5,
          borderRadius: 15,
          paddingVertical: 6,
        }}>
        <AntDesign name={'plus'} size={20} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoInput;
