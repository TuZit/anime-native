import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@/redux';
import { loginThnkAction } from '@/redux/slices/AuthSlice';

const Login = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('papadracula141@gmail.com');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      dispatch(
        loginThnkAction({
          email: email,
          password: password,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // component KeyboardAvoidingView giúp cho khi ta nhập vào trường input thì bàn phím của đt sẽ đc bật lên
    // Nó sẽ tự động điều chỉnh height, position hoặc padding phía dưới dựa trên chiều cao bàn phím để vẫn
    // hiển thị trong khi bàn phím ảo được hiển thị.
    <KeyboardAvoidingView
      // behavior='padding': tự động thêm 1 phần padding phía dưới bàn phím
      behavior='padding'
      // Thêm khoảng offset trên để tránh vỡ layout
      //   keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your email'
          autoCorrect={false}
          autoCapitalize='none'
          textContentType='emailAddress'
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your password'
          autoCorrect={false}
          autoCapitalize='none'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          onPress={handleSubmit}
          className='px-4 py-2 bg-sky-500 rounded-full mx-auto mt-3'
          // style={{ width: wp(30) }}
        >
          <Text className='text-center text-lg'>Login</Text>
        </Pressable>

        <View className='mt-3 flex-row items-center self-center justify-center'>
          <Text className='text-md'>Dont't have account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('register')}>
            <Text className='text-lg text-sky-600 font-semibold ml-2'>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  iconImage: {
    width: 200,
    height: 400,
    alignSelf: 'center',
    marginBottom: 50,
  },
  rememeberContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 20,
    marginBottom: 16,
  },
});

export default Login;
