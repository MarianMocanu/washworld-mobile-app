import { colors } from '@globals/globalStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddSubscriptionScreen } from 'src/features/stacks/subscription/add/AddSubscriptionScreen';

export type SubscriptionStackParamList = {
  'subscription-add': undefined;
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
      <Stack.Screen name="subscription-add" component={AddSubscriptionScreen} />
    </Stack.Navigator>
  );
}
