import { colors, globalTextStyles } from '@globals/globalStyles';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@shared/Button';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RootState } from 'src/app/store';
import { useSelector } from 'react-redux';
import { MainStackParamsList } from 'src/navigation/MainNavigator';
import { User } from '@models/User';
import { PaymentStackParamList } from 'src/navigation/PaymentNavigator';
import { useAddSubscription } from '@queries/Subscriptions';
import Toast from 'react-native-toast-message';
import { useLevels } from '@queries/Levels';
import { Level } from '@models/Level';
import Input from '@shared/Input';
import { InputField } from '@models/InputField';

export const AddPaymentScreen: FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const route = useRoute<RouteProp<PaymentStackParamList, 'payment-add'>>();
  const { levelId, carId } = route.params;
  const { mutate, isSuccess, isLoading, isError, data } = useAddSubscription(
    levelId ? levelId : 0,
    carId ? carId : 0,
  );
  const { data: levelData, isLoading: areLevelsLoading } = useLevels();
  const [selectedLevel, setSelectedLevel] = useState<Level>();

  const [isProcessing, setIsProcessing] = useState(false);

  const [cardNumber, setCardNumber] = useState<InputField>({
    value: '',
    valid: false,
    blurred: false,
  });
  const [cardExpiry, setCardExpiry] = useState<InputField>({
    value: '',
    valid: false,
    blurred: false,
  });
  const [cardCVC, setCardCVC] = useState<InputField>({
    value: '',
    valid: false,
    blurred: false,
  });
  const [cardHolder, setCardHolder] = useState<InputField>({
    value: '',
    valid: false,
    blurred: false,
  });

  const cardNumberRegex = /^[0-9]{13,19}$/;
  const cardExpiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  const cardCVCRegex = /^[0-9]{3,4}$/;

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Error creating subscription.',
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Subscription created.',
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    setSelectedLevel(levelData.find((level: Level) => level.id === levelId));
  }, [areLevelsLoading, levelData]);

  const handler = {
    mutation: () => {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        mutate();
      }, 2000);
    },
    cardNumberChange: (text: string) => {
      setCardNumber({ value: text, valid: cardNumberRegex.test(text), blurred: false });
    },
    cardNumberBlur: () => {
      setCardNumber(prevState => {
        return { ...prevState, blurred: true };
      });
    },
    cardExpiryChange: (text: string) => {
      setCardExpiry({ value: text, valid: cardExpiryRegex.test(text), blurred: false });
    },
    cardExpiryBlur: () => {
      setCardExpiry(prevState => {
        return { ...prevState, blurred: true };
      });
    },
    cardCVCChange: (text: string) => {
      setCardCVC({ value: text, valid: cardCVCRegex.test(text), blurred: false });
    },
    cardCVCBlur: () => {
      setCardCVC(prevState => {
        return { ...prevState, blurred: true };
      });
    },
    cardHolderChange: (text: string) => {
      setCardHolder({
        value: text,
        valid: text.trim().length > 4 && text.trim().split(' ').length >= 2,
        blurred: false,
      });
    },
    cardHolderBlur: () => {
      setCardHolder(prevState => {
        return { ...prevState, blurred: true };
      });
    },
  };

  return (
    <>
      <View style={styles.container}>
        {isProcessing && (
          <View style={styles.overlay}>
            <View style={styles.overlayModal}>
              <View>
                <Text style={[text.heading, { color: colors.white.base }]}>Processing payment...</Text>
                <ActivityIndicator size={'large'} color={colors.white.base} />
              </View>
            </View>
          </View>
        )}
        <ScreenHeader backButtonShown onBackPress={navigation.goBack} />
        <View style={styles.screenContent}>
          <View>
            <Text style={text.title}>Payment Information</Text>
            <Text style={[text.regular, { alignSelf: 'center' }]}>Enter your credit card information.</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Button primary style={[{ width: '50%' }, styles.button]}>
              <Text style={text.button}>Credit card</Text>
            </Button>
            <Button
              style={[{ width: '50%', backgroundColor: colors.grey[10], borderRadius: 4 }, styles.button]}
              onPress={() => {
                Toast.show({
                  type: 'info',
                  text1: 'MobilePay is not available at the moment.',
                });
              }}
            >
              <Text style={text.button}>MobilePay</Text>
            </Button>
          </View>
          <View>
            <Input
              placeholder="Card number"
              isValid={
                (cardNumber.valid && cardNumber.blurred) ||
                !cardNumber.blurred ||
                cardNumber.value.length == 0
              }
              errorMessage="Credit card number must be between 13 and 16 digits."
              onChangeText={handler.cardNumberChange}
              onBlur={handler.cardNumberBlur}
            />
            <View style={styles.doubleInput}>
              {/* workaround for even responsive spacing */}
              <View style={{ width: '48%' }}>
                <Input
                  placeholder="Expiry date"
                  isValid={
                    (cardExpiry.valid && cardExpiry.blurred) ||
                    !cardExpiry.blurred ||
                    cardExpiry.value.length == 0
                  }
                  errorMessage="Not matching MM/YY"
                  onChangeText={handler.cardExpiryChange}
                  onBlur={handler.cardExpiryBlur}
                />
              </View>
              <View style={{ width: '4%' }}></View>
              <View style={{ width: '48%' }}>
                <Input
                  placeholder="CVC"
                  isValid={
                    (cardCVC.valid && cardCVC.blurred) || !cardCVC.blurred || cardCVC.value.length == 0
                  }
                  errorMessage="CVC must be provided."
                  onChangeText={handler.cardCVCChange}
                  onBlur={handler.cardCVCBlur}
                />
              </View>
            </View>
            <Input
              placeholder="Card holder name"
              isValid={
                (cardHolder.valid && cardHolder.blurred) ||
                !cardHolder.blurred ||
                cardHolder.value.length == 0
              }
              errorMessage="Full name must be provided."
              onChangeText={handler.cardHolderChange}
              onBlur={handler.cardHolderBlur}
            />
          </View>
          <View>
            {areLevelsLoading ? (
              <ActivityIndicator />
            ) : (
              <>
                <View style={styles.summaryItem}>
                  <Text style={[text.regular, text.gray]}>Subtotal:</Text>
                  <Text style={[text.regular, text.gray]}>
                    {selectedLevel && selectedLevel?.price * 0.75} kr
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={[text.regular, text.gray]}>Tax:</Text>
                  <Text style={[text.regular, text.gray]}>
                    {selectedLevel && selectedLevel?.price * 0.25} kr
                  </Text>
                </View>
                <View style={[styles.summaryItem, styles.summaryTotal]}>
                  <Text style={[text.heading]}>Tax:</Text>
                  <Text style={[text.heading]}>{selectedLevel && selectedLevel?.price.toFixed(2)} kr</Text>
                </View>
              </>
            )}
          </View>
          <Button
            primary
            style={styles.button}
            onPress={() => {
              handler.mutation();
            }}
            disabled={
              cardNumber.valid && cardExpiry.valid && cardCVC.valid && cardHolder.valid ? false : true
            }
          >
            {isLoading ? (
              <ActivityIndicator color={colors.white.base} />
            ) : (
              <>
                <Text style={text.button}>Next</Text>
                <MaterialIcons name="arrow-forward" style={styles.icon} />
              </>
            )}
          </Button>
        </View>
      </View>

      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  screenContent: {
    flex: 1,
    margin: 24,
    gap: 24,
    display: 'flex',
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
  summaryItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
    borderBottomWidth: 1,
    borderColor: colors.grey[10],
  },
  summaryTotal: {
    paddingTop: 16,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderColor: colors.grey[60],
  },
  doubleInput: {
    display: 'flex',
    flexDirection: 'row',
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayModal: {
    paddingVertical: 24,
    paddingHorizontal: 32,
    backgroundColor: colors.primary.base,
    borderRadius: 8,
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
  gray: {
    color: colors.grey[60],
  },
});
