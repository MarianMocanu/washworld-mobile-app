import { colors } from '@globals/globalStyles';
import React from 'react';
import { StyleSheet, TextInput, Text, TextInputProps, View } from 'react-native';

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
};

const Input = React.forwardRef<TextInput, Props>(
  ({ style, placeholderTextColor, errorMessage, isValid, ...props }: Props, ref) => {
    return (
      <View style={[styles.wrapper]}>
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          placeholderTextColor={placeholderTextColor ?? colors.grey[30]}
          {...props}
        />
        {<Text style={[isValid ? styles.hidden : styles.error]}>{errorMessage}</Text>}
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
  },
  input: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.grey[80],
    backgroundColor: colors.white.cream,
    borderColor: 'none',
    borderWidth: 0,
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlignVertical: 'center',
    height: 48,
    width: '100%',
  },
  error: {
    color: colors.tertiary.red,
    fontSize: 12,
    marginTop: 0,
    fontWeight: '600',
    marginBottom: 4,
  },
  hidden: {
    // done like so to avoid input field jumping while error message is shown
    width: 0,
    fontSize: 12,
    marginTop: 0,
    fontWeight: '600',
    marginBottom: 4,
  },
});
