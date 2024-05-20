import { colors } from '@globals/globalStyles';
import { Button } from '@shared/Button';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ReactNode } from 'react';

interface InfoModalProps {
  /**
   * Pass a boolean state
   */
  visible: boolean;
  /**
   * Function to call when the button is pressed
   */
  handlePress: () => void;
  topIcon?: ReactNode;
  heading: string;
  text?: string;
  buttonText?: string;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  handlePress,
  topIcon,
  heading,
  text,
  buttonText,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {topIcon}
          <Text style={styles.modalHeading}>{heading}</Text>
          <Text style={styles.modalText}>{text}</Text>
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
    alignItems: 'center',
    paddingVertical: 24,
    marginHorizontal: 20,
    gap: 24,
    borderRadius: 4,
  },
  modalHeading: {
    fontFamily: 'gilroy-bold',
    fontSize: 20,
    lineHeight: 22,
    color: colors.black.base,
  },
  modalText: {
    fontFamily: 'gilroy-medium',
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
});

