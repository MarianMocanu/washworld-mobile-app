import { colors } from '@globals/globalStyles';
import { Subscription } from '@models/Subscription';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddPaymentScreen } from 'src/features/payment/AddPaymentScreen';
import { SuccessPaymentScreen } from 'src/features/payment/SuccessPaymentScreen';

export enum SuccessRoute {
  Service = 'service',
  Account = 'account',
  Dashboard = 'dashboard',
}

export type PaymentStackParamList = {
  'payment-add': {
    previousSubscription?: Subscription;
    levelId?: number;
    carId?: number;
    successRoute: SuccessRoute;
  };
  'payment-success': {
    successRoute: SuccessRoute;
  };
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
      <Stack.Screen name="payment-success" component={SuccessPaymentScreen} />
    </Stack.Navigator>
  );
}
