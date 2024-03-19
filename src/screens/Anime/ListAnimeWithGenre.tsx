import CommonLoading from '@/components/CommonLoading';
import { CATEGORY_TYPE } from '@/utils/constant';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import HorizontalAnimeCard from './HorizontalAnimeCard';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { genresLocalData } from '@/utils/local-data/data.json';

type Params = {
  categoryId: string;
  type: string;
};

const ListAnimeWithGenre = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();

  const [listAnimes, setListAnimes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    const url =
      params?.categoryId && params.type === CATEGORY_TYPE.NORMAL
        ? `https://api.jikan.moe/v4/anime?limit=10&genres=${params.categoryId}`
        : `https://api.jikan.moe/v4/top/anime?page=${1}`;
    try {
      setLoading(true);
      const res = await axios.get(url);
      setListAnimes(res.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [params?.categoryId, params?.type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {loading ? (
        <CommonLoading />
      ) : (
        <View className='flex-1'>
          <View className='flex-row justify-between items-center w-[60%] ml-[5%] mb-6'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeftIcon fill={'#000'} stroke={'#000'} size={36} />
            </TouchableOpacity>
            <Text className='text-xl font-bold'>
              {params?.categoryId
                ? genresLocalData?.find((item: any) => item.mal_id === params?.categoryId)?.name
                : 'Top Anime'}
            </Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginHorizontal: 12 }}
            decelerationRate={Platform.OS === 'android' ? 0.85 : 0.96}
            disableIntervalMomentum={true}
            data={listAnimes as any}
            renderItem={({ item }) => (
              <HorizontalAnimeCard
                title={item?.title}
                imgUrl={item?.images?.jpg?.image_url}
                synopsis={item?.synopsis}
                score={item?.score}
                scored_by={item?.scored_by}
                producers={item?.producers}
                animeId={item?.mal_id}
              />
            )}
          />
        </View>
      )}
    </>
  );
};

export default ListAnimeWithGenre;
