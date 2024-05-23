import React, { FC } from 'react';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ScreenHeader } from '@shared/ScreenHeader';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { DashboardStackParamList } from '../DashboardNavigator';

type WashDetailsScreenRouteProp = RouteProp<DashboardStackParamList, 'wash-details'>;

type Props = {
  route: WashDetailsScreenRouteProp;
};

export const WashDetailsScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<DashboardStackParamList, 'history'>>();
  const route = useRoute<RouteProp<DashboardStackParamList, 'wash-details'>>();
  const { event } = route.params;

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
          <Text style={textStyles.value}>Premium Plus</Text>
        </View>
        <View style={styles.row}>
          <Text style={textStyles.label}>Price</Text>
          <Text style={textStyles.value}>Subscription</Text>
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
