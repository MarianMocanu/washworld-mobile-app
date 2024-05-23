import { colors } from '@globals/globalStyles';
import { Button } from '@shared/Button';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ReactNode } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Car } from '@models/Car';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamsList } from 'src/navigation/MainNavigator';

interface InfoModalProps {
  /**
   * Pass a boolean state
   */
  visible: boolean;
  /**
   * Function to call when the button is pressed
   */
  handlePress: () => void;
  heading: string;
  text?: string;
  buttonText?: string;
  carData: Car[] | undefined;
  setVisible: (value: boolean) => void;
}

export const CarPickerModal: React.FC<InfoModalProps> = ({
  visible,
  handlePress,
  heading,
  buttonText,
  carData,
  setVisible,
}) => {
  const mainNavigation = useNavigation<NavigationProp<MainStackParamsList>>();

  function navigateToSubscription(carId: number) {
    setVisible(false);
    mainNavigation.navigate('stacks-subscription', {
      screen: 'subscription-add',
      params: { carId: carId },
    });
  }

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeading}>{heading}</Text>
          {carData?.map((car: Car, index: number) => (
            <Button
              // text={car.plateNumber + '   ' + car.name}
              key={index}
              onPress={() => navigateToSubscription(car.id)}
              style={styles.carButton}
              // leftIcon={
              //   <MaterialIcons
              //     name="directions-car"
              //     size={24}
              //     color={colors.grey[60]}
              //     style={{ lineHeight: 24 }}
              //   />
              // }
            >
              <MaterialIcons
                name="directions-car"
                size={24}
                color={colors.grey[60]}
                style={{ lineHeight: 24 }}
              />
              <Text style={[styles.modalText, styles.license]}>{car.plateNumber}</Text>
              <Text style={styles.modalText}>{car.name}</Text>
            </Button>
          ))}
          <Button primary={true} onPress={handlePress} text={buttonText} style={styles.button} />
        </View>
      </View>
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
    backgroundColor: colors.white.cream,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 24,
    marginHorizontal: 20,
    gap: 24,
    borderRadius: 4,
    width: 300,
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
    borderColor: colors.primary.base,
    borderWidth: 2,
    backgroundColor: colors.white.base,
    height: 48,
    borderRadius: 4,
    paddingHorizontal: 16,
  },
  modalText: {
    fontFamily: 'gilroy-medium',
    fontSize: 14,
    lineHeight: 18,
  },
  button: {
    alignSelf: 'stretch',
  },
  license: {
    width: 70,
  },
});

