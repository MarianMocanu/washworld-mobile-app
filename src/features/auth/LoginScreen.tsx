import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FC, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import Input from 'src/components/ui/Input';
import { AuthStackParamList } from 'src/navigation/AuthNavigator';
import { signIn } from './authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/app/store';
import { err } from 'react-native-svg';
import { colors } from '@globals/globalStyles';

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
      setPassword({ value: text, valid: password.value.length >= 6, blurred: false });
    },
    passwordBlur: () => {
      setPassword(prevState => {
        return { ...prevState, blurred: true };
      });
    },
    login: (email: string, password: string) => {
      setIsLoading(true);
      dispatch(signIn({ email, password })).finally(() => {
        setIsLoading(false);
      });
    },
  };

  return (
    <View style={styles.container}>
      <Text>login</Text>

      <Input
        placeholder="Email"
        isValid={email.valid}
        errorMessage="Invalid email"
        onChangeText={handler.emailChange}
        onBlur={handler.emailBlur}
      />
      <Input
        placeholder="Password"
        isValid={password.valid}
        errorMessage="Password must be at least 6 characters long"
        onChangeText={handler.passwordChange}
        onBlur={handler.passwordBlur}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary.base} />
      ) : (
        <Button
          title="Login"
          onPress={() => handler.login(email.value.toLowerCase(), password.value)}
          disabled={!password.valid || !email.valid}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
