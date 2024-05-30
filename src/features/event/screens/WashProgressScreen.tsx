import { colors, globalTextStyles } from '@globals/globalStyles';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from '@shared/ProgressBar';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { useCreateEvent } from '@queries/Event';
import { useService } from '@queries/Services';
import { ServiceStepsList } from '../components/ServiceStepsList';
import { EmergencyStopModal } from '../components/EmergencyStopModal';
import { useBookTerminal } from '@queries/Terminals';
import { CarWashing } from 'src/assets/SVGImages';
import { TerminalStatus } from '@models/Terminal';

export const WashProgressScreen: FC = () => {
  const event = useSelector((state: RootState) => state.event);
  const auth = useSelector((state: RootState) => state.auth);

  const [visible, setVisible] = useState(false);

  const { data: serviceData } = useService(event.serviceId, { enabled: !!event.serviceId });
  const { mutate: bookTerminal } = useBookTerminal(event.terminalId!);
  const { mutateAsync: createEventMutation } = useCreateEvent(auth.user!.id);

  const steps = useMemo(() => serviceData?.steps ?? [], [serviceData]);
  const totalDuration = useMemo(() => steps.reduce((acc, step) => acc + step.duration, 0), [steps]);

  useEffect(() => {
    createEventMutation(event)
      .then(response => {
        console.log('Event created', JSON.stringify(response, null, 2));
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (event.terminalId) {
      bookTerminal({ terminalId: event.terminalId, status: TerminalStatus.busy });
    }
  }, []);

  if (!serviceData) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        filterButtonShown
        overrideFilterIcon={<Ionicons name="warning" style={styles.icon} />}
        onFilterPress={() => setVisible(true)}
      />
      <View style={styles.screenContent}>
        <Text style={text.title}>Wash progress</Text>
        <CarWashing style={{ alignSelf: 'center' }} />
        <ProgressBar duration={totalDuration} style={{ marginHorizontal: 64 }} />
        <ServiceStepsList steps={steps} />
      </View>
      <EmergencyStopModal visible={visible} setVisible={setVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContent: {
    margin: 24,
    gap: 60,
  },
  icon: {
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
});
