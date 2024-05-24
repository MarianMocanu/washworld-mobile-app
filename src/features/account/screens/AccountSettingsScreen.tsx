import { View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountStackParamList } from '../AccountNavigator';
import { RewardsIcon } from '@shared/RewardsIcon';
import { Button } from '@shared/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamsList } from 'src/navigation/MainNavigator';
import { useCars } from '@queries/Car';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { CarPickerModal } from '@shared/CarPickerModal';
import { useState } from 'react';
import { useSubscriptions } from '@queries/Subscriptions';
import { Subscription } from '@models/Subscription';

type Props = NativeStackScreenProps<AccountStackParamList, 'index'>;

const AccountSettingsScreen = (props: Props) => {
  const mainNavigation = useNavigation<NavigationProp<MainStackParamsList>>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { data: cars } = useCars(user?.id, { enabled: !!user });
  const { data: subscriptions } = useSubscriptions(user?.id, { enabled: !!user?.id });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChangeSubscription = () => {
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
  };

  return (
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
      {/* Populate userInfo with user data */}
      <View style={styles.userInfo}>
        <View style={styles.iconNamePlan}>
          <View style={styles.userIcon}>
            <Text style={styles.iconText}>JP</Text>
          </View>

          <View style={styles.namePlan}>
            <Text style={styles.fullName}>Jesper Poulsen</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <RewardsIcon color={colors.tertiary.diamond} size={24} />
              <Text>Diamond member</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Car/s section */}
      <View style={[styles.section, styles.carSection]}>
        <Text style={styles.sectionHeading}>Your Cars</Text>
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
                <Text style={[styles.carText]}>{car.plateNumber + ' - ' + car.name}</Text>

                {(() => {
                  const activeSubscription = subscriptions?.find(
                    subscription => subscription.car.id === car.id,
                  );
                  return activeSubscription ? (
                    <Text>{activeSubscription.level.name}</Text>
                  ) : (
                    <Text>No active subscription</Text>
                  );
                })()}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Add another car"
            onPress={() => props.navigation.navigate('add-car')}
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

      {/* Subscription */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Subscription</Text>
        <View style={styles.buttonContainer}>
          <Button
            text="Change subscription"
            onPress={() => handleChangeSubscription()}
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
        <Text style={styles.sectionHeading}>Preferences</Text>
        <View style={styles.buttonContainer}>
          <Button
            text="Preferred location"
            onPress={() => props.navigation.navigate('location')}
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
            text="Preferred services"
            onPress={() => props.navigation.navigate('services')}
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
          <View style={styles.button}>
            <Text>Notifications</Text>
            <Switch value={true} onValueChange={value => console.log('Notifications', value)} />
          </View>
          <View style={styles.button}>
            <Text>Language</Text>
            <Text>CustomDropdownComponent?</Text>
            {/* <CustomLanguageDropdownComponent/> */}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Help & Support</Text>
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
            onPress={() => props.navigation.navigate('support')}
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
            text="Submit feedback"
            onPress={() => props.navigation.navigate('feedback')}
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
        <Text style={styles.sectionHeading}>Account</Text>
        <View style={styles.buttonContainer}>
          <Button
            text="Edit account details"
            onPress={() => props.navigation.navigate('details')}
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
            onPress={() => props.navigation.navigate('change-password')}
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
  carSection: {},
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
  iconText: {
    color: colors.white.base,
    fontSize: 16,
  },
  fullName: {
    ...globalTextStyles.heading,
    fontSize: 20,
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
    // height: 48,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  carContainer: {
    backgroundColor: colors.white.cream,
    padding: 12,
    gap: 12,
  },
  carText: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    lineHeight: 18,
  },
  carSubscription: {
    ...globalTextStyles.inactive,
    fontSize: 12,
  },
  sectionHeading: {
    ...globalTextStyles.heading,
    color: colors.black.base,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: colors.white.base,
  },
  buttonContainer: {
    backgroundColor: colors.white.cream,
    borderRadius: 4,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  buttonText: {
    color: colors.black.base,
  },
  lastSection: {
    marginBottom: 24,
  },
});

