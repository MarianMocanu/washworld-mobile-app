import { colors, globalTextStyles } from '@globals/globalStyles';
import { Button } from '@shared/Button';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ReactNode } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamsList } from 'src/navigation/MainNavigator';
import { Subscription } from '@models/Subscription';

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
  subscriptionData: Subscription[] | undefined;
  setVisible: (value: boolean) => void;
}

export const CarPickerModal: React.FC<InfoModalProps> = ({
  visible,
  handlePress,
  heading,
  buttonText,
  subscriptionData,
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
          {subscriptionData?.map((subscription, index: number) => (
            <Button
              key={index}
              onPress={() => navigateToSubscription(subscription.car.id)}
              style={styles.carButton}
            >
              <MaterialIcons
                name="directions-car"
                size={24}
                color={colors.grey[60]}
                style={{ lineHeight: 24 }}
              />
              <View>
                <Text style={[styles.modalText]}>
                  {subscription.car.plateNumber + ' - ' + subscription.car.name}
                </Text>
                <Text style={[styles.modalText, styles.carSubscription]}>
                  {subscription.level.name || 'no subscription'}
                </Text>
              </View>
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
    backgroundColor: colors.white.base,
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
    backgroundColor: colors.white.cream,
    height: 48,
    borderRadius: 4,
    paddingHorizontal: 16,
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
});

