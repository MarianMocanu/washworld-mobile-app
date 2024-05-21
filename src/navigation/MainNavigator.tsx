import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import EventNavigator, { EventStackParamList } from './EventNavigator';
import CarNavigator from './CarNavigator';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useCars } from 'src/queries/Car';
import SubscriptionNavigator from './SubscriptionNavigator';

type EventStack = {
  screen: keyof EventStackParamList;
  params: EventStackParamList[keyof EventStackParamList];
};

export type MainStackParamsList = {
  tabs: undefined;
  'stacks-event': EventStack;
  'stacks-car': { screen: string };
  'stacks-subscription': { screen: string };
};

const Stack = createNativeStackNavigator<MainStackParamsList>();

export default function MainNavigator() {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, isLoading } = useCars(user?.id, { enabled: !!user });

  const navigateToCarAdd = () => {
    if (!user) return;
    navigation.navigate('stacks-car', { screen: 'car-add' });
  };

  useEffect(() => {
    if (!isLoading && data) {
      if (data.length === 0) {
        console.log('no cars found');
        navigateToCarAdd();
      }
    }
  }, [isLoading, data]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tabs" component={TabNavigator} />
      <Stack.Screen name="stacks-event" component={EventNavigator} />
      <Stack.Screen name="stacks-car" component={CarNavigator} />
      <Stack.Screen name="stacks-subscription" component={SubscriptionNavigator} />
    </Stack.Navigator>
  );
}
