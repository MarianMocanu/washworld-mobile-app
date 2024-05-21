import { colors } from '@globals/globalStyles';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TextInputProps,
  View,
  TextStyle,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Button } from '@shared/Button';

type Props = React.PropsWithChildren<TextInputProps> & {
  /** Error text to be displayed
   *  @default undefined
   *
   * example: 'Email is required'
   */
  errorMessage?: string;
  /** If value is false error message will be shown
   *  @default undefined
   *
   * example: email && email.length < 1 ? true : false
   */
  isValid?: boolean;
  placeholderTextColor?: string;
  /**
   * Icon to display on the right side of the input
   * @default undefined
   *
   * example: <MaterialIcons name="search" size={24} />
   */
  rightIcon?: React.ReactNode;
  /**
   * Style of the input container, including the right icon
   * @default undefined
   */
  inputContainerStyle?: ViewStyle;
  /**
   * Function to call when the right icon is pressed
   * @default undefined
   */
  onRightIconPress?: () => void;
  style?: StyleProp<TextStyle>;
};

const Input = React.forwardRef<TextInput, Props>(
  ({ placeholderTextColor, errorMessage, isValid, onRightIconPress, ...props }: Props, ref) => {
    return (
      <View style={[styles.wrapper]}>
        <View style={[styles.horizontal, props.inputContainerStyle, !isValid && styles.invalid]}>
          <TextInput
            ref={ref}
            style={[styles.input, props.style]}
            placeholderTextColor={placeholderTextColor ?? colors.grey[30]}
            {...props}
          />
          {props.rightIcon && (
            <Button style={styles.rightButton} onPress={onRightIconPress}>
              {props.rightIcon}
            </Button>
          )}
        </View>
        <Text style={[styles.error, isValid && styles.hidden]}>{errorMessage}</Text>
      </View>
    );
  },
);

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    maxHeight: 72,
  },
  horizontal: {
    flexDirection: 'row',
    backgroundColor: colors.white.cream,
    borderRadius: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.white.cream,
  },
  input: {
    fontSize: 16,
    fontFamily: 'gilroy-medium',
    fontWeight: '500',
    color: colors.grey[80],
    textAlignVertical: 'center',
    height: 48,
    flex: 1,
  },
  error: {
    color: colors.tertiary.red,
    fontSize: 12,
    marginTop: 0,
    marginBottom: 8,
    fontWeight: '600',
  },
  hidden: {
    // done like so to avoid input field jumping while error message is shown
    width: 0,
  },
  rightButton: {
    height: 48,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  invalid: {
    borderColor: colors.tertiary.red,
    borderWidth: 1,
  },
});
