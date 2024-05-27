import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenHeader } from '@shared/ScreenHeader';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { RewardsIcon } from '@shared/RewardsIcon';
import { ProgressBar } from '@shared/ProgressBar';
import { InfoModal } from '../../shared/InfoModal';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Collapsible } from '../components/Collapsible';
import { AccountStackParamList } from '../AccountNavigator';

type Props = NativeStackScreenProps<AccountStackParamList, 'rewards'>;

const LoyaltyRewardsScreen = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<AccountStackParamList, 'rewards'>>();
  const handleInfoModal = () => {
    // setEntryIdToDelete(entryId);
    setIsModalVisible(true);
  };

  return (
    <ScrollView style={{ backgroundColor: '#FFF' }} contentContainerStyle={styles.container}>
      <ScreenHeader backButtonShown onBackPress={() => navigation.navigate('index')} />
      {/* Header */}
      <View style={styles.contentWrapper}>
        <View style={[styles.horizontal, styles.justify]}>
          <Text style={styles.heading}>Loyalty Rewards </Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => handleInfoModal()}>
            <MaterialIcons name={'question-mark'} style={{ fontSize: 24, lineHeight: 24, color: '#FFF' }} />
          </TouchableOpacity>
        </View>
        {/* Current Status */}
        <Text style={styles.heading2}>Current Status</Text>
        <View style={styles.sectionContent}>
          <View style={[styles.horizontal, styles.justify]}>
            <View style={styles.horizontal}>
              <RewardsIcon color={colors.tertiary.gold} size={24} />
              <Text style={styles.loyaltyLevel}>Gold</Text>
            </View>
            <Text style={styles.inactive}>Achieved on 23/04/24</Text>
          </View>
          <View style={styles.rewardsList}>
            <Text style={styles.bodyFont}>5% discount for wash services</Text>
            <Text style={styles.bodyFont}>10% discount for new car subscriptions</Text>
            <Text style={styles.bodyFont}>2 vouchers to gift friends a free wash</Text>
          </View>
        </View>
        {/* Progress to Next Level */}
        <Text style={styles.heading2}>Progress to Next Level</Text>
        <View style={styles.sectionContent}>
          <View style={[styles.horizontal, styles.justify]}>
            <View style={styles.horizontal}>
              <RewardsIcon color={colors.tertiary.diamond} size={24} />
              <Text style={styles.loyaltyLevel}>Diamond</Text>
            </View>
            <Text style={styles.inactive}>72/96 washes</Text>
          </View>
          <ProgressBar progress={80} />
        </View>
        {/* Reward Levels */}
        <Text style={styles.heading2}>Reward Levels</Text>
        <View style={styles.rewardLevels}>
          <View style={styles.sectionContent}>
            <Collapsible
              title={'Base'}
              subTitle={'Initial rewards level'}
              rewardsIconColor={colors.tertiary.bronze}
              rewardsIconSize={40}
            >
              <View style={styles.rewardsList}>
                <Text style={styles.bodyFont}>5% discount for wash services</Text>
                <Text style={styles.bodyFont}>10% discount for new car subscriptions</Text>
                <Text style={styles.bodyFont}>2 vouchers to gift friends a free wash</Text>
              </View>
            </Collapsible>
          </View>
          <View style={styles.sectionContent}>
            <Collapsible
              title={'Silver'}
              subTitle={'Obtained after 24 washes'}
              rewardsIconColor={colors.tertiary.silver}
              rewardsIconSize={40}
            >
              <View style={styles.rewardsList}>
                <Text style={styles.bodyFont}>5% discount for wash services</Text>
                <Text style={styles.bodyFont}>10% discount for new car subscriptions</Text>
                <Text style={styles.bodyFont}>2 vouchers to gift friends a free wash</Text>
              </View>
            </Collapsible>
          </View>
          <View style={styles.sectionContent}>
            <Collapsible
              title={'Gold'}
              subTitle={'Obtained after 48 washes'}
              rewardsIconColor={colors.tertiary.gold}
              rewardsIconSize={40}
            >
              <View style={styles.rewardsList}>
                <Text style={styles.bodyFont}>5% discount for wash services</Text>
                <Text style={styles.bodyFont}>10% discount for new car subscriptions</Text>
                <Text style={styles.bodyFont}>2 vouchers to gift friends a free wash</Text>
              </View>
            </Collapsible>
          </View>
          <View style={styles.sectionContent}>
            <Collapsible
              title={'Diamond'}
              subTitle={'Obtained after 96 washes'}
              rewardsIconColor={colors.tertiary.diamond}
              rewardsIconSize={40}
            >
              <View style={styles.rewardsList}>
                <Text style={styles.bodyFont}>5% discount for wash services</Text>
                <Text style={styles.bodyFont}>10% discount for new car subscriptions</Text>
                <Text style={styles.bodyFont}>2 vouchers to gift friends a free wash</Text>
              </View>
            </Collapsible>
          </View>
        </View>
        <InfoModal
          visible={isModalVisible}
          heading={'Loyalty rewards'}
          text={
            'Loyalty rewards only apply to the highest earned level. The rewards are not additive with previous levels.'
          }
          buttonText={'Close'}
          handlePress={() => setIsModalVisible(false)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentWrapper: {
    paddingHorizontal: 24,
  },
  justify: {
    justifyContent: 'space-between',
  },
  bodyFont: {
    fontFamily: 'gilroy-medium',
    fontSize: 14,
    lineHeight: 18,
  },
  container: {
    backgroundColor: colors.white.base,
  },
  sectionContent: {
    padding: 16,
    backgroundColor: colors.white.cream,
    borderRadius: 4,
  },
  heading: {
    ...globalTextStyles.headingLarge,
    color: colors.black.base,
    paddingTop: 24,
    paddingBottom: 16,
  },
  heading2: {
    ...globalTextStyles.heading,
    color: colors.black.base,
    paddingTop: 24,
    paddingBottom: 16,
  },
  heading3: {
    ...globalTextStyles.heading,
    color: colors.black.base,
  },
  rewardsList: {
    marginTop: 16,
    paddingHorizontal: 12,
    gap: 4,
  },
  modalButton: {
    width: 32,
    height: 32,
    backgroundColor: colors.primary.base,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loyaltyLevel: {
    fontFamily: 'gilroy-semibold',
    fontSize: 18,
    lineHeight: 22,
    color: colors.black.base,
    paddingLeft: 4,
  },
  inactive: {
    ...globalTextStyles.inactive,
  },
  rewardLevels: {
    gap: 12,
    marginBottom: 24,
  },
});

export default LoyaltyRewardsScreen;
