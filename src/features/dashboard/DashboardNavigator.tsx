import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { Event } from '@models/Event';
import { HistoryScreen } from './screens/HistoryScreen';
import { WashDetailsScreen } from './screens/WashDetailsScreen';
import { LogoSVG } from 'src/assets/SVGIcons';

export type DashboardStackParamList = {
  home: undefined;
  history: undefined;
  washDetails: { event: Event };
};

const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();

export const DashboardNavigator: FC = () => {
  return (
    <DashboardStack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name="home" component={HomeScreen} />
      <DashboardStack.Screen name="history" component={HistoryScreen} />
      <DashboardStack.Screen name="washDetails" component={WashDetailsScreen} />
    </DashboardStack.Navigator>
  );
};
