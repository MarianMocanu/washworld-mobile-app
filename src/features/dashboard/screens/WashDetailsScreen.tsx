import React, { FC, useEffect, useState } from 'react';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ScreenHeader } from '@shared/ScreenHeader';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { DashboardStackParamList } from '../DashboardNavigator';
import { useLevels } from '@queries/Levels';
import { useServices } from '@queries/Services';
import { useCar } from '@queries/Car';
import { Level } from '@models/Level';

type WashDetailsScreenRouteProp = RouteProp<DashboardStackParamList, 'wash-details'>;

type Props = {
  route: WashDetailsScreenRouteProp;
};

export const WashDetailsScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<DashboardStackParamList, 'history'>>();
  const route = useRoute<RouteProp<DashboardStackParamList, 'wash-details'>>();
  const { event } = route.params;
  const { data: levels, isLoading: areLevelsLoading } = useLevels();
  const { data: car, isLoading: isCarLoading } = useCar(event.car.id, { enabled: !!event.car.id });
  const [serviceName, setServiceName] = useState('');

  useEffect(() => {
    if (levels && !areLevelsLoading) {
      let serviceName = '';
      levels
        .sort((a: Level, b: Level) => a.price - b.price)
        .map((level: Level) => {
          if (level.services.find(service => service.id === event.service.id)) {
            if (serviceName.length === 0) {
              serviceName = level.name;
            }
          }
        });
      setServiceName(serviceName);
    }
  }, [levels, event.service.id, areLevelsLoading]);

  return (
    <View style={styles.mainContainer}>
      <ScreenHeader backButtonShown onBackPress={() => navigation.goBack()} />
      <Text style={textStyles.header}>Wash details</Text>
      <View style={styles.container}>
        <Text style={textStyles.heading}>Car</Text>
        <View style={styles.row}>
          <Text style={textStyles.label}>Car license plate</Text>
          <Text style={textStyles.value}>{event.car.plateNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={textStyles.label}>Car name</Text>
          <Text style={textStyles.value}>{event.car.name}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={textStyles.heading}>Service information</Text>
        <View style={styles.row}>
          <Text style={textStyles.label}>Date</Text>
          <Text style={textStyles.value}>{new Date(event.createdAt).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={textStyles.label}>Service type</Text>
          <Text style={textStyles.value}>{event.service.type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={textStyles.label}>Program</Text>
          {areLevelsLoading ? (
            <ActivityIndicator size="small" color={colors.black.base} />
          ) : (
            <Text style={textStyles.value}>{serviceName}</Text>
          )}
        </View>
        <View style={styles.row}>
          <Text style={textStyles.label}>Price</Text>
          {isCarLoading ? (
            <ActivityIndicator size="small" color={colors.black.base} />
          ) : (
            <Text style={textStyles.value}>
              {car?.subscriptions && car.subscriptions[0] && car?.subscriptions[0].active
                ? 'Subscription'
                : `${event.service.price} kr.`}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.container}>
        <Text style={textStyles.heading}>Location</Text>
        <View style={styles.row}>
          <Text style={textStyles.label}>Carwash</Text>
          <Text
            style={textStyles.value}
          >{`${event.terminal.location?.city}, ${event.terminal.location?.streetName}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={textStyles.label}>City</Text>
          <Text
            style={textStyles.value}
          >{`${event.terminal.location?.city} ${event.terminal.location?.postalCode}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={textStyles.label}>Address</Text>
          <Text
            style={textStyles.value}
          >{`${event.terminal.location?.streetName} ${event.terminal.location?.streetNumber}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white.base,
  },
  container: {
    backgroundColor: colors.white.cream,
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

const textStyles = StyleSheet.create({
  header: {
    ...globalTextStyles.headingLarge,
    textAlign: 'center',
    marginBottom: 16,
    paddingTop: 32,
  },
  heading: {
    ...globalTextStyles.heading,
    color: colors.black.base,
    marginBottom: 16,
  },
  label: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    color: colors.black.base,
  },
  value: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    color: colors.grey[80],
  },
});
