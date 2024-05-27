import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Input from '@shared/Input';
import { FC, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { AuthStackParamList } from 'src/features/auth/AuthNavigator';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/app/store';
import { colors, globalTextStyles } from '@globals/globalStyles';
import Toast from 'react-native-toast-message';
import { Button } from '@shared/Button';
import { InputField } from '@models/InputField';
import { signIn } from '../authSlice';

type Props = {};

export const LoginScreen: FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList, 'login'>>();
  const route = useRoute<RouteProp<AuthStackParamList, 'login'>>();
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
      setEmail({ value: text, valid: emailRegex.test(text), blurred: false });
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

  useEffect(() => {
    if (route.params && route.params.email && route.params.password) {
      handler.login(route.params.email, route.params.password);
    }
  }, [route.params]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
    >
      <Text style={textStyles.heading}>Sign in</Text>

      {/* validation moved to input prop because of errors (setter and render offset) */}
      <Input
        keyboardType="email-address"
        placeholder="Email"
        isValid={(emailRegex.test(email.value) && email.blurred) || !email.blurred || email.value.length == 0}
        errorMessage="Invalid email"
        onChangeText={handler.emailChange}
        onBlur={handler.emailBlur}
        autoCapitalize="none"
      />
      <Input
        secureTextEntry={true}
        placeholder="Password"
        isValid={(password.value.length > 0 && password.blurred) || !password.blurred}
        errorMessage="Password must be provided"
        onChangeText={handler.passwordChange}
        onBlur={handler.passwordBlur}
        autoCapitalize="none"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary.base} />
      ) : (
        <Button
          text="Sign in"
          primary
          onPress={() => handler.login(email.value.toLowerCase(), password.value)}
          disabled={!password.valid || !email.valid}
          style={{ width: '100%' }}
        />
      )}
      <Text onPress={navigateToSignup} style={[textStyles.default, styles.signUpMessage]}>
        Dont have an account? <Text style={textStyles.link}>Sign up.</Text>
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
