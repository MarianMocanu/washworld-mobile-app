import { colors, globalTextStyles } from '@globals/globalStyles';
import { FC, useState, useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
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
import { CarPickerModal } from '../components/CarPickerModal';
import { useDispatch } from 'react-redux';
import { setActiveCarId } from '../../car/activeCarSlice';
import { Car } from '@models/Car';
import { MainStackParamsList } from 'src/navigation/MainNavigator';

type Props = {};

export const HomeScreen: FC<Props> = () => {
  const mainNavigator = useNavigation<NavigationProp<MainStackParamsList, 'tabs'>>();
  const tabNavigator = useNavigation<NavigationProp<TabsParamList, 'dashboard'>>();
  const dashboardNavigator = useNavigation<NavigationProp<DashboardStackParamList, 'home'>>();

  const dispatch = useDispatch();
  const { carId } = useSelector((state: RootState) => state.activeCar);
  const { user } = useSelector((state: RootState): RootState['auth'] => state.auth);

  const { data: events } = useEvents(user!.id, { enabled: !!user?.id }, 4);
  const { data: locations } = useLocations();
  const { data: cars } = useCars(user!.id, { enabled: !!user?.id });

  const [modalLocation, setModalLocation] = useState<Location | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const activeCar: Car = useMemo(() => {
    if (!cars) {
      return {} as Car;
    }
    const foundCar = cars.find(car => car.id === carId);
    return (foundCar as Car) ?? ({} as Car);
  }, [carId, cars]);

  function navigateToHistory() {
    dashboardNavigator.navigate('history');
  }

  function navigateToRewards() {
    tabNavigator.navigate('account', { screen: 'rewards' });
  }

  useEffect(() => {
    if (cars && cars.length > 0) {
      dispatch(setActiveCarId(cars[0].id)); // update activeCar in the store
    }
  }, [cars]);

  if (cars && events && locations) {
    return (
      <View style={viewStyles.mainContainer}>
        <ScreenHeader />
        <ScrollView contentContainerStyle={viewStyles.scrollContainer}>
          <CarPickerModal
            visible={isModalVisible}
            heading={'Please select a car'}
            setVisible={setIsModalVisible}
            handlePress={() => setIsModalVisible(false)}
            buttonText={'Cancel'}
            carData={cars}
            setSelectedCarId={carId => dispatch(setActiveCarId(carId))}
            activeCarId={carId}
          />
          {/* Active subscription  */}
          {activeCar && activeCar.id ? (
            <>
              <Text style={textStyles.heading}>Active Car</Text>
              <Button onPress={() => setIsModalVisible(true)}>
                <View style={viewStyles.subscription}>
                  <View style={viewStyles.subscriptionTextContainer}>
                    <Text style={textStyles.subscription}>
                      {activeCar.plateNumber} - {activeCar.name}
                    </Text>
                    <Text style={textStyles.subscriptionLevel}>
                      {activeCar.subscriptions?.[0]?.level?.name
                        ? `${activeCar.subscriptions[0].level.name} subscription`
                        : 'No Subscription'}
                    </Text>
                  </View>
                  {cars.length > 1 && (
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      style={{ fontSize: 24, lineHeight: 24, color: colors.grey[60] }}
                    />
                  )}
                </View>
              </Button>
            </>
          ) : (
            <>
              <Text style={textStyles.heading}>No Subscriptions</Text>
              <View style={viewStyles.subscribe}></View>
              <Button
                text="Subscribe"
                primary={true}
                onPress={() =>
                  cars &&
                  mainNavigator.navigate('stacks-subscription', {
                    screen: 'subscription-handle',
                    params: { carId: cars[0].id },
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.white.cream,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 4,
  },
  subscriptionTextContainer: {
    flexDirection: 'column',
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
  primaryHeading: {
    ...globalTextStyles.heading,
    alignSelf: 'center',
    fontSize: 24,
    height: 'auto',
    marginTop: 8,
    lineHeight: 30,
  },
  heading: {
    ...globalTextStyles.heading,
    color: colors.black.base,
    paddingTop: 24,
    paddingBottom: 12,
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
    color: colors.grey[80],
  },
  plateNumber: {
    fontFamily: 'gilroy-bold',
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey[80],
  },
  subscriptionLevel: {
    fontFamily: 'gilroy-medium',
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey[60],
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
