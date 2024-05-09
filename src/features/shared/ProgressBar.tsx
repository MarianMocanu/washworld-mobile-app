import { colors } from '@globals/globalStyles';
import { FC } from 'react';
import { Text, View } from 'react-native';

type Props = {
  /**
   * The progress prop represents the current progress as a percentage.
   * It controls the width of the filled portion of the progress bar.
   * The value should be between 0 and 100.
   */
  progress: number;
  /**
   * The color prop represents the color of the filled portion of the progress bar.
   * The default value is the primary color from the global styles.
   */
  color?: string;
};

export const ProgressBar: FC<Props> = ({ progress, color }) => {
  return (
    <View style={{ paddingTop: 24 }}>
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
            backgroundColor: color ? color : colors.primary.base,
          }}
        />
      </View>
      <Text
        style={{
          position: 'absolute',
          right: `${100 - progress}%`,
          top: 10,
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
