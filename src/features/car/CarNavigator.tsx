import { colors } from '@globals/globalStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddCarScreen } from 'src/features/car/AddCarScreen';
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
        animation: 'none',
      }}
    >
      <Stack.Screen name="car-add" component={AddCarScreen} />
    </Stack.Navigator>
  );
}
