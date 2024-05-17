import { colors } from '@globals/globalStyles';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface Props extends PropsWithChildren {
  /**
   * Text to display inside the button
   */
  text?: string;

  /**
   * Style of the text inside the button
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Style of the button
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Whether the button should act as a link
   * Applies link styles
   */
  link?: boolean;
  /**
   * Function to call when the button is pressed
   */
  onPress?: () => void;
  /**
   * Icon to display on the left side of the button
   */
  leftIcon?: ReactNode;
  /**
   * Icon to display on the right side of the button
   */
  rightIcon?: ReactNode;

  /**
   * Whether the button is the primary styled
   */
  primary?: boolean;

  /**
   * Whether the button is the primary styled but not selected
   */
  primaryUnselected?: boolean;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
}

export const Button: FC<Props> = ({
  text,
  style,
  link,
  textStyle,
  onPress,
  rightIcon,
  leftIcon,
  children,
  primary,
  primaryUnselected,
  disabled,
}) => {
  return children ? (
    <TouchableOpacity style={[style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.horizontal,
        primary && styles.primary,
        primaryUnselected && styles.primaryUnselected,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {leftIcon}
      {text && (
        <Text
          style={[
            textStyles.default,
            link && textStyles.link,
            primary && textStyles.primary,
            primaryUnselected && textStyles.primaryUnselected,
            textStyle,
          ]}
        >
          {text}
        </Text>
      )}
      {rightIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primary: {
    height: 48,
    backgroundColor: colors.primary.base,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryUnselected: {
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});

const textStyles = StyleSheet.create({
  default: {
    fontFamily: 'gilroy-medium',
  },
  link: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.primary.base,
    textDecorationLine: 'underline',
  },
  primary: {
    fontSize: 16,
    lineHeight: 18,
    color: colors.white.base,
  },
  primaryUnselected: {
    fontSize: 16,
    lineHeight: 18,
    color: colors.black.base,
  },
});
