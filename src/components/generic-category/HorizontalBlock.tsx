import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import HorizontalItem from './HorizontalItem';

type Props = {
  title: string;
  data: any[];
  showViewAll?: boolean;
};

const HorizontalBlock = ({ title, data, showViewAll = true }: Props) => {
  return (
    <View className='mt-2 mb-4 min-h-[250px]'>
      <View className='flex-row justify-between items-center'>
        <Text className='text-xl font-bold mb-1'>{title}</Text>
        {showViewAll && (
          <TouchableOpacity>
            <Text className='text-base'>View all..</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({ item }) => (
          <HorizontalItem
            thumbUrl={item?.images?.jpg?.image_url}
            name={item?.title}
            score={item?.score}
          />
        )}
        keyExtractor={(item: any) => item?.mal_id}
      />
    </View>
  );
};

export default HorizontalBlock;
