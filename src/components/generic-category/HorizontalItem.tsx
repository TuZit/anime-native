import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  thumbUrl: string;
  name: string;
  score: number | string;
};

const HorizontalItem = ({ thumbUrl, name, score }: Props) => {
  return (
    <TouchableOpacity className='w-[120px] m-1 py-0 px-1'>
      <View>
        <Image source={{ uri: thumbUrl }} className='rounded-2xl' width={100} height={165} />
      </View>

      <Text numberOfLines={2} className='text-sm font-semibold mt-1'>
        {name}
      </Text>
      <Text className='text-[13px]'>Score: {score}</Text>
    </TouchableOpacity>
  );
};

export default HorizontalItem;
