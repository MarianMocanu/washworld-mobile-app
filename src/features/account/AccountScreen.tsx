import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccountSettingsScreen from './screens/AccountSettingsScreen';
import ChangeSubscriptionScreen from './screens/ChangeSubscriptionScreen';
import LoyaltyRewardsScreen from './screens/LoyaltyRewardsScreen';
import AddAnotherCarScreen from './screens/AddAnotherCarScreen';
import PreferredLocationScreen from './screens/PreferredLocationScreen';
import PreferredServicesScreen from './screens/PreferredServicesScreen';
import FAQScreen from './screens/FAQScreen';
import CustomerSupportScreen from './screens/CustomerSupportScreen';
import SubmitFeedbackScreen from './screens/SubmitFeedbackScreen';
import LogOutScreen from './screens/LogOutScreen';
import EditAccountDetailsScreen from './screens/EditAccountDetailsScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';

export type AccStackParamList = {
  AccountSettings: undefined;
  ChangeSubscription: undefined;
  LoyaltyRewards: undefined;
  AddAnotherCar: undefined;
  PreferredLocation: undefined;
  PreferredServices: undefined;
  // Notifications: undefined;
  FAQ: undefined;
  CustomerSupport: undefined;
  SubmitFeedback: undefined;
  EditAccountDetails: undefined;
  ChangePassword: undefined;
  LogOut: undefined;
};

const Stack = createNativeStackNavigator<AccStackParamList>();

export const AccountScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{ title: 'Account Settings' }}
      />
      <Stack.Screen name="ChangeSubscription" component={ChangeSubscriptionScreen} />
      <Stack.Screen name="LoyaltyRewards" component={LoyaltyRewardsScreen} />
      <Stack.Screen name="AddAnotherCar" component={AddAnotherCarScreen} />
      <Stack.Screen name="PreferredLocation" component={PreferredLocationScreen} />
      <Stack.Screen name="PreferredServices" component={PreferredServicesScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="CustomerSupport" component={CustomerSupportScreen} />
      <Stack.Screen name="SubmitFeedback" component={SubmitFeedbackScreen} />
      <Stack.Screen name="EditAccountDetails" component={EditAccountDetailsScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="LogOut" component={LogOutScreen} />
      {/*  <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />*/}
    </Stack.Navigator>
  );
};

