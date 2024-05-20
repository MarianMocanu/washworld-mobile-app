import { RewardsIcon } from '@shared/RewardsIcon';
import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';

interface Props extends PropsWithChildren {
  title?: string;

  subTitle?: string;

  rewardsIconColor?: string;

  rewardsIconSize?: number;
}

export const Collapsible: FC<Props> = ({ title, subTitle, rewardsIconColor, rewardsIconSize, children }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80], // Adjust the output range as needed
  });

  return (
    <View>
      <TouchableOpacity onPress={toggleExpand} style={styles.clickableArea} activeOpacity={1}>
        {rewardsIconColor && <RewardsIcon color={rewardsIconColor} size={rewardsIconSize || 24} />}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title} Level</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
        <MaterialIcons
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          style={{ fontSize: 40, lineHeight: 40, color: '#BBBBBB', marginLeft: 'auto' }}
        />
      </TouchableOpacity>
      <Animated.View style={{ height: heightInterpolate }}>
        {expanded && <View>{children}</View>}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  clickableArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    marginLeft: 12,
  },
  title: {
    fontFamily: 'gilroy-semibold',
    fontSize: 18,
    lineHeight: 22,
    color: colors.black.base,
  },
  subTitle: {
    ...globalTextStyles.inactive,
  },
});

