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
   * Whether the button is the primary styled (green)
   */
  primary?: boolean;

  /**
   * Whether the button is the primary styled but not selected
   */
  primaryUnselected?: boolean;

  /**
   * Whether the button is the secondary styled (orange)
   */
  secondary?: boolean;

  /**
   * Whether the button is the tertiary styled (outlined)
   */
  tertiary?: boolean;

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
  secondary,
  tertiary,
}) => {
  return children ? (
    <TouchableOpacity
      style={[
        style,
        primary && styles.primary,
        secondary && styles.secondary,
        disabled && styles.disabled,
        tertiary && styles.tertiary,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.horizontal,
        primary && styles.primary,
        secondary && styles.secondary,
        primaryUnselected && styles.primaryUnselected,
        disabled && styles.disabled,
        tertiary && styles.tertiary,
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
            secondary && textStyles.secondary,
            primaryUnselected && textStyles.primaryUnselected,
            tertiary && textStyles.tertiary,
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
  secondary: {
    height: 48,
    backgroundColor: colors.secondary.base,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryAlt: {
    height: 46,
    backgroundColor: colors.primary.base,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.grey[10],
  },
  primaryUnselected: {
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  tertiary: {
    height: 48,
    backgroundColor: 'transparent',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.grey[10],
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
  secondary: {
    fontSize: 16,
    lineHeight: 18,
    color: colors.white.base,
  },
  primaryUnselected: {
    fontSize: 16,
    lineHeight: 18,
    color: colors.black.base,
  },
  tertiary: {
    fontSize: 16,
    lineHeight: 18,
    color: colors.grey[90],
  },
});
