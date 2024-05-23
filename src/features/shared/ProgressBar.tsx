import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, StyleProp, ViewStyle, Animated, Easing } from 'react-native';
import { colors } from '@globals/globalStyles'; // Ensure this import is correct

type Props = {
  /**
   * The progress prop represents the current progress as a percentage.
   * It controls the width of the filled portion of the progress bar.
   * The value should be between 0 and 100.
   */
  progress?: number;
  /**
   * The duration prop represents the duration in seconds for the progress bar to animate from 0 to 100%.
   */
  duration?: number;
  /**
   * The color prop represents the color of the filled portion of the progress bar.
   * The default value is the primary color from the global styles.
   */
  color?: string;
  /**
   * Additional container styles
   */
  style?: StyleProp<ViewStyle>;
};

export const ProgressBar: FC<Props> = ({ progress = 0, duration, color, style }) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (duration) {
      // Animate the progress from 0 to 100 over the specified duration
      Animated.timing(animatedProgress, {
        toValue: 100,
        duration: duration * 1000,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    } else {
      // Set the progress directly if duration is not provided
      animatedProgress.setValue(progress);
      setDisplayProgress(progress);
    }

    // Add listener to update display progress
    const listenerId = animatedProgress.addListener(({ value }) => {
      setDisplayProgress(Math.round(value));
    });

    // Cleanup listener on unmount
    return () => {
      animatedProgress.removeListener(listenerId);
    };
  }, [duration, progress]);

  const animatedWidth = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[{ paddingTop: 24 }, style]}>
      <View
        style={{
          width: '100%',
          height: 8,
          borderRadius: 100,
          backgroundColor: colors.grey[10],
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            width: animatedWidth,
            height: '100%',
            borderRadius: 100,
            backgroundColor: color ? color : colors.primary.base,
          }}
        />
      </View>
      <Text
        style={{
          position: 'absolute',
          right: `${100 - displayProgress - 5}%`,
          top: 10,
          fontFamily: 'gilroy-semibold',
          fontSize: 12,
          lineHeight: 12,
          color: colors.grey[60],
        }}
      >
        {displayProgress}%
      </Text>
    </View>
  );
};
