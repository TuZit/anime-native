import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const CommonLoading = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default CommonLoading;
