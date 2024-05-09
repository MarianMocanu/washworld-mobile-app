import { colors, globalTextStyles } from '@globals/globalStyles';
import { RewardsIcon } from '@shared/RewardsIcon';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {};

export const DashboardScreen: FC<Props> = () => {
  return (
    <View style={viewStyles.container}>
      <Text style={textStyles.heading}>Active subscription</Text>
      <View style={viewStyles.subscription}>
        <View style={viewStyles.horizontal}>
          <RewardsIcon color={colors.tertiary.diamond} size={24} />
          <Text style={textStyles.loyaltyLevel}>Diamond</Text>
        </View>
        <Text style={textStyles.loyaltyStatus}>72/96 washes</Text>
      </View>
    </View>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subscription: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: colors.white.cream,
  },
});

const textStyles = StyleSheet.create({
  heading: {
    ...globalTextStyles.heading,
    color: colors.black.base,
    paddingVertical: 12,
  },
  loyaltyLevel: {
    fontFamily: 'gilroy-semibold',
    fontSize: 18,
    lineHeight: 18,
    color: colors.black.base,
    paddingLeft: 4,
  },
  loyaltyStatus: {
    fontFamily: 'gilroy-medium',
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey[60],
  },
});
