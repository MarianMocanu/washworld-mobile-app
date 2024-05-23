import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { Event } from '@models/Event';
import { HistoryScreen } from './screens/HistoryScreen';
import { WashDetailsScreen } from './screens/WashDetailsScreen';

export type DashboardStackParamList = {
  home: undefined;
  history: undefined;
  'wash-details': { event: Event };
};

const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();

export const DashboardNavigator: FC = () => {
  return (
    <DashboardStack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false, animation: 'none' }}
    >
      <DashboardStack.Screen name="home" component={HomeScreen} />
      <DashboardStack.Screen name="history" component={HistoryScreen} />
      <DashboardStack.Screen name="wash-details" component={WashDetailsScreen} />
    </DashboardStack.Navigator>
  );
};
