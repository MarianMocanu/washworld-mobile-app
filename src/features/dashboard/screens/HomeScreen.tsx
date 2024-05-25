import { colors, globalTextStyles } from '@globals/globalStyles';
import { FC, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useSubscriptions } from '@queries/Subscriptions';
import { useEvents } from '@queries/Event';
import { useCars } from '@queries/Car';
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
import { SubscriptionPickerModal } from '../components/SubscriptionPickerModal';

type Props = {};

export const HomeScreen: FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<DashboardStackParamList, 'home'>>();
  const navigation2 = useNavigation<NavigationProp<any>>();
  const { user } = useSelector((state: RootState): RootState['auth'] => state.auth);
  const { data: events } = useEvents(user?.id, { enabled: !!user?.id }, 4);
  const { data: subscriptions } = useSubscriptions(user?.id, { enabled: !!user?.id });
  const { data: locations } = useLocations();
  const { data: car } = useCars(user?.id, { enabled: !!user?.id });
  const [modalLocation, setModalLocation] = useState<Location | null>(null);
  const navigationAccount = useNavigation<NavigationProp<TabsParamList>>();
  const [selectedCar, setSelectedCar] = useState(subscriptions?.[0]?.car);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function navigateToHistory() {
    navigation.navigate('history');
  }

  function navigateToRewards() {
    navigationAccount.navigate('account', { screen: 'rewards' });
  }

  const handleCarChange = () => {
    if (subscriptions && subscriptions.length > 1) {
      setIsModalVisible(true);
    } else if (subscriptions?.length === 1) {
      setSelectedCar(subscriptions[0].car);
    } else {
      console.log('No car registered, navigate to add car?');
    }
  };

  useEffect(() => {
    if (subscriptions && subscriptions.length > 0) {
      setSelectedCar(subscriptions[0].car);
    }
  }, [subscriptions]);
  if (subscriptions && events && locations) {
    return (
      <View style={viewStyles.mainContainer}>
        <ScreenHeader />
        <ScrollView contentContainerStyle={viewStyles.scrollContainer}>
          <SubscriptionPickerModal
            visible={isModalVisible}
            heading={'Please select a car'}
            setVisible={setIsModalVisible}
            handlePress={() => setIsModalVisible(false)}
            buttonText={'Cancel'}
            subscriptionData={subscriptions}
            setSelectedCar={setSelectedCar}
          />
          {/* Active subscription  */}
          {selectedCar ? (
            <>
              <Text style={textStyles.heading}>Active subscription</Text>
              <View style={viewStyles.subscription}>
                <Text
                  style={textStyles.subscription}
                  onPress={() =>
                    navigation2.navigate('stacks-subscription', {
                      screen: 'subscription-handle',
                      params: { carId: selectedCar.id },
                    })
                  }
                >
                  {selectedCar.plateNumber} - {selectedCar.name}
                </Text>
                {subscriptions.length > 1 && (
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    onPress={handleCarChange}
                    style={{ fontSize: 24, lineHeight: 24, color: colors.grey[60] }}
                  />
                )}
              </View>
            </>
          ) : (
            <>
              <Text style={textStyles.heading}>No Subscriptions</Text>
              <View style={viewStyles.subscribe}></View>
              <Button
                text="Subscribe"
                primary={true}
                onPress={() =>
                  car &&
                  navigation2.navigate('stacks-subscription', {
                    screen: 'subscription-handle',
                    params: { carId: car[0].id },
                  })
                }
              />
            </>
          )}
          {/* Current progress */}
          <Text style={textStyles.heading}>Current Rewards Progress</Text>
          <TouchableOpacity onPress={navigateToRewards}>
            <View>
              <RewardsProgress />
            </View>
          </TouchableOpacity>
          {/* Recent washes */}
          {events.length > 0 ? (
            <>
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
              {events.map((event, index) => (
                <View key={index.toString()} style={viewStyles.wash}>
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
            </>
          ) : (
            <View style={[viewStyles.horizontal, viewStyles.justify]}>
              <Text style={textStyles.heading}>You have no recent washes</Text>
            </View>
          )}
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
  subscribe: {
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
