import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import { StartWashScreen } from './screens/StartWashScreen';

export type StartWashStackParamList = {
  start: undefined;
};

const StartWashStack = createNativeStackNavigator<StartWashStackParamList>();

export const StartWashNavigator: FC = () => {
  return (
    <StartWashStack.Navigator initialRouteName="start" screenOptions={{ headerShown: false }}>
      <StartWashStack.Screen name="start" component={StartWashScreen} />
    </StartWashStack.Navigator>
  );
};
