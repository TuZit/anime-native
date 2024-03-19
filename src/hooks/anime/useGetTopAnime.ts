import axios from 'axios';
import { useState } from 'react';

const useGetTopAnime = () => {
  const [topAnime, setTopAnime] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  //   useEffect(() => {
  //     fetchTopAnime();
  //   }, []);

  return {
    topAnime,
    loading,
    fetchTopAnime,
  };
};

export default useGetTopAnime;
