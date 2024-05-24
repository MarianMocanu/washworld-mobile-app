import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { ProgressBar } from './ProgressBar';
import { RewardsIcon } from './RewardsIcon';
import { useEventsNumber } from '@queries/Event';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';

interface LoyaltyLevel {
  name: string;
  color: string;
  goal: number;
}

const loyaltyLevels: LoyaltyLevel[] = [
  {
    name: 'Bronze',
    color: colors.tertiary.bronze,
    goal: 0,
  },
  {
    name: 'Silver',
    color: colors.tertiary.silver,
    goal: 24,
  },
  {
    name: 'Gold',
    color: colors.tertiary.gold,
    goal: 48,
  },
  {
    name: 'Diamond',
    color: colors.tertiary.diamond,
    goal: 96,
  },
];

const getLoyaltyLevels = (eventsNumber: number | undefined) => {
  if (eventsNumber === undefined) {
    eventsNumber = 0;
  }

  let currentLoyaltyLevel = loyaltyLevels[0];
  let nextLoyaltyLevel = null;

  for (let i = 0; i < loyaltyLevels.length; i++) {
    if (eventsNumber >= loyaltyLevels[i].goal) {
      currentLoyaltyLevel = loyaltyLevels[i];
      nextLoyaltyLevel = loyaltyLevels[i + 1] || null;
    } else {
      break;
    }
  }

  return { currentLoyaltyLevel, nextLoyaltyLevel };
};

const RewardsProgress: React.FC = () => {
  const { user } = useSelector((state: RootState): RootState['auth'] => state.auth);
  const { data: eventsNumber } = useEventsNumber(user?.id, { enabled: !!user?.id });

  const [currentLoyaltyLevel, setCurrentLoyaltyLevel] = useState<LoyaltyLevel>(loyaltyLevels[0]);
  const [nextLoyaltyLevel, setNextLoyaltyLevel] = useState<LoyaltyLevel | null>(null);

  useEffect(() => {
    const { currentLoyaltyLevel, nextLoyaltyLevel } = getLoyaltyLevels(eventsNumber);
    setCurrentLoyaltyLevel(currentLoyaltyLevel);
    setNextLoyaltyLevel(nextLoyaltyLevel);
  }, [eventsNumber]);

  return (
    <View>
      <View style={viewStyles.progress}>
        <View style={[viewStyles.horizontal, viewStyles.justify]}>
          <View style={viewStyles.horizontal}>
            <RewardsIcon color={currentLoyaltyLevel.color} size={24} />
            <Text style={textStyles.loyaltyLevel}>{currentLoyaltyLevel.name}</Text>
          </View>
          <Text style={textStyles.loyaltyStatus}>
            {eventsNumber}/{nextLoyaltyLevel?.goal} washes
          </Text>
        </View>
        {eventsNumber !== 0 && nextLoyaltyLevel && (
          <ProgressBar progress={eventsNumber && Math.floor((eventsNumber / nextLoyaltyLevel.goal) * 100)} />
        )}
      </View>
    </View>
  );
};

export default RewardsProgress;

const viewStyles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justify: {
    justifyContent: 'space-between',
  },

  progress: {
    padding: 16,
    backgroundColor: colors.white.cream,
    borderRadius: 4,
  },
});

const textStyles = StyleSheet.create({
  heading: {
    ...globalTextStyles.heading,
    color: colors.black.base,
    paddingTop: 24,
    paddingBottom: 16,
  },
  loyaltyLevel: {
    fontFamily: 'gilroy-semibold',
    fontSize: 18,
    lineHeight: 22,
    color: colors.black.base,
    paddingLeft: 4,
  },
  loyaltyStatus: {
    ...globalTextStyles.inactive,
  },
});

