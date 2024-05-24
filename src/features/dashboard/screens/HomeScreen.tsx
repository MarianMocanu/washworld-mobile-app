import { colors, globalTextStyles } from '@globals/globalStyles';
import { FC, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useSubscriptions } from '@queries/Subscriptions';
import { useEvents, useEventsNumber } from '@queries/Event';
import { Button } from '@shared/Button';
import { useLocations } from '@queries/Locations';
import { Location } from '@models/Location';
import { RootState } from 'src/app/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DashboardStackParamList } from '../DashboardNavigator';
import { ScreenHeader } from '@shared/ScreenHeader';
import { LocationsList } from '@shared/LocationsList';
import { TabsParamList } from 'src/navigation/TabNavigator';
import RewardsProgress from '@shared/RewardsProgress';

type Props = {};

export const HomeScreen: FC<Props> = () => {
  const { user } = useSelector((state: RootState): RootState['auth'] => state.auth);
  const navigation = useNavigation<NavigationProp<DashboardStackParamList, 'home'>>();
  const { data: events } = useEvents(user?.id, { enabled: !!user?.id }, undefined);
  const { data: subscriptions } = useSubscriptions(user?.id, { enabled: !!user?.id });
  const { data: locations } = useLocations();
  const { data: eventsNumber } = useEventsNumber(user?.id, { enabled: !!user?.id });
  const [modalLocation, setModalLocation] = useState<Location | null>(null);
  const navigationAccount = useNavigation<NavigationProp<TabsParamList>>();

  function navigateToHistory() {
    navigation.navigate('history');
  }

  function navigateToRewards() {
    navigationAccount.navigate('account', { screen: 'rewards' });
  }

  if (subscriptions && events && locations) {
    return (
      <View style={viewStyles.mainContainer}>
        <ScreenHeader />
        <ScrollView contentContainerStyle={viewStyles.scrollContainer}>
          {/* Active subscription  */}
          <Text style={textStyles.heading} onPress={navigateToRewards}>
            Active subscription
          </Text>
          <View style={viewStyles.subscription}>
            {subscriptions[0] && (
              <Text style={textStyles.subscription}>
                {subscriptions[0].car.plateNumber} - {subscriptions[0].level.name}
              </Text>
            )}
            {/* {user.cars.length > 1 && (
            <MaterialIcons
              name="keyboard-arrow-down"
              style={{ fontSize: 24, lineHeight: 24, color: colors.grey[60] }}
            />
          )} */}
          </View>
          {/* Current progress */}
          <RewardsProgress heading={'Current Rewards Progress'} />
          {/* Recent washes */}
          <View style={[viewStyles.horizontal, viewStyles.justify]}>
            <Text style={textStyles.heading}>Recent washes</Text>
            <Button
              text="View all"
              link
              textStyle={globalTextStyles.heading}
              style={{ paddingTop: 24, paddingBottom: 16 }}
              onPress={navigateToHistory}
              rightIcon={
                <MaterialIcons
                  name="keyboard-arrow-right"
                  style={{ fontSize: 24, lineHeight: 24, color: colors.primary.base }}
                />
              }
            />
          </View>
          {events.slice(-4).map((event, index) => (
            <View key={index} style={viewStyles.wash}>
              <Text style={textStyles.plateNumber}>{event.car.plateNumber}</Text>
              <Button
                style={{ flex: 1, paddingLeft: 24 }}
                link
                onPress={() => setModalLocation(event.terminal.location || null)}
              >
                <Text style={textStyles.address} numberOfLines={1} ellipsizeMode="tail">
                  {event.terminal.location?.address}
                </Text>
              </Button>
              <Text style={textStyles.washDate}>{new Date(event.createdAt).toLocaleDateString()}</Text>
            </View>
          ))}
          {/* Nearby wash locations */}
          <Text style={textStyles.heading}>Nearby wash locations</Text>
          <LocationsList
            modalLocation={modalLocation}
            setModalLocation={setModalLocation}
            locations={locations}
          />
        </ScrollView>
      </View>
    );
  }
};

const viewStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContainer: {
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
  address: {
    fontFamily: 'gilroy-medium',
    fontSize: 14,
    lineHeight: 18,
    color: colors.primary.base,
    textDecorationLine: 'underline',
    marginRight: 8,
  },
  washDate: {
    ...globalTextStyles.inactive,
  },
});
