import { colors, globalTextStyles } from '@globals/globalStyles';
import { ProgressBar } from '@shared/ProgressBar';
import { RewardsIcon } from '@shared/RewardsIcon';
import { FC } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '@shared/Button';
import { Location, LocationStatus } from '@models/Location';
import { CarWashLocation } from './components/CarWashLocation';

type Props = {};

export const DashboardScreen: FC<Props> = () => {
  const user = { cars: [] };

  // create a new array of locations as dummy data, with 4 items
  const locations = Array.from({ length: 4 }, (_, index) => {
    return new Location(
      index,
      'Roskildevej 24',
      'Copenhagen',
      'Roskildevej',
      '2500',
      {
        monday: { from: '08:00', to: '20:00' },
        tuesday: { from: '08:00', to: '20:00' },
        wednesday: { from: '08:00', to: '20:00' },
        thursday: { from: '08:00', to: '20:00' },
        friday: { from: '08:00', to: '20:00' },
        saturday: { from: '08:00', to: '20:00' },
        sunday: { from: '08:00', to: '20:00' },
      },
      LocationStatus.available,
      'https://washworld.dk/_next/image?url=https%3A%2F%2Fwashworld-wordpress-production.storage.googleapis.com%2Fwp-content%2Fuploads%2F2021%2F11%2F28140219%2F2-vask.png&w=1920&q=50',
      { latitude: 55.6786, longitude: 12.5635 },
      new Date(),
    );
  });

  return (
    <ScrollView contentContainerStyle={viewStyles.container} style={{ backgroundColor: '#FFF' }}>
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
      <Text style={textStyles.heading}>Current rewards progress</Text>
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
      <View style={[viewStyles.horizontal, viewStyles.justify]}>
        <Text style={textStyles.heading}>Recent washes</Text>
        <Button
          text="View all"
          link
          textStyle={globalTextStyles.heading}
          style={{ paddingTop: 24, paddingBottom: 16 }}
          onPress={() => console.log('TODO: Navigate to wash history')}
        />
      </View>
      <View style={viewStyles.wash}>
        <Text style={textStyles.plateNumber}>DA 21 322</Text>
        <Button
          text="Roskildevej 24"
          style={{ flex: 1, paddingLeft: 24 }}
          link
          onPress={() => console.log('TODO: Open modal for specific location')}
        />
        <Text style={textStyles.washDate}>21/04/24</Text>
      </View>
      <View style={viewStyles.wash}>
        <Text style={textStyles.plateNumber}>DA 21 322</Text>
        <Button text="Roskildevej 24" style={{ flex: 1, paddingLeft: 24 }} link />
        <Text style={textStyles.washDate}>21/04/24</Text>
      </View>
      <View style={viewStyles.wash}>
        <Text style={textStyles.plateNumber}>DA 21 322</Text>
        <Button text="Roskildevej 24" style={{ flex: 1, paddingLeft: 24 }} link />
        <Text style={textStyles.washDate}>21/04/24</Text>
      </View>
      <View style={viewStyles.wash}>
        <Text style={textStyles.plateNumber}>DA 21 322</Text>
        <Button text="Roskildevej 24" style={{ flex: 1, paddingLeft: 24 }} link />
        <Text style={textStyles.washDate}>21/04/24</Text>
      </View>
      {/* Nearby wash locations */}
      <Text style={textStyles.heading}>Nearby wash locations</Text>
      <FlatList
        data={locations}
        keyExtractor={(item, index) => `location_${item.id.toString()}_${index.toString()}`}
        renderItem={({ item }) => <CarWashLocation location={item} />}
        horizontal
      />
    </ScrollView>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
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
  plateNumber: {
    fontFamily: 'gilroy-bold',
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey[80],
  },
  washDate: {
    ...globalTextStyles.inactive,
  },
});
