import CommonLoading from '@/components/CommonLoading';
import StarRating from '@/components/StarRating';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { ArrowLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import YoutubeIframe from 'react-native-youtube-iframe';

type Params = {
  animeId: string;
};

const AnimeDetail = () => {
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const animeId = params?.animeId;
  const navigation = useNavigation<any>();
  const height = Dimensions.get('screen').height;

  const [detailAnime, setDetailAnime] = useState<any>();
  const [loading, setLoading] = useState(false);

  const getYoutubeVideoId = useCallback((url: string) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url?.match(regex);
    if (match && match?.[1]) return match[1];
    return undefined;
  }, []);

  const fetchAnimeDetail = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
      setDetailAnime(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnimeDetail(animeId);
  }, [animeId]);

  return (
    <>
      {loading ? (
        <CommonLoading />
      ) : (
        <ScrollView className='relative'>
          <View className='flex-row items-center justify-between absolute w-full px-4 z-50 top-5'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeftIcon fill={'#000'} stroke={'#000'} size={36} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <HeartIcon stroke={'#DEC9AB'} size={36} />
            </TouchableOpacity>
          </View>

          <View className='items-center w-full bg-[#FCF4E9] py-8'>
            <Image
              resizeMode='contain'
              height={350}
              width={210}
              source={{ uri: detailAnime?.images?.jpg?.image_url }}
              className='mt-6'
            />

            <Text className='text-center text-2xl font-bold'>{detailAnime?.title}</Text>

            <Text numberOfLines={1} className='text-center w-[80%] my-3'>
              {detailAnime?.producers?.map((prod: any) => prod.name)?.join(',')}
            </Text>

            <StarRating score={detailAnime?.score / 2} scoredBy={detailAnime?.scored_by} />

            <View className='flex-row items-center justify-between gap-x-3 my-3'>
              <Text className='text-base'>Rank #{detailAnime?.rank}</Text>
              <Text className='text-base'>Popularity #{detailAnime?.popularity}</Text>
              <Text className='text-base'>
                Members #{new Intl.NumberFormat().format(detailAnime?.members)}
              </Text>
            </View>
            <View className='flex-row items-center justify-center gap-3'>
              {detailAnime?.genres?.map((genre: any) => (
                <TouchableOpacity
                  className='border rounded-full border-yellow-600 p-2'
                  key={genre?.mal_id}
                  // onPress={() => navigation.navigate('')}
                >
                  <Text>{genre?.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className='mt-8 mx-4'>
            <Text className='text-2xl font-bold'>Synopsis</Text>
            <Text className='mt-3 text-base'>{detailAnime?.synopsis}</Text>
          </View>

          <View className='mt-8 mx-4'>
            <Text className='text-2xl font-bold'>Producers</Text>
            {detailAnime?.producers?.map((producer: any) => (
              <TouchableOpacity
                key={producer?.mal_id}
                onPress={() =>
                  navigation.navigate('profile', {
                    producerId: producer?.mal_id,
                  })
                }
              >
                <Text className='mt-1 text-base underline decoration-[#DEC9AB] text-[#DEC9AB]'>
                  {producer.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className='mt-8 mx-4 mb-5'>
            <Text className='text-2xl font-bold mb-2'>Trailer</Text>
            <YoutubeIframe
              videoId={getYoutubeVideoId(detailAnime?.trailer?.url)}
              height={height / 4}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default AnimeDetail;
