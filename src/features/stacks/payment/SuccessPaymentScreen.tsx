import { colors, globalTextStyles } from '@globals/globalStyles';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@shared/Button';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TabsParamList } from 'src/navigation/TabNavigator';
import { MainStackParamsList } from 'src/navigation/MainNavigator';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { PaymentStackParamList } from 'src/navigation/PaymentNavigator';
import { Main } from 'src/Main';

export const SuccessPaymentScreen: FC = () => {
  const tabNavigation = useNavigation<NavigationProp<TabsParamList, 'dashboard'>>();
  const mainNavigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const startWashnavigation = useNavigation<NavigationProp<TabsParamList, 'start-wash'>>();
  const route = useRoute<RouteProp<PaymentStackParamList, 'payment-success'>>();

  const [activeNavigator, setActiveNavigator] = useState<NavigationProp<any>>();
  const { successRoute } = route.params;

  useLayoutEffect(() => {
    if (successRoute === 'subscription') {
      setActiveNavigator(mainNavigation);
    } else if (successRoute === 'start') {
      setActiveNavigator(startWashnavigation);
    } else {
      setActiveNavigator(tabNavigation);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader backButtonShown onBackPress={tabNavigation.goBack} />
      <View style={styles.screenContent}>
        <Text style={text.title}>Payment success</Text>
        <Text style={[text.regular, { alignSelf: 'center' }]}>Finalized payment.</Text>

        <Button
          primary
          style={styles.button}
          onPress={() => {
            activeNavigator?.navigate(successRoute);
          }}
        >
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
  buttonAlt: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    lineHeight: 24,
    color: colors.black.base,
  },
});
