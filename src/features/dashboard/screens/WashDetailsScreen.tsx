import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ScreenHeader } from '@shared/ScreenHeader';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { DashboardStackParamList } from '../DashboardNavigator';

type WashDetailsScreenRouteProp = RouteProp<DashboardStackParamList, 'washDetails'>;

type Props = {
  route: WashDetailsScreenRouteProp;
};

export const WashDetailsScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<DashboardStackParamList, 'history'>>();
  const { event } = route.params;
  console.log(event);

  return (
    <View style={styles.mainContainer}>
      <Text style={textStyles.header}>Details</Text>
      <ScreenHeader backButtonShown onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text style={textStyles.heading}>Car</Text>
        <Text style={textStyles.item}>Car license plate</Text>
        <Text style={textStyles.item}>Car name</Text>
      </View>
      <View style={styles.container}>
        <Text style={textStyles.heading}>Service Information</Text>
        <Text style={textStyles.item}>Date</Text>
        <Text style={textStyles.item}>Service Type</Text>
        <Text style={textStyles.item}>Program</Text>
        <Text style={textStyles.item}>Price</Text>
      </View>
      <View style={styles.container}>
        <Text style={textStyles.heading}>Location</Text>
        <Text style={textStyles.item}>Car Wash</Text>
        <Text style={textStyles.item}>City</Text>
        <Text style={textStyles.item}>Address</Text>
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
    paddingHorizontal: 24,
  },
});

const textStyles = StyleSheet.create({
  backButton: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black.base,
  },
  header: {
    ...globalTextStyles.headingLarge,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  heading: {
    ...globalTextStyles.heading,
    color: colors.black.base,
    paddingTop: 32,
    paddingBottom: 16,
  },
  item: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    color: colors.black.base,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

