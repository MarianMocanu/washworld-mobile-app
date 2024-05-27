import { FC } from 'react';
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button } from '@shared/Button';
import { colors } from '@globals/globalStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { EventStackParamList } from '../EventNavigator';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

export const EmergencyStopModal: FC<Props> = ({ visible, setVisible }) => {
  const navigation = useNavigation<NavigationProp<EventStackParamList, 'wash-progress'>>();

  function handleOnPress() {
    setVisible(false);
    navigation.navigate('wash-finished', { stopped: true });
  }
  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <View style={styles.header}>
                <Ionicons name="warning" style={styles.warningIcon} />
                <Text style={text.title}>Emergency stop</Text>
                <Button onPress={() => setVisible(false)} style={styles.pressableArea}>
                  <MaterialIcons name="close" style={styles.closeIcon} />
                </Button>
              </View>
              <View style={styles.body}>
                <Text style={text.regular}>
                  Are you sure you want to engage in an emergency stop? It cannot be undone once triggered.
                </Text>
              </View>
              <View style={styles.footer}>
                <Button
                  text={'Cancel'}
                  primaryUnselected
                  style={{ flex: 1, borderWidth: 1, borderColor: colors.grey[10] }}
                  onPress={() => setVisible(false)}
                />
                <Button text={'Stop wash'} secondary style={{ flex: 1 }} onPress={handleOnPress} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
  },
  body: {
    borderColor: colors.grey[10],
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  footer: {
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
  warningIcon: {
    fontSize: 32,
    lineHeight: 32,
    color: colors.secondary.base,
  },
});

const text = StyleSheet.create({
  regular: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    lineHeight: 20,
    color: colors.grey[90],
  },
  title: {
    fontFamily: 'gilroy-bold',
    fontSize: 20,
    lineHeight: 22,
    color: colors.grey[90],
  },
});
