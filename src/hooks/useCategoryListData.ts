import { useAppDispatch, useAppSelector } from '@/redux';
import {
  AnimeCategoryState,
  getAnimeCategoryThunkAction,
} from '@/redux/slices/AnimeCategoriesSlice';

type Props = {
  type?: string;
  genre?: any;
  categoryId: string | number;
};

const useCategoryListData = ({ categoryId }: Props) => {
  const dispatch = useAppDispatch();

  const { categoryToAnimeList } = useAppSelector(state => state.anime) as AnimeCategoryState;
  const data = categoryToAnimeList?.[categoryId];

  if (!data || data?.length === 0) {
    setTimeout(() => {
      dispatch(getAnimeCategoryThunkAction(categoryId));
    }, 1000);
    return null;
  }

  return data;
};

export default useCategoryListData;
