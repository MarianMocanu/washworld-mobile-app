import { colors, globalTextStyles } from '@globals/globalStyles';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@shared/Button';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Input from '@shared/Input';
import { InputField } from '@models/InputField';
import { useAddCar } from '@queries/Car';
import { RootState } from 'src/app/store';
import { useSelector } from 'react-redux';
import { SubscriptionStackParamList } from 'src/navigation/SubscriptionNavigator';
import { MainStackParamsList } from 'src/navigation/MainNavigator';

export const AddCarScreen: FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const [license, setLicense] = useState<InputField>({
    value: '',
    valid: false,
    blurred: false,
  });
  const [carName, setCarName] = useState<InputField>({
    value: '',
    valid: false,
    blurred: false,
  });
  const [userId, setUserId] = useState<number>();
  const { mutate, isSuccess, isError, isLoading } = useAddCar({
    plateNumber: license.value.toUpperCase(),
    userId: userId,
    name: carName.value,
  });
  const licenseRegex = /^[A-Za-z]{2} ?\d{5}$/;

  const handler = {
    licenseChange: (text: string) => {
      setLicense({ value: text, valid: licenseRegex.test(license.value), blurred: false });
    },
    licenseBlur: () => {
      setLicense({ ...license, blurred: true });
    },
    carNameChange: (text: string) => {
      setCarName({ value: text, valid: carName.value.length > 0, blurred: false });
    },
    carNameBlur: () => {
      setLicense({ ...carName, blurred: true });
    },
    addCar: () => {
      if (userId) {
        mutate({ license: license.value.toUpperCase(), name: carName.value, userId: userId });
      }
    },
  };

  useEffect(() => {
    if (auth.user && auth.user.id) {
      setUserId(auth.user.id);
    }
  }, [auth.user]);

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('stacks-subscription', { screen: 'subscription-add' });
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <ScreenHeader backButtonShown onBackPress={navigation.goBack} />
      <View style={styles.screenContent}>
        <Text style={text.title}>Add a car</Text>
        <Text style={[text.regular, { alignSelf: 'center' }]}>Provide information about your vehicle.</Text>
        <Input
          keyboardType="default"
          placeholder="License plate number"
          isValid={
            (licenseRegex.test(license.value) && license.blurred) ||
            !license.blurred ||
            license.value.length == 0
          }
          errorMessage="Invalid license number. (fx. AB 12345)"
          onChangeText={handler.licenseChange}
          onBlur={handler.licenseBlur}
        />
        <Input
          keyboardType="default"
          placeholder="Car name"
          isValid={carName.value.length > 0 || !carName.blurred || carName.value.length == 0}
          errorMessage="Invalid license number. (fx. AB 12345)"
          onChangeText={handler.carNameChange}
          onBlur={handler.carNameBlur}
        />
        <Button
          primary
          style={styles.button}
          onPress={() => {
            handler.addCar();
          }}
          disabled={licenseRegex.test(license.value) ? false : true}
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
