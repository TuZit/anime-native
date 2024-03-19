import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import HorizontalItem from './HorizontalItem';
import { useNavigation } from '@react-navigation/native';
import { CATEGORY_TYPE } from '@/utils/constant';

type Props = {
  title: string;
  data: any[];
  showViewAll?: boolean;
};

const HorizontalBlock = ({ title, data, showViewAll = true }: Props) => {
  const navigation = useNavigation<any>();

  return (
    <View className='mt-2 mb-4 min-h-[250px]'>
      <View className='flex-row justify-between items-center'>
        <Text className='text-xl font-bold mb-1'>{title}</Text>
        {showViewAll && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('category', {
                type: CATEGORY_TYPE.TOP_ANIME,
              })
            }
          >
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
            animeId={item?.mal_id}
          />
        )}
        keyExtractor={(item: any) => item?.mal_id}
      />
    </View>
  );
};

export default HorizontalBlock;
