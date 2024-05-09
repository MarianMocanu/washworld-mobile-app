import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { DashboardScreen } from 'src/features/dashboard/DashboardScreen';
import { StartWashScreen } from 'src/features/startwash/StartWashScreen';
import { AccountScreen } from 'src/features/account/AccountScreen';
import { LogoSVG } from 'src/assets/SVGIcons';
import { Text, View } from 'react-native';
import { colors } from '@globals/globalStyles';

export type TabsParamList = {
  dashboard: undefined;
  'start-wash': undefined;
  account: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export default function TabNavigator() {
  function getTabBarLabelStyle(focused: boolean, color: string) {
    return {
      color: focused ? colors.primary.base : colors.grey[60],
      fontFamily: 'gilroy-semibold',
      fontSize: 12,
      lineHeight: 12,
    };
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'dashboard':
              return (
                <MaterialIcons
                  name="dashboard"
                  size={24}
                  color={focused ? colors.primary.base : colors.grey[60]}
                />
              );
            case 'start-wash':
              return (
                <MaterialIcons
                  name="local-car-wash"
                  size={24}
                  color={focused ? colors.primary.base : colors.grey[60]}
                />
              );
            case 'account':
              return (
                <MaterialIcons
                  name="person"
                  size={24}
                  color={focused ? colors.primary.base : colors.grey[60]}
                />
              );
          }
        },

        header: () => (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <LogoSVG />
          </View>
        ),
      })}
    >
      <Tab.Screen
        name="dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={getTabBarLabelStyle(focused, color)}>Dashboard</Text>
          ),
        }}
      />
      <Tab.Screen
        name="start-wash"
        component={StartWashScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={getTabBarLabelStyle(focused, color)}>Start Wash</Text>
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={AccountScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={getTabBarLabelStyle(focused, color)}>Account</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
