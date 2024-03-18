import GenericCategoryHorizontal from '@/components/generic-category/GenericCategoryHorizontal';
import HorizontalBlock from '@/components/generic-category/HorizontalBlock';
import { genresLocalData } from '@/utils/local-data/data.json';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const HOME_MANGA_PER_SCROLL = 1;

const Home = () => {
  const [topAnime, setTopAnime] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [genres, setGenres] = useState<any>(genresLocalData?.slice(0, HOME_MANGA_PER_SCROLL));

  // Fetch category when reach end of screen
  const onReachedEnd = () => {
    if (genres?.length !== genresLocalData?.length) {
      setGenres((prev: any) => {
        const startIndex = prev?.length;
        const endIndex =
          startIndex + HOME_MANGA_PER_SCROLL <= genresLocalData?.length
            ? startIndex + HOME_MANGA_PER_SCROLL
            : genresLocalData?.length;
        return [...genresLocalData?.slice(0, endIndex)];
      });
    }
  };

  // Return list of categories
  const getCategoriesData = () => {
    if (genres?.length === 0) {
      onReachedEnd();
      return [];
    }
    return genres;
  };

  // fetch list Top Anime
  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://api.jikan.moe/v4/top/anime?limit=10');
        setTopAnime(res.data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchTopAnime();
  }, []);

  const FlatListHeader = useCallback(() => {
    return (
      <View>
        <View className='rounded-full bg-yellow-700 mb-3'>
          <Text className='text-center p-4 text-lg'>
            Hello, which anime suits your current mood ? Start your journey
          </Text>
        </View>
        <HorizontalBlock title='Top Anime' data={topAnime} />
      </View>
    );
  }, [topAnime]);

  // Loading component
  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View className='flex-1 mx-4'>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          genres.length !== genresLocalData.length ? <ActivityIndicator size={'large'} /> : null
        }
        ListHeaderComponent={<FlatListHeader />}
        data={getCategoriesData()}
        renderItem={({ item }) => (
          <GenericCategoryHorizontal
            key={item?.mal_id}
            title={item?.name}
            categoryId={item?.mal_id}
          />
        )}
        keyExtractor={item => item?.mal_id}
        onEndReached={onReachedEnd}
      />
    </View>
  );
};

export default Home;
