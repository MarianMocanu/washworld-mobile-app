import { colors, globalTextStyles } from '@globals/globalStyles';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button } from '@shared/Button';
import { ProgressBar } from '@shared/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/store';
import { useCreateEvent } from '@queries/Event';
import { resetEvent } from './eventSlice';
import { useService } from '@queries/Services';
import { Step } from '@models/Step';

export const WashProgressScreen: FC = () => {
  const event = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch<AppDispatch>();

  const [visible, setVisible] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const { data: serviceData } = useService(event.serviceId, { enabled: !!event.serviceId });
  const { mutateAsync: createEventMutation } = useCreateEvent();

  const steps = useMemo(() => serviceData?.steps ?? [], [serviceData]);
  const currentStepDuration = useMemo(
    () => steps[currentStepIndex]?.duration ?? 0,
    [steps, currentStepIndex],
  );
  const totalDuration = useMemo(() => steps.reduce((acc, step) => acc + step.duration, 0), [steps]);

  function handleEmergencyStop() {
    // update terminal status to 'available/idle'
  }

  // console.log(currentStepIndex, steps.length);

  useEffect(() => {
    if (steps.length) {
      if (currentStepIndex < steps.length) {
        const timer = setTimeout(() => setCurrentStepIndex(currentStepIndex + 1), currentStepDuration * 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentStepIndex, steps]);

  useEffect(() => {
    if (event.carId && event.serviceId && event.terminalId) {
      createEventMutation(event)
        .then(response => {
          console.log('Event created', JSON.stringify(response, null, 2));
          // dispatch(resetEvent());
        })
        .catch(error => console.error(error));
    }
  }, [event]);

  if (serviceData) {
    return (
      <View style={styles.container}>
        <ScreenHeader
          filterButtonShown
          overrideFilterIcon={<Ionicons name="warning" style={styles.warningIcon} />}
          onFilterPress={() => setVisible(true)}
        />
        <View style={styles.screenContent}>
          <Text style={text.title}>Wash progress</Text>
          <ProgressBar duration={totalDuration} style={{ marginHorizontal: 24 }} />
          <FlatList
            data={steps}
            keyExtractor={(item: Step) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.step}>
                {item.id === steps[currentStepIndex]?.id ? (
                  <ActivityIndicator
                    size="small"
                    style={[styles.checkIcon, { paddingRight: 12 }]}
                    color={colors.primary.base}
                  />
                ) : (
                  <MaterialIcons
                    name="check"
                    style={styles.checkIcon}
                    color={item.id <= steps[currentStepIndex]?.id ? colors.primary.base : colors.grey[30]}
                  />
                )}
                <Text style={item.id <= steps[currentStepIndex]?.id ? text.stepActive : text.stepInactive}>
                  {item.name}
                </Text>
              </View>
            )}
            contentContainerStyle={styles.stepsContainer}
          />
        </View>
        <Modal visible={visible} transparent>
          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Ionicons name="warning" style={styles.warningIcon} />
                    <Text style={text.modalHeader}>Emergency stop</Text>
                    <Button onPress={() => setVisible(false)} style={styles.pressableArea}>
                      <MaterialIcons name="close" style={styles.closeIcon} />
                    </Button>
                  </View>
                  <View style={styles.modalBody}>
                    <Text style={text.regular}>
                      Are you sure you want to engage in an emergency stop? It cannot be undone once
                      triggered.
                    </Text>
                  </View>
                  <View style={styles.modalFooter}>
                    <Button
                      text={'Cancel'}
                      primaryUnselected
                      style={{ flex: 1, borderWidth: 1, borderColor: colors.grey[10] }}
                      onPress={() => setVisible(false)}
                    />
                    <Button text={'Stop wash'} secondary style={{ flex: 1 }} onPress={handleEmergencyStop} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContent: {
    flex: 1,
    margin: 24,
    gap: 24,
  },
  stepsContainer: {
    marginTop: 16,
    paddingLeft: Dimensions.get('window').width / 2 - 120,
  },
  step: {
    flexDirection: 'row',
    height: 28,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
  },
  modalBody: {
    borderColor: colors.grey[10],
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  modalFooter: {
    height: 72,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  pressableArea: {
    padding: 16,
  },
  closeIcon: {
    fontSize: 24,
    lineHeight: 24,
    color: colors.grey[60],
  },
  checkIcon: {
    fontSize: 24,
    lineHeight: 24,
    paddingRight: 8,
  },
  warningIcon: {
    fontSize: 32,
    lineHeight: 32,
    color: colors.secondary.base,
  },
});

const text = StyleSheet.create({
  title: {
    ...globalTextStyles.headingLarge,
    alignSelf: 'center',
  },
  heading: {
    ...globalTextStyles.heading,
    color: colors.black.base,
    paddingBottom: 16,
  },
  regular: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    lineHeight: 20,
    color: colors.grey[90],
  },
  button: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    lineHeight: 24,
    color: colors.white.base,
  },
  modalHeader: {
    fontFamily: 'gilroy-bold',
    fontSize: 20,
    lineHeight: 22,
    color: colors.grey[90],
  },
  stepActive: {
    fontFamily: 'gilroy-medium',
    fontSize: 18,
    lineHeight: 22,
    color: colors.grey[90],
  },
  stepInactive: {
    fontFamily: 'gilroy-medium',
    fontSize: 18,
    lineHeight: 22,
    color: colors.grey[30],
  },
});
