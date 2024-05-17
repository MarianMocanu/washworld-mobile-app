import { FC, useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '@globals/globalStyles';
import MapView, { Marker } from 'react-native-maps';
import { getCurrentPositionAsync, LocationObject } from 'expo-location';
import { ScreenHeader } from '@shared/ScreenHeader';
import { ButtonGroup } from '@shared/ButtonGroup';
import { AddressObject, AddressPicker, ReverseGeocodeResponse } from '../components/AddressPicker';
import { Location, LocationStatus } from '@models/Location';
import { WashLocation } from 'src/features/dashboard/components/WashLocation';

export const StartWashScreen: FC = () => {
  const [location, setLocation] = useState<AddressObject>({} as AddressObject);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<MapView>(null);

  // create a new array of locations as dummy data, with 4 items
  const locations = Array.from({ length: 6 }, (_, index) => {
    return new Location(
      index,
      'Roskildevej 24',
      'Copenhagen',
      'Roskildevej',
      '2500',
      {
        monday: { from: '08:00', to: '20:00' },
        tuesday: { from: '08:00', to: '20:00' },
        wednesday: { from: '08:00', to: '20:00' },
        thursday: { from: '08:00', to: '20:00' },
        friday: { from: '08:00', to: '20:00' },
        saturday: { from: '08:00', to: '20:00' },
        sunday: { from: '08:00', to: '20:00' },
      },
      LocationStatus.available,
      'https://washworld.dk/_next/image?url=https%3A%2F%2Fwashworld-wordpress-production.storage.googleapis.com%2Fwp-content%2Fuploads%2F2021%2F11%2F28140219%2F2-vask.png&w=1920&q=50',
      { latitude: 55.6786, longitude: 12.5635 },
      new Date(),
    );
  });

  async function setCurrentLocation() {
    try {
      setLoading(true);
      const currentLocation: LocationObject = await getCurrentPositionAsync();
      const address = await reverseGeocode(currentLocation);
      setLocation({
        tekst: address.betegnelse,
        adresse: {
          husnr: address.husnr,
          postnr: address.postnr,
          postnrnavn: address.postnrnavn,
          vejnavn: address.vejnavn,
          x: currentLocation.coords.longitude,
          y: currentLocation.coords.latitude,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // TODO: Implement this function using the api here
  // should fetch the closest car washes based on the location object which has coords
  function handleAddressSelect(location: AddressObject) {
    setLocation(location);
  }

  async function reverseGeocode(location: LocationObject): Promise<ReverseGeocodeResponse> {
    const response = await fetch(
      `https://api.dataforsyningen.dk/adgangsadresser/reverse?x=${encodeURIComponent(
        location.coords.longitude,
      )}&y=${encodeURIComponent(location.coords.latitude)}&struktur=mini`,
    );
    return await response.json();
  }

  // Center the map when the location changes
  useEffect(() => {
    if (location.adresse) {
      mapRef.current?.animateToRegion({
        longitude: location.adresse.x,
        latitude: location.adresse.y,
        longitudeDelta: 0.02,
        latitudeDelta: 0.06,
      });
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <ScreenHeader filterButtonShown />
      <View style={styles.body}>
        <View style={{ flex: 4 }}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              longitude: location.adresse?.x ?? 12.583026625431271,
              latitude: location.adresse?.y ?? 55.640548407825584,
              longitudeDelta: 0.04,
              latitudeDelta: 0.09,
            }}
          >
            {location.adresse && (
              <Marker
                coordinate={{
                  longitude: location.adresse.x,
                  latitude: location.adresse.y,
                }}
              />
            )}
          </MapView>
          <AddressPicker
            onIconPress={setCurrentLocation}
            address={location}
            onAddressSelect={handleAddressSelect}
            loading={loading}
          />
        </View>
        <View style={styles.underMap}>
          <ButtonGroup
            data={[
              { display: 'Automatic', value: 'auto' },
              { display: 'Self-wash', value: 'manual' },
              { display: 'Vacuum', value: 'vacuum' },
            ]}
            onPress={value => console.log(value)}
            initialIndex={0}
            containerStyle={styles.buttonsContainer}
          />
          <FlatList
            data={locations}
            keyExtractor={(item, index) => `location_${item.id.toString()}_${index.toString()}`}
            renderItem={({ item }) => <WashLocation location={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white.base,
  },
  body: {
    paddingHorizontal: 24,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  underMap: {
    flex: 2,
    justifyContent: 'space-between',
    paddingVertical: 24,
    gap: 24,
  },
  buttonsContainer: {
    justifyContent: 'space-around',
  },
});
