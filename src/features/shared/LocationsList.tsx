import { colors } from '@globals/globalStyles';
import { Location } from '@models/Location';
import { FC } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from './Button';
import { MaterialIcons } from '@expo/vector-icons';
import { Status } from './Status';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamsList } from 'src/navigation/MainNavigator';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/app/store';
import { setLocationId } from '../event/eventSlice';

type LocationsListProps = {
  locations: Location[];
  modalLocation: Location | null;
  setModalLocation: (location: Location | null) => void;
};

export const LocationsList: FC<LocationsListProps> = ({ locations, modalLocation, setModalLocation }) => {
  const navigation = useNavigation<NavigationProp<MainStackParamsList, 'tabs'>>();
  const dispatch = useDispatch<AppDispatch>();

  function handleOnSelectLocation() {
    if (modalLocation) {
      dispatch(setLocationId(modalLocation.id));
      navigation.navigate('stacks-event', { screen: 'select-service' });
      setModalLocation(null);
    }
  }

  return (
    <>
      <FlatList
        data={locations}
        keyExtractor={(item, index) => `location_${item.id.toString()}_${index.toString()}`}
        renderItem={({ item }) => <WashLocation location={item} onPress={() => setModalLocation(item)} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Modal visible={modalLocation ? true : false} transparent>
        <TouchableWithoutFeedback onPress={() => setModalLocation(null)}>
          <View style={viewStyles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={viewStyles.modalContent}>
                <View style={viewStyles.modalHeader}>
                  <Text style={textStyles.modalHeader}>
                    {modalLocation?.city} - {modalLocation?.streetName}
                  </Text>
                  <Button onPress={() => setModalLocation(null)} style={viewStyles.pressableArea}>
                    <MaterialIcons name="close" style={viewStyles.closeIcon} />
                  </Button>
                </View>
                <View style={viewStyles.modalBody}>
                  <Image
                    source={{ uri: modalLocation?.image }}
                    style={viewStyles.modalImage}
                    resizeMode="cover"
                  />
                  <View style={{ gap: 4 }}>
                    <Text style={textStyles.locationTitle}>
                      {modalLocation?.streetName + ' ' + modalLocation?.streetNumber}
                    </Text>
                    <Text style={textStyles.locationSubtitle}>
                      {modalLocation?.postalCode + ' ' + modalLocation?.city}
                    </Text>
                    <Status status={modalLocation?.status} />
                    <View style={viewStyles.horizontal}>
                      <MaterialIcons name="schedule" style={viewStyles.icon} />
                      <Text style={textStyles.location}>24/7</Text>
                    </View>
                    <View style={viewStyles.horizontal}>
                      <MaterialIcons name="cleaning-services" style={viewStyles.icon} />
                      <Text style={textStyles.location}>Vacuum station</Text>
                    </View>
                    <View style={viewStyles.horizontal}>
                      <Text style={[{ paddingRight: 8 }, textStyles.location]}>Automatic: 07</Text>
                      <Text style={textStyles.location}>Self-wash: 07</Text>
                    </View>
                  </View>
                </View>
                <View style={viewStyles.modalFooter}>
                  <Button
                    text={'Cancel'}
                    primaryUnselected
                    style={{ flex: 1, borderWidth: 1, borderColor: colors.grey[10] }}
                    onPress={() => setModalLocation(null)}
                  />
                  <Button
                    text={'Select car wash'}
                    primary
                    style={{ flex: 1 }}
                    onPress={handleOnSelectLocation}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

type WashLocationProps = {
  /**
   * The location to display
   */
  location: Location;
  /**
   * Function to call when the location is pressed
   */
  onPress: () => void;
};

const WashLocation: FC<WashLocationProps> = ({ location, onPress }) => {
  return (
    <Button style={viewStyles.container} onPress={onPress}>
      <Image source={{ uri: location.image }} style={viewStyles.image} />
      <Text style={textStyles.street}>{location.streetName}</Text>
      <Text style={textStyles.city}>{location.city}</Text>
    </Button>
  );
};

const viewStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingLeft: 16,
  },
  modalBody: {
    height: 200,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.grey[10],
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  modalImage: {
    width: 120,
    height: 160,
    borderRadius: 2,
  },
  modalFooter: {
    height: 72,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    lineHeight: 24,
    paddingRight: 4,
    color: colors.black.base,
  },
  pressableArea: {
    padding: 16,
  },
  container: {
    paddingRight: 24,
  },
  image: {
    width: 140,
    height: 90,
    borderRadius: 2,
  },
  closeIcon: {
    fontSize: 24,
    lineHeight: 24,
    color: colors.grey[60],
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
  modalHeader: {
    fontFamily: 'gilroy-bold',
    fontSize: 20,
    lineHeight: 22,
    color: colors.grey[90],
  },
  locationTitle: {
    fontFamily: 'gilroy-bold',
    fontSize: 16,
    lineHeight: 18,
    color: colors.grey[90],
  },
  locationSubtitle: {
    fontFamily: 'gilroy-medium',
    fontSize: 12,
    lineHeight: 14,
    color: colors.grey[60],
  },
  location: {
    fontFamily: 'gilroy-semibold',
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey[90],
  },
});
