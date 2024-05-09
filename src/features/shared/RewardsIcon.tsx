import { colors } from '@globals/globalStyles';
import { FC } from 'react';
import { Text, View } from 'react-native';

type Props = {
  color: string;
  size: number;
};

export const RewardsIcon: FC<Props> = ({ color, size }) => {
  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: size,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: 'gilroy-bold',
          fontSize: size / 2 + 2,
          lineHeight: size / 2 + 2,
          color: colors.white.base,
        }}
      >
        w
      </Text>
    </View>
  );
};
