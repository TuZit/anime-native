import CommonLoading from '@/components/CommonLoading';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeftIcon, HeartIcon } from 'react-native-heroicons/outline';

type Params = {
  producerId: string;
};

const Profile = () => {
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const navigation = useNavigation<any>();

  const [producerDetail, setProducerDetail] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchProducerDetail = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/producers/${id}/full`);
      setProducerDetail(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducerDetail(params?.producerId);
  }, [params?.producerId]);

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

          <View className='items-center w-full py-8'>
            <Image
              resizeMode='contain'
              height={350}
              width={210}
              source={{ uri: producerDetail?.images?.jpg?.image_url }}
              className='mt-2'
            />

            <Text className='text-center text-2xl font-bold'>
              {producerDetail?.titles?.[0]?.title}
            </Text>
          </View>

          <View className='mt-8 mx-4'>
            <Text className='text-2xl font-bold'>About</Text>
            <Text className='mt-3 text-base'>{producerDetail?.about}</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Profile;
