import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { DashboardScreen } from 'src/features/dashboard/DashboardScreen';
import { StartWashScreen } from 'src/features/startwash/StartWashScreen';
import { AccountScreen } from 'src/features/account/AccountScreen';

export type TabsParamList = {
  dashboard: undefined;
  'start-wash': undefined;
  account: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'dashboard':
              return <MaterialIcons name="dashboard" size={24} color={color} />;
            case 'start-wash':
              return <MaterialIcons name="local-car-wash" size={24} color={color} />;
            case 'account':
              return <MaterialIcons name="person" size={24} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="dashboard" component={DashboardScreen} />
      <Tab.Screen name="start-wash" component={StartWashScreen} />
      <Tab.Screen name="account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
