import { colors, globalTextStyles } from '@globals/globalStyles';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@shared/Button';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MainStackParamsList } from 'src/navigation/MainNavigator';
import { PaymentStackParamList } from 'src/features/payment/PaymentNavigator';
import { Image } from 'react-native';
import { EventStackParamList } from '../event/EventNavigator';

export const SuccessPaymentScreen: FC = () => {
  const mainNavigator = useNavigation<NavigationProp<MainStackParamsList>>();
  const eventNavigator = useNavigation<NavigationProp<EventStackParamList>>();
  const route = useRoute<RouteProp<PaymentStackParamList, 'payment-success'>>();

  const { successRoute } = route.params;
  const newDate = () => {
    return new Date().toLocaleDateString();
  };

  function handleOnPress() {
    switch (successRoute) {
      case 'account':
        mainNavigator.navigate('tabs', { screen: 'account' });
        break;
      case 'dashboard':
        mainNavigator.navigate('tabs', { screen: 'dashboard' });
        break;
      case 'service':
        eventNavigator.navigate('scan-plate');
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.container}>
      <ScreenHeader backButtonShown onBackPress={mainNavigator.goBack} />
      <View style={styles.screenContent}>
        <View>
          <Image source={require('./receipt_background.png')} style={styles.background} />
          <View style={{ marginTop: 24, height: 256, paddingTop: 24 }}>
            <Text style={[text.title, { color: colors.white.base }]}>Payment success</Text>
            <Text style={[text.regular, { alignSelf: 'center', color: colors.white.base }]}>
              Payment was processed successfully.
            </Text>
            <MaterialIcons
              name="check-circle"
              style={{
                fontSize: 96,
                lineHeight: 96,
                color: colors.white.base,
                alignSelf: 'center',
                marginTop: 24,
              }}
            />
          </View>
          <View style={{ marginTop: 128 }}>
            <Text style={[text.regular, { alignSelf: 'center', color: colors.white.base }]}>
              {`Payment ID: #${Math.floor(Math.random() * 1000000) + 1}`}
            </Text>
            <Text style={[text.regular, { alignSelf: 'center', color: colors.white.base }]}>
              {`Payment date: ${newDate()}`}
            </Text>
          </View>
        </View>
        <Button primary style={styles.button} onPress={handleOnPress}>
          <Text style={text.button}>Finish</Text>
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
    justifyContent: 'space-between',
    paddingBottom: 24,
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
  background: {
    width: '100%',
    height: Dimensions.get('screen').height - 256,
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
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
  buttonAlt: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    lineHeight: 24,
    color: colors.black.base,
  },
});
