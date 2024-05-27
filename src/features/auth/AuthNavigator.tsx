import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { LogoSVG } from 'src/assets/SVGIcons';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';

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
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={({ route }) => ({
        header: () => (
          <View style={{ alignItems: 'center', backgroundColor: '#FFF', paddingVertical: 8 }}>
            <LogoSVG />
          </View>
        ),
      })}
    >
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: true }} />
      <Stack.Screen name="signup" component={SignupScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}
