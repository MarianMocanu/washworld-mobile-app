import { colors } from '@globals/globalStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HandleSubscriptionScreen } from './screens/HandleSubscriptionScreen';

export type SubscriptionStackParamList = {
  'subscription-handle': { carId: number };
};

const Stack = createNativeStackNavigator<SubscriptionStackParamList>();

export default function SubscriptionNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white.base },
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen name="subscription-handle" component={HandleSubscriptionScreen} />
    </Stack.Navigator>
  );
}
