import { colors, globalTextStyles } from '@globals/globalStyles';
import { Button } from '@shared/Button';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Subscription } from '@models/Subscription';

interface SubscriptionPickerModalProps {
  visible: boolean;
  handlePress: () => void;
  heading: string;
  buttonText?: string;
  subscriptionData: Subscription[] | undefined;
  setVisible: (value: boolean) => void;
  setSelectedCarId: (carId: number) => void;
}

export const SubscriptionPickerModal: React.FC<SubscriptionPickerModalProps> = ({
  visible,
  handlePress,
  heading,
  buttonText,
  subscriptionData,
  setVisible,
  setSelectedCarId,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity style={styles.modalContainer} onPress={() => setVisible(false)}>
        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
          <Text style={styles.modalHeading}>{heading}</Text>
          {subscriptionData?.map((subscription, index: number) => (
            <Button
              key={index}
              style={styles.carButton}
              onPress={() => {
                setSelectedCarId(subscription.car.id);
                setVisible(false);
              }}
            >
              <MaterialIcons
                name="directions-car"
                size={24}
                color={colors.grey[60]}
                style={{ lineHeight: 24 }}
              />
              <View>
                <Text>{subscription.car.plateNumber + ' - ' + subscription.car.name}</Text>
                <Text style={[styles.modalText, styles.carSubscription]}>
                  {subscription.level.name || 'no subscription'}
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
