import { colors } from '@globals/globalStyles';
import { FC } from 'react';
import { Text, View } from 'react-native';

type Props = { progress: number };

export const ProgressBar: FC<Props> = ({ progress }) => {
  return (
    <View style={{ paddingTop: 22 }}>
      <View
        style={{
          width: 'auto',
          height: 8,
          borderRadius: 100,
          backgroundColor: colors.grey[10],
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${progress}%`,
            height: '100%',
            borderRadius: 100,
            backgroundColor: colors.primary.base,
          }}
        />
      </View>
      <Text
        style={{
          position: 'absolute',
          right: `${100 - progress}%`,
          top: 6,
          fontFamily: 'gilroy-semibold',
          fontSize: 12,
          lineHeight: 12,
          color: colors.grey[60],
        }}
      >
        {progress}%
      </Text>
    </View>
  );
};
