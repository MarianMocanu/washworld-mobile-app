import { colors, globalTextStyles } from '@globals/globalStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button } from '@shared/Button';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useEffect, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { CarInTerminal } from 'src/assets/SVGImages';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/store';
import { useAvailableTerminal } from '@queries/Terminals';
import { EventStackParamList } from '../EventNavigator';
import { setTerminalId } from '../eventSlice';

export const ScanPlateScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<EventStackParamList, 'scan-plate'>>();
  const dispatch = useDispatch<AppDispatch>();
  const { locationId } = useSelector((state: RootState) => state.event);

  const [scanning, setScanning] = useState(false);
  const [scannedSuccess, setScannedSuccess] = useState(false);

  const { serviceId } = useSelector((state: RootState) => state.event);
  const {
    data: availableTerminalData,
    isLoading: isTerminalLoading,
    error,
  } = useAvailableTerminal(locationId, serviceId, {
    enabled: !!serviceId && !!locationId,
  });

  function handleOnScanPress() {
    setScanning(true);
  }

  function handleOnOpenPress() {
    setScannedSuccess(false);
    navigation.navigate('instructions');
  }

  useEffect(() => {
    if (availableTerminalData) {
      dispatch(setTerminalId(availableTerminalData.id));
    }
  }, [availableTerminalData]);

  useEffect(() => {
    if (scanning) {
      setTimeout(() => {
        setScanning(false);
        setScannedSuccess(true);
      }, 5000);
    }
  }, [scanning]);

  return (
    <View style={styles.container}>
      <ScreenHeader backButtonShown onBackPress={navigation.goBack} />
      <View style={styles.screenContent}>
        <Text style={text.title}>Before you start</Text>
        <CarInTerminal style={{ alignSelf: 'center' }} />
        <View style={{ gap: 24, paddingVertical: 48 }}>
          {isTerminalLoading ? (
            <ActivityIndicator size={'small'} color={colors.primary.base} />
          ) : (
            <Text style={text.title}>TERMINAL {String(availableTerminalData?.id).padStart(2, '0')}</Text>
          )}
          <Text style={text.regular}>
            Align your car with the indicated terminal to have your plate scanned.
          </Text>
        </View>
        <Button primary style={styles.button} onPress={handleOnScanPress} disabled={scanning}>
          <Text style={text.button}>{scanning ? 'Scanning' : 'Scan'}</Text>
          {scanning && (
            <ActivityIndicator size="small" color={colors.white.base} style={{ paddingLeft: 8 }} />
          )}
        </Button>
      </View>
      <Modal visible={scannedSuccess} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <MaterialIcons name="check-circle" style={styles.modalIcon} />
            <Text style={text.modalTitle}>Plate scanned successfully</Text>
            <Text style={text.regular}>Your plate was scanned, you can proceed to the next step.</Text>
            <Button text="Open terminal" primary onPress={handleOnOpenPress} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContent: {
    flex: 1,
    margin: 24,
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white.base,
    borderRadius: 8,
    padding: 24,
    gap: 24,
    width: '90%',
  },
  modalIcon: {
    fontSize: 48,
    lineHeight: 48,
    color: colors.primary.base,
    alignSelf: 'center',
  },
});

const text = StyleSheet.create({
  title: {
    ...globalTextStyles.headingLarge,
    alignSelf: 'center',
  },
  modalTitle: {
    fontFamily: 'gilroy-bold',
    fontSize: 20,
    lineHeight: 24,
    color: colors.grey[90],
    alignSelf: 'center',
  },
  regular: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    lineHeight: 24,
    color: colors.grey[90],
  },
  button: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    lineHeight: 24,
    color: colors.white.base,
  },
});
