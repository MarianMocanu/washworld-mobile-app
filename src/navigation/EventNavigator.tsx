import { colors } from '@globals/globalStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InstructionsScreen } from 'src/features/stacks/event/screens/InstructionsScreen';
import { ScanPlateScreen } from 'src/features/stacks/event/screens/ScanPlateScreen';
import { SelectServiceScreen } from 'src/features/stacks/event/screens/SelectServiceScreen';
import { WashProgressScreen } from 'src/features/stacks/event/screens/WashProgressScreen';

export type EventStackParamList = {
  'select-service': { locationId: number };
  'scan-plate': undefined;
  instructions: undefined;
  'wash-progress': undefined;
};

const Stack = createNativeStackNavigator<EventStackParamList>();

export default function EventNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white.base },
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen name="select-service" component={SelectServiceScreen} />
      <Stack.Screen name="scan-plate" component={ScanPlateScreen} />
      <Stack.Screen name="instructions" component={InstructionsScreen} />
      <Stack.Screen name="wash-progress" component={WashProgressScreen} />
    </Stack.Navigator>
  );
}
