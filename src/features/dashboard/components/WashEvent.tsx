import { colors, globalTextStyles } from '@globals/globalStyles';
import { Location } from '@models/Location';
import { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '@shared/Button';

type Props = {
  /**
   * The location to display
   */
  location: Location;
};

export const WashEvent: FC<Props> = ({ location }) => {
  return (
    <Button style={viewStyles.container}>
      <Image source={{ uri: location.image }} style={viewStyles.image} />
      <View style={viewStyles.content}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={textStyles.address}
        >{`${location.city}, ${location.streetName}`}</Text>

        <Text style={textStyles.plateNumber}>DA 21 322</Text>
        <Text style={textStyles.date}>21/04/24</Text>
      </View>
      <MaterialIcons name="keyboard-arrow-right" style={viewStyles.icon} />
    </Button>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 12,
    flexDirection: 'row',
    gap: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  image: {
    width: 64,
    height: 56,
    borderRadius: 2,
  },
  icon: {
    fontSize: 32,
    lineHeight: 32,
    color: colors.grey[30],
    alignSelf: 'center',
  },
});

const textStyles = StyleSheet.create({
  address: {
    fontFamily: 'gilroy-semibold',
    fontSize: 16,
    lineHeight: 18,
    color: colors.primary.base,
  },
  plateNumber: {
    fontFamily: 'gilroy-bold',
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey[80],
  },
  date: {
    ...globalTextStyles.inactive,
  },
});
