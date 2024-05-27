import { NavigationProp, useNavigation } from '@react-navigation/native';
import Input from '@shared/Input';
import { FC, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { AuthStackParamList } from 'src/features/auth/AuthNavigator';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/app/store';
import { colors, globalTextStyles } from '@globals/globalStyles';
import Toast from 'react-native-toast-message';
import { Button } from '@shared/Button';
import { InputField } from '@models/InputField';
import { signUp } from '../authSlice';

type Props = {};

export const SignupScreen: FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList, 'signup'>>();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<InputField>({
    value: '',
    valid: false,
    blurred: false,
  });
  const [password, setPassword] = useState<InputField>({
    value: '',
    valid: false,
    blurred: false,
  });
  const [confirmPassword, setConfirmPassword] = useState<InputField>({
    value: '',
    valid: false,
    blurred: false,
  });
  const [firstName, setFirstName] = useState<InputField>({
    value: '',
    valid: false,
    blurred: false,
  });
  const [lastName, setLastName] = useState<InputField>({
    value: '',
    valid: false,
    blurred: false,
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handler = {
    emailChange: (text: string) => {
      setEmail({ value: text, valid: emailRegex.test(email.value), blurred: false });
    },
    emailBlur: () => {
      setEmail(prevState => {
        return { ...prevState, blurred: true };
      });
    },
    passwordChange: (text: string) => {
      setPassword({ value: text, valid: password.value.length > 0, blurred: false });
    },
    passwordBlur: () => {
      setPassword(prevState => {
        return { ...prevState, blurred: true };
      });
    },
    firstNameChange: (text: string) => {
      setFirstName({ value: text, valid: firstName.value.length > 2, blurred: false });
    },
    firstNameBlur: () => {
      setFirstName(prevState => {
        return { ...prevState, blurred: true };
      });
    },
    lastNameChange: (text: string) => {
      setLastName({ value: text, valid: lastName.value.length > 2, blurred: false });
    },
    lastNameBlur: () => {
      setLastName(prevState => {
        return { ...prevState, blurred: true };
      });
    },
    confirmPasswordChange: (text: string) => {
      setConfirmPassword({ value: text, valid: password.value === confirmPassword.value, blurred: false });
    },
    confirmPasswordBlur: () => {
      setConfirmPassword(prevState => {
        return { ...prevState, blurred: true };
      });
    },
    sigunUp: (email: string, password: string, firstName: string, lastName: string) => {
      setIsLoading(true);
      dispatch(signUp({ firstName, lastName, email, password }))
        .then(res => {
          console.log('response', res);
          if (res) {
            Toast.show({
              type: 'success',
              text1: 'User created successfully. Navigating to login.',
            });

            setTimeout(() => {
              navigateToSignin();
            }, 2000);
          } else {
            Toast.show({
              type: 'error',
              text1: 'User creation failed.',
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  };

  async function navigateToSignin(): Promise<void> {
    const user = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    };
    navigation.navigate('login', {
      email: user.email,
      password: user.password,
    });
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
    >
      <Text style={textStyles.heading}>Sign up</Text>

      {/* validation moved to input prop because of errors (setter and render offset) */}
      <Input
        keyboardType="default"
        placeholder="First name"
        isValid={(firstName.value.length > 2 && firstName.blurred) || !firstName.blurred}
        errorMessage="First name has to be longer than 2 characters"
        onChangeText={handler.firstNameChange}
        onBlur={handler.firstNameBlur}
      />
      <Input
        keyboardType="default"
        placeholder="Last name"
        isValid={(lastName.value.length > 2 && lastName.blurred) || !lastName.blurred}
        errorMessage="Invalid email"
        onChangeText={handler.lastNameChange}
        onBlur={handler.lastNameBlur}
      />
      <Input
        keyboardType="email-address"
        placeholder="Email"
        isValid={(emailRegex.test(email.value) && email.blurred) || !email.blurred || email.value.length == 0}
        errorMessage="Invalid email"
        onChangeText={handler.emailChange}
        onBlur={handler.emailBlur}
      />
      <Input
        secureTextEntry={true}
        placeholder="Password"
        isValid={(password.value.length > 0 && password.blurred) || !password.blurred}
        errorMessage="Password must be provided"
        onChangeText={handler.passwordChange}
        onBlur={handler.passwordBlur}
      />
      <Input
        secureTextEntry={true}
        placeholder="Confirm password"
        isValid={
          (confirmPassword.value == password.value && confirmPassword.blurred) || !confirmPassword.blurred
        }
        errorMessage="Value must match the password"
        onChangeText={handler.confirmPasswordChange}
        onBlur={handler.confirmPasswordBlur}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary.base} />
      ) : (
        <Button
          text="Sign in"
          primary
          onPress={() =>
            handler.sigunUp(
              email.value.toLowerCase(),
              password.value,
              firstName.value.toLowerCase(),
              lastName.value.toLowerCase(),
            )
          }
          disabled={
            !password.valid || !email.valid || !firstName.valid || !lastName.valid || confirmPassword.valid
          }
          style={{ width: '100%' }}
        />
      )}
      <Text onPress={navigateToSignin} style={[textStyles.default, styles.signUpMessage]}>
        Already have an account? <Text style={textStyles.link}>Sign in.</Text>
      </Text>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  signUpMessage: {
    marginTop: 24,
  },
});

const textStyles = StyleSheet.create({
  heading: {
    ...globalTextStyles.headingLarge,
    color: colors.black.base,
    paddingTop: 0,
    paddingBottom: 24,
  },
  link: {
    color: colors.primary.base,
  },
  default: {
    fontSize: 18,
    color: colors.grey[60],
  },
});
