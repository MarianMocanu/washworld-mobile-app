import { View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccStackParamList } from '../AccountScreen';
import { RewardsIcon } from '@shared/RewardsIcon';
import { Button } from '@shared/Button';

type Props = NativeStackScreenProps<AccStackParamList, 'AccountSettings'>;

const AccountSettingsScreen = (props: Props) => {
  return (
    <ScrollView style={{ backgroundColor: '#FFF' }} contentContainerStyle={styles.container}>
      {/* Populate userInfo with user data */}
      <View style={styles.userInfo}>
        <View style={styles.iconNamePlan}>
          <View style={styles.userIcon}>
            <Text style={styles.iconText}>JP</Text>
          </View>

          <View style={styles.namePlan}>
            <Text style={styles.fullName}>Jesper Poulsen</Text>
            <Text>Premium Plus</Text>
          </View>
        </View>

        <View style={styles.carInfo}>
          <MaterialIcons name="directions-car" size={24} color={colors.grey[60]} style={{ lineHeight: 24 }} />
          <Text>DB 12 345</Text>
          <Text>Polestar 1</Text>
          <RewardsIcon color={colors.tertiary.diamond} size={24} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Subscription</Text>
        <View style={styles.buttonContainer}>
          <Button
            text="Change subscription"
            onPress={() => props.navigation.navigate('ChangeSubscription')}
            style={styles.button}
          />
          <Button
            text="Loyalty rewards"
            onPress={() => props.navigation.navigate('LoyaltyRewards')}
            style={styles.button}
          />
          <Button
            text="Add another car"
            onPress={() => props.navigation.navigate('AddAnotherCar')}
            style={styles.button}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Preferences</Text>
          <View style={styles.buttonContainer}>
            <Button
              text="Preferred location"
              onPress={() => props.navigation.navigate('PreferredLocation')}
              style={styles.button}
            />
            <Button
              text="Preferred services"
              onPress={() => props.navigation.navigate('PreferredServices')}
              style={styles.button}
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
            <Button text="FAQs" onPress={() => props.navigation.navigate('FAQ')} style={styles.button} />
            <Button
              text="Customer support"
              onPress={() => props.navigation.navigate('CustomerSupport')}
              style={styles.button}
            />
            <Button
              text="Submit feedback"
              onPress={() => props.navigation.navigate('SubmitFeedback')}
              style={styles.button}
            />
          </View>
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionHeading}>Account</Text>
          <View style={styles.buttonContainer}>
            <Button
              text="Edit account details"
              onPress={() => props.navigation.navigate('EditAccountDetails')}
              style={styles.button}
            />
            <Button
              text="Change password"
              onPress={() => props.navigation.navigate('ChangePassword')}
              style={styles.button}
            />
            <Button
              text="Log out"
              onPress={() => props.navigation.navigate('LogOut')}
              style={styles.button}
            />
          </View>
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
