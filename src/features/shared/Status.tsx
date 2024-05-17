import { FC } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@globals/globalStyles';
import { LocationStatus } from '@models/Location';

type Props = {
  /**
   * The status of the location
   */
  status?: LocationStatus;
  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;
};

export const Status: FC<Props> = ({ status, style }) => {
  function getIconName() {
    switch (status) {
      case LocationStatus.available:
        return 'check-circle';
      case LocationStatus.maintenance:
        return 'build';
      case LocationStatus.closed:
        return 'cancel';
    }
  }

  function getIconColor() {
    switch (status) {
      case LocationStatus.available:
        return colors.primary.base;
      case LocationStatus.maintenance:
        return colors.secondary.base;
      case LocationStatus.closed:
        return colors.tertiary.red;
    }
  }

  function getStatusText() {
    switch (status) {
      case LocationStatus.available:
        return 'Available';
      case LocationStatus.maintenance:
        return 'Maintenance';
      case LocationStatus.closed:
        return 'Closed';
    }
  }

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      <MaterialIcons
        name={getIconName()}
        style={{ fontSize: 24, lineHeight: 24, color: getIconColor(), paddingRight: 4 }}
      />
      <Text style={{ fontFamily: 'gilroy-semibold', fontSize: 14, lineHeight: 18, color: colors.grey[90] }}>
        {getStatusText()}
      </Text>
    </View>
  );
};
