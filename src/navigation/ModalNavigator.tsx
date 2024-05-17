import { colors } from '@globals/globalStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartWashModalScreen } from 'src/features/modals/screens/StartWashModalScreen';

type ModalStackParamList = {
  'start-wash': undefined;
};

const Stack = createNativeStackNavigator<ModalStackParamList>();

export default function ModalNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.white.base } }}
    >
      <Stack.Screen name="start-wash" component={StartWashModalScreen} />
    </Stack.Navigator>
  );
}
