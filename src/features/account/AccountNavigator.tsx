import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountSettingsScreen from './screens/AccountSettingsScreen';
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

export type AccountStackParamList = {
  index: undefined;
  subscription: undefined;
  rewards: undefined;
  'add-car': undefined;
  location: undefined;
  services: undefined;
  // Notifications: undefined;
  faq: undefined;
  support: undefined;
  feedback: undefined;
  details: undefined;
  'change-password': undefined;
  'log-out': undefined;
};

const Stack = createNativeStackNavigator<AccountStackParamList>();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" component={AccountSettingsScreen} options={{ title: 'Account Settings' }} />
      <Stack.Screen name="rewards" component={LoyaltyRewardsScreen} />
      <Stack.Screen name="add-car" component={AddAnotherCarScreen} />
      <Stack.Screen name="location" component={PreferredLocationScreen} />
      <Stack.Screen name="services" component={PreferredServicesScreen} />
      <Stack.Screen name="faq" component={FAQScreen} />
      <Stack.Screen name="support" component={CustomerSupportScreen} />
      <Stack.Screen name="feedback" component={SubmitFeedbackScreen} />
      <Stack.Screen name="details" component={EditAccountDetailsScreen} />
      <Stack.Screen name="change-password" component={ChangePasswordScreen} />
      <Stack.Screen name="log-out" component={LogOutScreen} />
      {/*  <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />*/}
    </Stack.Navigator>
  );
};
