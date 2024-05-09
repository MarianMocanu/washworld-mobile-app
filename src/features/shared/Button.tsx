import { colors } from '@globals/globalStyles';
import { FC } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  /**
   * Text to display inside the button
   */
  text: string;

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
};

export const Button: FC<Props> = ({ text, style, link, textStyle, onPress }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={[textStyles.default, link && textStyles.link, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({});

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
