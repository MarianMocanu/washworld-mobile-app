import { RewardsIcon } from '@shared/RewardsIcon';
import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';

interface Props extends PropsWithChildren {
  title?: string;

  subTitle?: string;

  textContent: string;
}

export const CollapsibleShared: FC<Props> = ({ title, subTitle, textContent, children }) => {
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
    outputRange: [0, textContent.length / 1.7], // Adjust the output range as needed
  });

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={toggleExpand} style={styles.clickableArea} activeOpacity={1}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
        </View>
        <MaterialIcons
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          style={{ fontSize: 40, lineHeight: 40, color: colors.white.base, marginLeft: 'auto' }}
        />
      </TouchableOpacity>
      <Animated.View
        style={[{ height: heightInterpolate }, expanded && { paddingVertical: 8, paddingHorizontal: 4 }]}
      >
        {expanded && <Text style={styles.textContent}>{textContent}</Text>}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%',
    display: 'flex',
  },
  clickableArea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.base,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    paddingLeft: 16,
  },
  titleContainer: {
    marginLeft: 0,
    marginRight: 48,
    display: 'flex',
  },
  title: {
    fontFamily: 'gilroy-semibold',
    fontSize: 18,
    lineHeight: 22,
    color: colors.white.base,
  },
  subTitle: {
    ...globalTextStyles.inactive,
  },
  wrapper: {
    marginBottom: 8,
    display: 'flex',
  },
  textContent: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    lineHeight: 20,
  },
});
