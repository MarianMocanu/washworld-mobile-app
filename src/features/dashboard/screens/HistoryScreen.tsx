import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DashboardStackParamList } from '../DashboardNavigator';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { Location, LocationStatus } from '@models/Location';
import { WashEvent } from '../components/WashEvent';
import { ScreenHeader } from '@shared/ScreenHeader';

export const HistoryScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<DashboardStackParamList, 'history'>>();

  const locations = Array.from({ length: 20 }, (_, index) => {
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
    <View style={styles.container}>
      <ScreenHeader backButtonShown onBackPress={navigation.goBack} />
      <FlatList
        ListHeaderComponent={<Text style={textStyles.heading}>Recent washes</Text>}
        data={locations}
        keyExtractor={(item, index) => `location_${item.id.toString()}_${index.toString()}`}
        renderItem={({ item }) => <WashEvent location={item} />}
        style={{ paddingHorizontal: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pressableArea: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 24,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white.base,
  },
});

const textStyles = StyleSheet.create({
  backButton: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black.base,
  },
  heading: {
    ...globalTextStyles.heading,
    color: colors.black.base,
    paddingTop: 32,
    paddingBottom: 16,
  },
});