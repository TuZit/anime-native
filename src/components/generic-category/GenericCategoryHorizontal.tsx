import useCategoryListData from '@/hooks/useCategoryListData';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import HorizontalItem from './HorizontalItem';

type Props = {
  title: string;
  showViewAll?: boolean;
  categoryId: string | number;
};

const GenericCategoryHorizontal = ({ title, categoryId, showViewAll = true }: Props) => {
  const categoryData = useCategoryListData({
    categoryId: categoryId,
  });

  return (
    <View className='mt-2 mb-4'>
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
        data={categoryData as any}
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

export default GenericCategoryHorizontal;
