import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ModalNavigator from './ModalNavigator';
import CarNavigator from './CarNavigator';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useCars } from 'src/queries/Car';
import SubscriptionNavigator from './SubscriptionNavigator';

export type MainStackParamsList = {
  tabs: undefined;
  modals: { screen: string };
  'stacks-car': { screen: string };
  'stacks-subscription': { screen: string };
};

const Stack = createNativeStackNavigator<MainStackParamsList>();

export default function MainNavigator() {
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const auth = useSelector((state: RootState) => state.auth);
  const { data, isLoading, refetch } = useCars(auth.user && auth.user.id ? auth.user.id : 0, false);

  const navigateToCarAdd = () => {
    if (!auth.user) return;
    navigation.navigate('stacks-car', { screen: 'car-add' });
  };

  useEffect(() => {
    if (auth.user && auth.user.id) {
      refetch();
    }
  }, [auth.user]);

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
      <Stack.Screen name="modals" component={ModalNavigator} />
      <Stack.Screen name="stacks-car" component={CarNavigator} />
      <Stack.Screen name="stacks-subscription" component={SubscriptionNavigator} />
    </Stack.Navigator>
  );
}
