import { colors, globalTextStyles } from '@globals/globalStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button } from '@shared/Button';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { EventStackParamList } from '../EventNavigator';

export const InstructionsScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<EventStackParamList, 'instructions'>>();

  function handleOnPress() {
    Alert.alert(
      'Warning!',
      'This action will close the terminal gate and start the wash process. Are you sure you want to proceed?',
      [
        { text: 'Cancel', style: 'destructive' },
        { text: 'Proceed', onPress: () => navigation.navigate('wash-progress') },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader backButtonShown onBackPress={navigation.goBack} />
      <View style={styles.screenContent}>
        <Text style={text.title}>Instructions</Text>
        <View style={styles.card}>
          <Text style={text.heading}>Take place</Text>
          <Text style={text.regular}>Terminal is ready, drive inside until you reach the marked spot.</Text>
        </View>
        <View style={styles.card}>
          <Text style={text.heading}>Last checks</Text>
          <Text style={text.regular}>
            Make sure that your parking break is engaged and all windows are rolled up.
          </Text>
          <View style={{ height: 24 }} />
          <Text style={text.regular}>Remain inside of your vehicle during the duration of the wash.</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Button primary style={styles.button} onPress={handleOnPress}>
          <Text style={text.button}>Start wash</Text>
          <MaterialIcons name="arrow-forward" style={styles.icon} />
        </Button>
      </View>
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
    gap: 24,
  },
  card: {
    backgroundColor: colors.white.cream,
    padding: 16,
    borderRadius: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    lineHeight: 24,
    color: colors.white.base,
    paddingLeft: 8,
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
