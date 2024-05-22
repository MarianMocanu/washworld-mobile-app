import { colors } from '@globals/globalStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddPaymentScreen } from 'src/features/stacks/payment/AddPaymentScreen';
// import { AddSubscriptionScreen } from 'src/features/stacks/subscription/AddSubscriptionScreen';

export type PaymentStackParamList = {
  'payment-add': { levelId?: number };
};

const Stack = createNativeStackNavigator<PaymentStackParamList>();

export default function PaymentNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white.base },
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen name="payment-add" component={AddPaymentScreen} />
    </Stack.Navigator>
  );
}
