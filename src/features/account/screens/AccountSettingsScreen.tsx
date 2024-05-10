import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Switch,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccStackParamList } from '../AccountScreen';
import { RewardsIcon } from '@shared/RewardsIcon';

type Props = NativeStackScreenProps<AccStackParamList, 'AccountSettings'>;

const AccountSettingsScreen = (props: Props) => {
  return (
    <ScrollView style={{ backgroundColor: '#FFF' }}>
      <View style={styles.container}>
        {/* Populate userInfo with user data */}
        <View style={styles.userInfo}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <View style={styles.userIcon}>
              <Text style={styles.iconText}>JP</Text>
            </View>

            <View style={{ flexDirection: 'column', gap: 4 }}>
              <Text style={styles.fullName}>Jesper Poulsen</Text>
              <Text>Premium Plus</Text>
            </View>
          </View>

          <View style={styles.carInfo}>
            <MaterialIcons
              name="directions-car"
              size={24}
              color={colors.grey[60]}
              style={{ lineHeight: 24 }}
            />
            <Text>DB 12 345</Text>
            <Text>Polestar 1</Text>
            <RewardsIcon color={colors.tertiary.diamond} size={24} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Subscription</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate('ChangeSubscription')}
            >
              <Text style={styles.buttonText}>Change Subscription</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate('LoyaltyRewards')}
            >
              <Text>Loyalty rewards</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate('AddAnotherCar')}
            >
              <Text>Add another car</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Preferences</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate('PreferredLocation')}
              >
                <Text style={styles.buttonText}>Preferred location</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate('PreferredServices')}
              >
                <Text style={styles.buttonText}>Preferred services</Text>
              </TouchableOpacity>
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
              <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('FAQ')}>
                <Text style={styles.buttonText}>FAQs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate('CustomerSupport')}
              >
                <Text style={styles.buttonText}>Customer support</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate('SubmitFeedback')}
              >
                <Text style={styles.buttonText}>Submit feedback</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.section, styles.lastSection]}>
            <Text style={styles.sectionHeading}>Account</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate('EditAccountDetails')}
              >
                <Text style={styles.buttonText}>Edit account details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate('ChangePassword')}
              >
                <Text style={styles.buttonText}>Change password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('LogOut')}>
                <Text style={styles.buttonText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonContainer: {},
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.white.cream,
  },
  buttonText: {
    color: colors.black.base,
  },
  lastSection: {
    marginBottom: 24,
  },
});

