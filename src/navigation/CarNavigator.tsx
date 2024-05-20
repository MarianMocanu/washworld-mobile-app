import { colors } from '@globals/globalStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddCarScreen } from 'src/features/stacks/car/add/AddCarScreen';
import { InstructionsScreen } from 'src/features/modals/screens/InstructionsScreen';
import { ScanPlateScreen } from 'src/features/modals/screens/ScanPlateScreen';
import { SelectServiceScreen } from 'src/features/modals/screens/SelectServiceScreen';
import { WashProgressScreen } from 'src/features/modals/screens/WashProgressScreen';
import { User } from '@models/User';

export type CarStackParamList = {
  'car-add': { user: User };
};

const Stack = createNativeStackNavigator<CarStackParamList>();

export default function CarNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.white.base },
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen name="car-add" component={AddCarScreen} />
    </Stack.Navigator>
  );
}
