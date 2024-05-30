import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RewardsIcon } from '@shared/RewardsIcon';
import Toast from 'react-native-toast-message';
import { Button } from '@shared/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamsList } from 'src/navigation/MainNavigator';
import { useCars } from '@queries/Car';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { CarPickerModal } from '@shared/CarPickerModal';
import { useEffect, useState } from 'react';
import { useSubscriptions } from '@queries/Subscriptions';
import { AccountStackParamList } from '../AccountNavigator';
import { useEventsNumber } from '@queries/Event';
import { getLoyaltyLevels, LoyaltyLevel } from '../../shared/loyaltyLevels';

type Props = NativeStackScreenProps<AccountStackParamList, 'index'>;

const AccountSettingsScreen = (props: Props) => {
  const mainNavigation = useNavigation<NavigationProp<MainStackParamsList>>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { data: cars } = useCars(user?.id, { enabled: !!user });
  const { data: subscriptions } = useSubscriptions(user?.id, { enabled: !!user?.id });

  const [isEnabled, setIsEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: eventsNumber } = useEventsNumber(user?.id, { enabled: !!user?.id });

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [currentLoyaltyLevel, setCurrentLoyaltyLevel] = useState<LoyaltyLevel>({
    name: 'Bronze',
    color: colors.tertiary.bronze,
    goal: 0,
    rewards: [],
  });

  useEffect(() => {
    const { currentLoyaltyLevel } = getLoyaltyLevels(eventsNumber);
    setCurrentLoyaltyLevel(currentLoyaltyLevel);
  }, [eventsNumber]);

  function handleChangeSubscription() {
    if (cars && cars?.length > 1) {
      setIsModalVisible(true);
    } else if (cars?.length === 1) {
      mainNavigation.navigate('stacks-subscription', {
        screen: 'subscription-handle',
        params: { carId: cars[0].id },
      });
    } else {
      console.log('No car registered, navigate to add car?');
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={styles.toastView}>
        <Toast />
      </View>
      <ScrollView style={{ backgroundColor: '#FFF' }} contentContainerStyle={styles.container}>
        <CarPickerModal
          visible={isModalVisible}
          heading={'Please select a car'}
          buttonText={'Cancel'}
          subscriptionData={subscriptions}
          carsData={cars}
          handlePress={() => setIsModalVisible(false)}
          setVisible={setIsModalVisible}
        />
        {/* User info section */}
        <View style={styles.userInfo}>
          <View style={styles.iconNamePlan}>
            <View style={styles.userIcon}>
              <Text style={styles.icon}>
                {(user?.firstName && user?.firstName.charAt(0) + user?.lastName.charAt(0)) || 'AA'}
              </Text>
            </View>
            <View style={styles.namePlan}>
              <Text style={text.fullName}>
                {(user?.firstName && user?.firstName + ' ' + user?.lastName) || 'Firstname Lastname '}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <RewardsIcon color={currentLoyaltyLevel.color} size={24} />
                <Text>{currentLoyaltyLevel.name} member</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Car/s section */}
        <View style={styles.section}>
          <Text style={text.heading}>Your Cars</Text>
          {cars && cars?.length > 0 && (
            <View style={styles.carContainer}>
              {cars?.map((car, index: number) => (
                <View key={index} style={styles.car}>
                  <MaterialIcons
                    name="directions-car"
                    size={24}
                    color={colors.grey[60]}
                    style={{ lineHeight: 24 }}
                  />
                  <View>
                    <Text style={text.car}>{car.plateNumber + ' - ' + car.name}</Text>

                    {(() => {
                      const activeSubscription = subscriptions?.find(
                        subscription => subscription.car.id === car.id,
                      );
                      return activeSubscription ? (
                        <Text style={[text.car, { fontSize: 14, fontFamily: 'gilroy-regular' }]}>
                          {activeSubscription.level.name}
                        </Text>
                      ) : (
                        <Text style={[text.car, { fontSize: 14, fontFamily: 'gilroy-regular' }]}>
                          No active subscription
                        </Text>
                      );
                    })()}
                  </View>
                </View>
              ))}
            </View>
          )}
          <View style={styles.buttonContainer}>
            <Button
              text={cars && cars?.length > 0 ? 'Add another car' : 'Add a car'}
              onPress={() => mainNavigation.navigate('stacks-car', { screen: 'car-add' })}
              style={styles.button}
              rightIcon={
                <MaterialIcons
                  name="chevron-right"
                  style={{ lineHeight: 24, fontSize: 24, color: colors.grey[60] }}
                />
              }
            />
          </View>
        </View>

        {/* Subscription */}
        <View style={styles.section}>
          <Text style={text.heading}>Subscription</Text>
          <View style={styles.buttonContainer}>
            <Button
              text="Change subscription"
              onPress={() => handleChangeSubscription()}
              style={styles.button}
              rightIcon={
                <MaterialIcons
                  name="chevron-right"
                  style={{ lineHeight: 24, fontSize: 24, color: colors.grey[60] }}
                />
              }
            />
            <Button
              text="Loyalty rewards"
              onPress={() => props.navigation.navigate('rewards')}
              style={styles.button}
              rightIcon={
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={colors.grey[60]}
                  style={{ lineHeight: 24 }}
                />
              }
            />
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={text.heading}>Preferences</Text>
          <View style={styles.buttonContainer}>
            <Button
              text="Preferred location"
              onPress={() => {
                Toast.show({
                  type: 'info',
                  text1: 'Preferred location is not available at the moment.',
                });
              }}
              style={styles.button}
              rightIcon={
                <MaterialIcons
                  name="chevron-right"
                  style={{ lineHeight: 24, fontSize: 24, color: colors.grey[60] }}
                />
              }
            />
            <Button
              text="Preferred services"
              onPress={() => {
                Toast.show({
                  type: 'info',
                  text1: 'Preferred services is not available at the moment.',
                });
              }}
              style={styles.button}
              rightIcon={
                <MaterialIcons
                  name="chevron-right"
                  style={{ lineHeight: 24, fontSize: 24, color: colors.grey[60] }}
                />
              }
            />
            <View style={styles.button}>
              <Text>Notifications</Text>
              <Switch onValueChange={toggleSwitch} value={isEnabled} />
            </View>
            <View style={styles.button}>
              <Text>Language</Text>
              <Text>English</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={text.heading}>Help & Support</Text>
          <View style={styles.buttonContainer}>
            <Button
              text="FAQs"
              onPress={() => props.navigation.navigate('faq')}
              style={styles.button}
              rightIcon={
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={colors.grey[60]}
                  style={{ lineHeight: 24 }}
                />
              }
            />
            <Button
              text="Customer support"
              style={styles.button}
              onPress={() => {
                Toast.show({
                  type: 'info',
                  text1: 'Feature not available at the moment.',
                });
              }}
              rightIcon={
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={colors.grey[60]}
                  style={{ lineHeight: 24 }}
                />
              }
            />
            <Button
              text="Submit feedback"
              onPress={() => {
                Toast.show({
                  type: 'info',
                  text1: 'Feature not available at the moment.',
                });
              }}
              style={styles.button}
              rightIcon={
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={colors.grey[60]}
                  style={{ lineHeight: 24 }}
                />
              }
            />
          </View>
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <Text style={text.heading}>Account</Text>
          <View style={styles.buttonContainer}>
            <Button
              text="Edit account details"
              onPress={() => {
                Toast.show({
                  type: 'info',
                  text1: 'Feature not available at the moment.',
                });
              }}
              style={styles.button}
              rightIcon={
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={colors.grey[60]}
                  style={{ lineHeight: 24 }}
                />
              }
            />
            <Button
              text="Change password"
              style={styles.button}
              onPress={() => {
                Toast.show({
                  type: 'info',
                  text1: 'Feature not available at the moment.',
                });
              }}
              rightIcon={
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={colors.grey[60]}
                  style={{ lineHeight: 24 }}
                />
              }
            />
            <Button
              text="Log out"
              onPress={() => props.navigation.navigate('log-out')}
              style={styles.button}
              rightIcon={
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={colors.grey[60]}
                  style={{ lineHeight: 24 }}
                />
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white.base,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  section: {
    alignSelf: 'stretch',
  },
  userInfo: {
    alignSelf: 'stretch',
    backgroundColor: colors.white.cream,
    flexDirection: 'column',
    paddingHorizontal: 24,
    gap: 12,
    paddingVertical: 12,
    marginTop: 12,
    borderRadius: 8,
  },
  iconNamePlan: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  namePlan: {
    flexDirection: 'column',
    gap: 4,
  },
  userIcon: {
    backgroundColor: '#34B566',
    height: 48,
    width: 48,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: colors.white.base,
    fontSize: 16,
  },
  carInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  car: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    backgroundColor: colors.white.cream,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  carContainer: {
    backgroundColor: colors.white.cream,
    padding: 12,
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  buttonContainer: {
    backgroundColor: colors.white.cream,
    borderRadius: 4,
  },
  lastSection: {
    marginBottom: 24,
  },
  toastView: {
    zIndex: 9999,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const text = StyleSheet.create({
  fullName: {
    ...globalTextStyles.heading,
    fontSize: 20,
  },
  car: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    lineHeight: 18,
  },
  button: {
    color: colors.black.base,
  },
  heading: {
    ...globalTextStyles.heading,
    color: colors.black.base,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: colors.white.base,
  },
  subscription: {
    ...globalTextStyles.inactive,
    fontSize: 12,
  },
});
