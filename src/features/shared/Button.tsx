import { colors } from '@globals/globalStyles';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface Props extends PropsWithChildren {
  /**
   * Text to display inside the button
   */
  text?: string;

  /**
   * Style of the text inside the button
   */
  textStyle?: TextStyle;
  /**
   * Style of the button
   */
  style?: ViewStyle;
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
}) => {
  return children ? (
    <TouchableOpacity style={[style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={[buttonStyles.horizontal, style]} onPress={onPress}>
      {leftIcon}
      {text && <Text style={[textStyles.default, link && textStyles.link, textStyle]}>{text}</Text>}
      {rightIcon}
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const textStyles = StyleSheet.create({
  default: {
    fontFamily: 'gilroy-medium',
  },
  link: {
    fontFamily: 'gilroy-medium',
    fontSize: 14,
    lineHeight: 18,
    color: colors.primary.base,
    textDecorationLine: 'underline',
  },
});
