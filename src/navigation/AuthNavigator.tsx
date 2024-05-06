import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from 'src/features/auth/LoginScreen';
import { SignupScreen } from 'src/features/auth/SignupScreen';

export type AuthStackParamList = {
  login: {
    email: string;
    password: string;
  };
  signup: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
