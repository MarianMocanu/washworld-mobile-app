import { colors, globalTextStyles } from '@globals/globalStyles';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@shared/Button';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TabsParamList } from 'src/navigation/TabNavigator';
import RadioButton from '@shared/RadioButton';
import { useLevels } from '@queries/Levels';
import { Level } from '@models/Level';
import { MainStackParamsList } from 'src/navigation/MainNavigator';
import { PaymentStackParamList } from 'src/navigation/PaymentNavigator';
import { SubscriptionStackParamList } from 'src/navigation/SubscriptionNavigator';

export const AddSubscriptionScreen: FC = () => {
  const tabNavigation = useNavigation<NavigationProp<TabsParamList, 'dashboard'>>();
  const mainNavigation = useNavigation<NavigationProp<MainStackParamsList>>();
  const route = useRoute<RouteProp<SubscriptionStackParamList, 'subscription-add'>>();
  const { data, isLoading, error } = useLevels();
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  return (
    <View style={styles.container}>
      <ScreenHeader backButtonShown onBackPress={tabNavigation.goBack} />
      <View style={styles.screenContent}>
        <Text style={text.title}>Add subscription</Text>
        <Text style={[text.regular, { alignSelf: 'center' }]}>Pick a subscription level.</Text>

        {isLoading && <ActivityIndicator />}
        {!isLoading && data && (
          <View>
            {data.map((level: Level) => (
              <RadioButton
                key={level.id}
                label={level.name}
                price={level.price + ' kr./mo.'}
                value={level.id}
                selected={selectedValue === level.id}
                onSelect={setSelectedValue}
                disabled={false}
              />
            ))}
          </View>
        )}

        <Button
          primary
          style={styles.button}
          onPress={() => {
            // console.log(selectedValue);
            selectedValue &&
              mainNavigation.navigate('stacks-payment', {
                screen: 'payment-add',
                params: { levelId: selectedValue, carId: route.params.carId },
              });
          }}
          disabled={!selectedValue || !route.params.carId}
        >
          <Text style={text.button}>Next</Text>
          <MaterialIcons name="arrow-forward" style={styles.icon} />
        </Button>
        <Button
          tertiary
          style={styles.button}
          onPress={() => {
            tabNavigation.navigate('dashboard');
          }}
        >
          <Text style={text.buttonAlt}>Skip</Text>
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
