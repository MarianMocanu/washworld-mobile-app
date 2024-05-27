import { colors } from '@globals/globalStyles';

export interface LoyaltyLevel {
  name: string;
  color: string;
  goal: number;
  rewards: string[];
}

export const loyaltyLevels: LoyaltyLevel[] = [
  {
    name: 'Bronze',
    color: colors.tertiary.bronze,
    goal: 0,
    rewards: [
      '5% discount for wash services',
      '10% discount for new car subscriptions',
      '1 voucher to gift friends a free wash',
    ],
  },
  {
    name: 'Silver',
    color: colors.tertiary.silver,
    goal: 24,
    rewards: [
      '5% discount for wash services',
      '10% discount for new car subscriptions',
      '2 vouchers to gift friends a free wash',
    ],
  },
  {
    name: 'Gold',
    color: colors.tertiary.gold,
    goal: 48,
    rewards: [
      '10% discount for wash services',
      '10% discount for new car subscriptions',
      '4 vouchers to gift friends a free wash',
    ],
  },
  {
    name: 'Diamond',
    color: colors.tertiary.diamond,
    goal: 96,
    rewards: [
      '20% discount for wash services',
      '15% discount for new car subscriptions',
      '6 vouchers to gift friends a free wash',
    ],
  },
];

export const getLoyaltyLevels = (eventsNumber: number | undefined) => {
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

