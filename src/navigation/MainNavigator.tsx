import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ModalNavigator from './ModalNavigator';

export type MainStackParamsList = {
  tabs: undefined;
  modals: { screen: string };
};

const Stack = createNativeStackNavigator<MainStackParamsList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tabs" component={TabNavigator} />
      <Stack.Screen name="modals" component={ModalNavigator} />
    </Stack.Navigator>
  );
}
