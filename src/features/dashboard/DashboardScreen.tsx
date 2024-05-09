import { colors, globalTextStyles } from '@globals/globalStyles';
import { ProgressBar } from '@shared/ProgressBar';
import { RewardsIcon } from '@shared/RewardsIcon';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {};

export const DashboardScreen: FC<Props> = () => {
  const user = { cars: [] };

  return (
    <View style={viewStyles.container}>
      {/* Active subscription  */}
      <Text style={textStyles.heading}>Active subscription</Text>
      <View style={viewStyles.subscription}>
        <Text style={textStyles.subscription}>DA 21 322 - Premium Plus</Text>
        {user.cars.length > 1 && (
          <MaterialIcons
            name="keyboard-arrow-down"
            style={{ fontSize: 24, lineHeight: 24, color: colors.grey[60] }}
          />
        )}
      </View>

      {/* Current progress */}
      <Text style={textStyles.heading}>Current progress</Text>
      <View style={viewStyles.progress}>
        <View style={[viewStyles.horizontal, viewStyles.justify]}>
          <View style={viewStyles.horizontal}>
            <RewardsIcon color={colors.tertiary.diamond} size={24} />
            <Text style={textStyles.loyaltyLevel}>Diamond</Text>
          </View>
          <Text style={textStyles.loyaltyStatus}>72/96 washes</Text>
        </View>
        <ProgressBar progress={80} />
      </View>

      {/* Recent washes */}
      <Text style={textStyles.heading}>Recent washes</Text>
      <View style={viewStyles.wash}>
        <Text>DA 21 322</Text>
        <Text style={{ flex: 1, paddingLeft: 24 }}>Roskildevej 24</Text>
        <Text>21/04/24</Text>
      </View>
      <View style={viewStyles.wash}>
        <Text>DA 21 322</Text>
        <Text style={{ flex: 1, paddingLeft: 24 }}>Roskildevej 24</Text>
        <Text>21/04/24</Text>
      </View>
      <View style={viewStyles.wash}>
        <Text>DA 21 322</Text>
        <Text style={{ flex: 1, paddingLeft: 24 }}>Roskildevej 24</Text>
        <Text>21/04/24</Text>
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
  justify: {
    justifyContent: 'space-between',
  },
  subscription: {
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: colors.white.cream,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 4,
  },
  progress: {
    padding: 16,
    backgroundColor: colors.white.cream,
    borderRadius: 4,
  },
  wash: {
    paddingHorizontal: 16,
    height: 36,
    backgroundColor: colors.white.cream,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  subscription: {
    fontFamily: 'gilroy-medium',
    fontSize: 18,
    lineHeight: 22,
    color: colors.grey[60],
  },
});
