import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AccountStackParamList } from '../AccountNavigator';
import { ScreenHeader } from '@shared/ScreenHeader';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { RewardsIcon } from '@shared/RewardsIcon';
import { InfoModal } from '../../shared/InfoModal';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import RewardsProgress from '@shared/RewardsProgress';
import { loyaltyLevels, getLoyaltyLevels, LoyaltyLevel } from '../../shared/loyaltyLevels';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { useEventsNumber } from '@queries/Event';
import { Collapsible } from '../components/Collapsible';

type Props = NativeStackScreenProps<AccountStackParamList, 'rewards'>;

const LoyaltyRewardsScreen = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: eventsNumber } = useEventsNumber(user?.id, { enabled: !!user?.id });
  const [currentLevel, setCurrentLevel] = useState<LoyaltyLevel | null>(null);
  const [nextLevel, setNextLevel] = useState<LoyaltyLevel | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<AccountStackParamList, 'rewards'>>();
  const handleInfoModal = () => {
    // setEntryIdToDelete(entryId);
    setIsModalVisible(true);
  };
  useEffect(() => {
    const { currentLoyaltyLevel, nextLoyaltyLevel } = getLoyaltyLevels(eventsNumber);
    setCurrentLevel(currentLoyaltyLevel);
    setNextLevel(nextLoyaltyLevel);
  }, [eventsNumber]);

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
        {currentLevel && (
          <View style={styles.sectionContent}>
            <View style={[styles.horizontal, styles.justify]}>
              <View style={styles.horizontal}>
                <RewardsIcon color={currentLevel.color} size={24} />
                <Text style={styles.loyaltyLevel}>{currentLevel.name}</Text>
              </View>

              <Text style={styles.inactive}>{eventsNumber} total washes</Text>
            </View>
            <View style={styles.rewardsList}>
              {currentLevel.rewards.map(reward => (
                <Text style={styles.bodyFont} key={reward}>
                  {reward}
                </Text>
              ))}
            </View>
          </View>
        )}
        {/* Progress to Next Level */}
        <Text style={styles.heading2}>Progress to Next Level</Text>
        <RewardsProgress />
        {/* Reward Levels */}
        <Text style={styles.heading2}>Reward Levels</Text>
        {loyaltyLevels.map(level => (
          <View style={styles.sectionContent} key={level.name}>
            <Collapsible
              title={level.name}
              subTitle={level.goal === 0 ? 'Initial rewards level' : `Obtained after ${level.goal} washes`}
              rewardsIconColor={level.color}
              rewardsIconSize={40}
            >
              <View style={styles.rewardsList}>
                {level.rewards.map(reward => (
                  <Text style={styles.bodyFont} key={reward}>
                    {reward}
                  </Text>
                ))}
              </View>
            </Collapsible>
          </View>
        ))}
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
    paddingBottom: 10,
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
