import StarRating from '@/components/StarRating';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  title: string;
  imgUrl: string;
  producers: any[];
  synopsis: string;
  score: number;
  scored_by: number;
  animeId: number | string;
};

const HorizontalAnimeCard = ({
  title,
  imgUrl,
  producers,
  synopsis,
  score,
  scored_by,
  animeId,
}: Props) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      className='flex-row justify-between items-center gap-x-3 pr-4'
      onPress={() => navigation.navigate('anime-detail', { animeId: animeId })}
    >
      <View>
        <Image
          source={{ uri: imgUrl }}
          resizeMode='contain'
          height={165}
          width={100}
          borderRadius={20}
        />
      </View>

      <View className='flex-1 items-start justify-start'>
        <Text className='text-base font-bold' numberOfLines={1}>
          {title}
        </Text>
        <Text numberOfLines={1} className='w-[80%]'>
          {producers?.map(prod => prod?.name)?.join(',')}
        </Text>
        <Text numberOfLines={3} className='mt-3 mb-1'>
          {synopsis}
        </Text>
        <StarRating score={score / 2} scoredBy={scored_by} imageSize={16} />
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalAnimeCard;
