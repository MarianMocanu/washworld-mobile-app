import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator, { TabsParamList } from './TabNavigator';
import EventNavigator, { EventStackParamList } from '../features/event/EventNavigator';
import CarNavigator from '../features/car/CarNavigator';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useCars } from 'src/queries/Car';
import SubscriptionNavigator, {
  SubscriptionStackParamList,
} from '../features/subscriptions/SubscriptionNavigator';
import PaymentNavigator, { PaymentStackParamList } from '../features/payment/PaymentNavigator';
import { setActiveCarId } from 'src/features/car/activeCarSlice';

type EventStack = {
  screen: keyof EventStackParamList;
  params?: EventStackParamList[keyof EventStackParamList];
};

type SubscriptionStack = {
  screen: keyof SubscriptionStackParamList;
  params?: SubscriptionStackParamList[keyof SubscriptionStackParamList];
};

type PaymentStack = {
  screen: keyof PaymentStackParamList;
  params: PaymentStackParamList[keyof PaymentStackParamList];
};

type Tabs = {
  screen: keyof TabsParamList;
  params?: TabsParamList[keyof TabsParamList];
};

export type MainStackParamsList = {
  tabs: Tabs;
  'stacks-event': EventStack;
  'stacks-car': { screen: string };
  'stacks-subscription': SubscriptionStack;
  'stacks-payment': PaymentStack;
};

const Stack = createNativeStackNavigator<MainStackParamsList>();

export default function MainNavigator() {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: cars, isLoading } = useCars(user?.id, { enabled: !!user });

  const navigateToCarAdd = () => {
    if (!user) return;
    navigation.navigate('stacks-car', { screen: 'car-add' });
  };

  useEffect(() => {
    if (!isLoading && cars) {
      if (cars.length === 0) {
        console.log('no cars found');
        navigateToCarAdd();
      } else {
        setActiveCarId(cars[0].id);
      }
    }
  }, [isLoading, cars]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="tabs" component={TabNavigator} />
      <Stack.Screen name="stacks-event" component={EventNavigator} options={{ gestureEnabled: false }} />
      <Stack.Screen name="stacks-car" component={CarNavigator} />
      <Stack.Screen name="stacks-subscription" component={SubscriptionNavigator} />
      <Stack.Screen name="stacks-payment" component={PaymentNavigator} />
    </Stack.Navigator>
  );
}
