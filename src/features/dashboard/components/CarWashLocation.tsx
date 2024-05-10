import { colors } from '@globals/globalStyles';
import { Location } from '@models/Location';
import { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  /**
   * The location to display
   */
  location: Location;
};

export const CarWashLocation: FC<Props> = ({ location }) => {
  return (
    <View style={viewStyles.container}>
      <Image source={{ uri: location.image }} style={viewStyles.image} />
      <Text style={textStyles.street}>{location.streetName}</Text>
      <Text style={textStyles.city}>{location.city}</Text>
    </View>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    paddingRight: 24,
  },
  image: {
    width: 140,
    height: 90,
    borderRadius: 2,
  },
});

const textStyles = StyleSheet.create({
  street: {
    fontFamily: 'gilroy-medium',
    fontSize: 14,
    lineHeight: 18,
    color: colors.black.base,
    paddingTop: 4,
  },
  city: {
    fontFamily: 'gilroy-medium',
    fontSize: 12,
    lineHeight: 14,
    color: colors.grey[60],
  },
});

