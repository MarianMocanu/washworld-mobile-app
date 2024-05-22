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

export const AddPaymentScreen: FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const route = useRoute<RouteProp<PaymentStackParamList, 'payment-add'>>();
  //   const [user, setUser] = useState<User>();

  const { levelId, carId } = route.params;
  const { mutate, isSuccess, isLoading, isError, data } = useAddSubscription(
    levelId ? levelId : 0,
    carId ? carId : 0,
  );

  const { data: levelData, isLoading: areLevelsLoading } = useLevels();
  const [selectedLevel, setSelectedLevel] = useState<Level>();

  useEffect(() => {
    console.log('levelId:', levelId, 'carId:', carId);
  }, [route.params]);

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
      mutate();
    },
  };

  return (
    <>
      <View style={styles.container}>
        <ScreenHeader backButtonShown onBackPress={navigation.goBack} />
        <View style={styles.screenContent}>
          <View>
            <Text style={text.title}>Payment Information</Text>
            <Text style={[text.regular, { alignSelf: 'center' }]}>Enter your credit card information.</Text>
          </View>
          <View>
            <Input placeholder="Card number" isValid={true} />
            <View style={styles.doubleInput}>
              {/* workaround for even responsive spacing */}
              <View style={{ width: '48%' }}>
                <Input placeholder="Expiry date" isValid={true} />
              </View>
              <View style={{ width: '4%' }}></View>
              <View style={{ width: '48%' }}>
                <Input placeholder="CVC" isValid={true} />
              </View>
            </View>
            <Input placeholder="Card holder name" isValid={true} />
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
            disabled={false}
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
    borderBottomWidth: 0,
  },
  doubleInput: {
    display: 'flex',
    flexDirection: 'row',
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
