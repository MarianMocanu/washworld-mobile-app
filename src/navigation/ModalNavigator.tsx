import { colors } from '@globals/globalStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddCarScreen } from 'src/features/stacks/car/add/AddCarScreen';
import { InstructionsScreen } from 'src/features/modals/screens/InstructionsScreen';
import { ScanPlateScreen } from 'src/features/modals/screens/ScanPlateScreen';
import { SelectServiceScreen } from 'src/features/modals/screens/SelectServiceScreen';
import { WashProgressScreen } from 'src/features/modals/screens/WashProgressScreen';

export type ModalStackParamList = {
  'select-service': { locationId: number };
  'scan-plate': undefined;
  instructions: undefined;
  'wash-progress': undefined;
  'add-car': undefined;
};

const Stack = createNativeStackNavigator<ModalStackParamList>();

export default function ModalNavigator() {
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
