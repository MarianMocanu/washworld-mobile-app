import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { LogoSVG } from 'src/assets/SVGIcons';

export type DashboardStackParamList = {
  home: undefined;
  history: undefined;
};

const DashboardStack = createNativeStackNavigator<DashboardStackParamList>();

export const DashboardNavigator: FC = () => {
  return (
    <DashboardStack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name="home" component={HomeScreen} />
      <DashboardStack.Screen name="history" component={HistoryScreen} />
    </DashboardStack.Navigator>
  );
};
