import { colors } from '@globals/globalStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectServiceScreen } from './screens/SelectServiceScreen';
import { ScanPlateScreen } from './screens/ScanPlateScreen';
import { InstructionsScreen } from './screens/InstructionsScreen';
import { WashProgressScreen } from './screens/WashProgressScreen';
import { WashFinishedScreen } from './screens/WashFinishedScreen';

export type EventStackParamList = {
  'select-service': undefined;
  'scan-plate': undefined;
  instructions: undefined;
  'wash-progress': undefined;
  'wash-finished': { stopped: boolean };
};

const Stack = createNativeStackNavigator<EventStackParamList>();

export default function EventNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white.base },
        animation: 'none',
      }}
    >
      <Stack.Screen name="select-service" component={SelectServiceScreen} />
      <Stack.Screen name="scan-plate" component={ScanPlateScreen} />
      <Stack.Screen name="instructions" component={InstructionsScreen} />
      <Stack.Screen name="wash-progress" component={WashProgressScreen} />
      <Stack.Screen name="wash-finished" component={WashFinishedScreen} />
    </Stack.Navigator>
  );
}
