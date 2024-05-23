import { colors, globalTextStyles } from '@globals/globalStyles';
import { Event } from '@models/Event';
import { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '@shared/Button';

type Props = {
  /**
   * The event to display
   */
  event: Event;

  onPress: () => void;
};

export const WashEvent: FC<Props> = ({ event, onPress }) => {
  return (
    <Button style={viewStyles.container} onPress={onPress}>
      <Image source={{ uri: event.terminal.location?.image }} style={viewStyles.image} />
      <View style={viewStyles.content}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={textStyles.address}
        >{`${event.terminal.location?.city}, ${event.terminal.location?.streetName}`}</Text>

        <Text style={textStyles.plateNumber}>{event.car.plateNumber}</Text>
        <Text style={textStyles.date}>{new Date(event.createdAt).toLocaleDateString()}</Text>
      </View>
      <MaterialIcons name="keyboard-arrow-right" style={viewStyles.icon} />
    </Button>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 8,
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.white.cream,
    padding: 8,
    borderRadius: 4,
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
