import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import { Rating } from 'react-native-ratings';

export interface StarRatingProps extends ViewProps {
  score: number;
  scoredBy: number;
}

function StarRating(props: StarRatingProps) {
  const { score, scoredBy } = props;

  return (
    <View className='flex-row items-center'>
      {score && score > 0 ? (
        <Rating
          type='custom'
          ratingCount={5}
          readonly
          imageSize={20}
          fractions={1}
          startingValue={props.score}
          ratingColor={'#DEC9AB'}
          ratingBackgroundColor={'#fff'}
          style={props.style}
        />
      ) : null}
      {scoredBy && (
        <Text className='text-sm ml-2 text-[#9e9e9e]'>
          {score} / {scoredBy} reviewers
        </Text>
      )}
    </View>
  );
}

export default StarRating;
