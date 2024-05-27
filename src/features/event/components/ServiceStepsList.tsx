import { colors } from '@globals/globalStyles';
import { Step } from '@models/Step';
import { FC, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { EventStackParamList } from '../EventNavigator';

type Props = {
  steps: Step[];
};

export const ServiceStepsList: FC<Props> = ({ steps }) => {
  const navigation = useNavigation<NavigationProp<EventStackParamList, 'wash-progress'>>();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStepDuration = useMemo(
    () => steps[currentStepIndex]?.duration ?? 0,
    [steps, currentStepIndex],
  );

  useEffect(() => {
    if (steps.length) {
      if (currentStepIndex < steps.length) {
        const timer = setTimeout(() => setCurrentStepIndex(currentStepIndex + 1), currentStepDuration * 1000);
        return () => clearTimeout(timer);
      } else {
        navigation.navigate('wash-finished', { stopped: false });
      }
    }
  }, [currentStepIndex, steps]);

  return (
    <FlatList
      data={steps}
      keyExtractor={(item: Step) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.step}>
          {item.id === steps[currentStepIndex]?.id ? (
            <ActivityIndicator
              size="small"
              style={[styles.icon, { paddingRight: 12 }]}
              color={colors.primary.base}
            />
          ) : (
            <MaterialIcons
              name="check"
              style={styles.icon}
              color={item.id <= steps[currentStepIndex]?.id ? colors.primary.base : colors.grey[30]}
            />
          )}
          <Text style={item.id <= steps[currentStepIndex]?.id ? text.active : text.inactive}>
            {item.name}
          </Text>
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignSelf: 'center',
    backgroundColor: colors.white.cream,
    padding: 16,
  },
  step: {
    flexDirection: 'row',
    height: 28,
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    lineHeight: 24,
    paddingRight: 8,
  },
});

const text = StyleSheet.create({
  active: {
    fontFamily: 'gilroy-medium',
    fontSize: 18,
    lineHeight: 22,
    color: colors.grey[90],
  },
  inactive: {
    fontFamily: 'gilroy-medium',
    fontSize: 18,
    lineHeight: 22,
    color: colors.grey[30],
  },
});
