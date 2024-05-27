import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, Platform } from 'react-native';
import { colors } from '@globals/globalStyles';
import { DashboardNavigator } from 'src/features/dashboard/DashboardNavigator';
import { StartWashNavigator } from 'src/features/startwash/StartWashNavigator';
import { AccountNavigator, AccountStackParamList } from '../features/account/AccountNavigator';

type AccountStack = {
  screen: keyof AccountStackParamList;
  params?: AccountStackParamList[keyof AccountStackParamList];
};

export type TabsParamList = {
  dashboard: undefined;
  'start-wash': undefined;
  account: AccountStack;
};

const Tab = createBottomTabNavigator<TabsParamList>();

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
        headerShown: false,
        tabBarStyle: Platform.OS === 'android' && { paddingBottom: 4 },
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'dashboard':
              return (
                <MaterialIcons
                  name="dashboard"
                  size={24}
                  color={focused ? colors.primary.base : colors.grey[60]}
                  style={{ lineHeight: 24 }}
                />
              );
            case 'start-wash':
              return (
                <MaterialIcons
                  name="local-car-wash"
                  size={24}
                  color={focused ? colors.primary.base : colors.grey[60]}
                  style={{ lineHeight: 24 }}
                />
              );
            case 'account':
              return (
                <MaterialIcons
                  name="person"
                  size={24}
                  color={focused ? colors.primary.base : colors.grey[60]}
                  style={{ lineHeight: 24 }}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen
        name="dashboard"
        component={DashboardNavigator}
        options={{
          tabBarLabel: ({ focused, color }) => <Text style={getTabBarLabelStyle(focused, color)}>Home</Text>,
        }}
      />
      <Tab.Screen
        name="start-wash"
        component={StartWashNavigator}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={getTabBarLabelStyle(focused, color)}>Start Wash</Text>
          ),
        }}
      />
      <Tab.Screen
        name="account"
        component={AccountNavigator}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={getTabBarLabelStyle(focused, color)}>Account</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
