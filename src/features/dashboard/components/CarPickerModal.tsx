import { colors, globalTextStyles } from '@globals/globalStyles';
import { Button } from '@shared/Button';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Car } from '@models/Car';

interface CarPickerModalProps {
  visible: boolean;
  handlePress: () => void;
  heading: string;
  buttonText?: string;
  carData: Car[] | undefined;
  setVisible: (value: boolean) => void;
  setSelectedCarId: (carId: number) => void;
  activeCarId: number | undefined;
}

export const CarPickerModal: React.FC<CarPickerModalProps> = ({
  visible,
  handlePress,
  heading,
  buttonText,
  carData,
  setVisible,
  setSelectedCarId,
  activeCarId,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity style={styles.modalContainer} onPress={() => setVisible(false)}>
        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
          <Text style={styles.modalHeading}>{heading}</Text>
          {carData?.map((car, index: number) => (
            <Button
              key={index}
              style={[styles.carButton, car.id === activeCarId ? styles.activeCar : {}]}
              onPress={
                car.id !== activeCarId
                  ? () => {
                      setSelectedCarId(car.id);
                      setVisible(false);
                    }
                  : undefined
              }
            >
              <MaterialIcons
                name="directions-car"
                size={24}
                color={car.id === activeCarId ? colors.white.base : colors.grey[60]}
                style={{ lineHeight: 24 }}
              />
              <View>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={[styles.modalText, car.id === activeCarId ? styles.activeCarText : {}]}
                >
                  {car.plateNumber + ' - ' + car.name}
                </Text>
                <Text
                  style={[
                    styles.modalText,
                    styles.carSubscription,
                    car.id === activeCarId ? styles.activeCarText : {},
                  ]}
                >
                  {car.subscriptions?.[0]?.level?.name || 'No subscription'}
                </Text>
              </View>
            </Button>
          ))}
          <Button primary={true} onPress={handlePress} text={buttonText} style={styles.button} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: colors.white.base,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 24,
    marginHorizontal: 20,
    gap: 24,
    borderRadius: 4,
    width: Dimensions.get('window').width * 0.9,
  },
  modalHeading: {
    fontFamily: 'gilroy-bold',
    alignSelf: 'center',
    fontSize: 20,
    lineHeight: 22,
    color: colors.black.base,
  },
  carButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    width: '100%',
    backgroundColor: colors.white.cream,
    height: 'auto',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalText: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    lineHeight: 18,
  },
  carSubscription: {
    ...globalTextStyles.inactive,
  },
  button: {
    alignSelf: 'stretch',
  },
  license: {
    width: 70,
  },
  activeCar: {
    backgroundColor: colors.primary.base,
    opacity: 1,
    color: colors.white.base,
  },
  activeCarText: {
    color: colors.white.base,
  },
});
