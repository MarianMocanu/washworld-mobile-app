import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FC, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import Input from 'src/components/ui/Input';
import { AuthStackParamList } from 'src/navigation/AuthNavigator';
import { signIn } from './authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/app/store';
import { colors, globalTextStyles } from '@globals/globalStyles';
import Toast from 'react-native-toast-message';
interface InputField {
  value: string;
  valid: boolean;
  blurred: boolean;
}

type Props = {};

export const LoginScreen: FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList, 'login'>>();
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
    login: (email: string, password: string) => {
      setIsLoading(true);
      dispatch(signIn({ email, password }))
        .then(res => {
          if (res?.statusCode === 404) {
            Toast.show({
              type: 'error',
              text1: 'User not found.',
            });
          }
          if (res?.statusCode === 401) {
            Toast.show({
              type: 'error',
              text1: 'Invalid password or email.',
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  };

  function navigateToSignup(): void {
    navigation.navigate('signup');
  }

  return (
    <View style={styles.container}>
      <Text style={textStyles.heading}>Sign in</Text>

      {/* validation moved to input prop because of errors (setter and render offset) */}
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
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary.base} />
      ) : (
        // TODO: Replace with actual custom button component
        <Button
          title="Sign in"
          onPress={() => handler.login(email.value.toLowerCase(), password.value)}
          disabled={!password.valid || !email.valid}
        />
      )}
      <Text onPress={navigateToSignup} style={[textStyles.default, styles.signUpMessage]}>
        Dont have an account? <Text style={textStyles.link}>Sign up.</Text>
      </Text>
      <Toast />
    </View>
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
