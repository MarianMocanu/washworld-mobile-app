import { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, globalTextStyles } from '@globals/globalStyles';
import MapView, { Marker, MarkerPressEvent } from 'react-native-maps';
import { getCurrentPositionAsync, LocationObject } from 'expo-location';
import { ScreenHeader } from '@shared/ScreenHeader';
import { ButtonGroup } from '@shared/ButtonGroup';
import { AddressObject, AddressPicker, ReverseGeocodeResponse } from '../components/AddressPicker';
import { LocationsList } from '@shared/LocationsList';
import { useLocations } from '@queries/Locations';

export const StartWashScreen: FC = () => {
  const [location, setLocation] = useState<AddressObject>({} as AddressObject);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<MapView>(null);

  const { data: locationsData } = useLocations(location.adresse?.x, location.adresse?.y);

  console.log(
    JSON.stringify(
      locationsData?.map(item => item.distance),
      null,
      2,
    ),
  );

  async function setCurrentLocation() {
    try {
      setLoading(true);
      const currentLocation: LocationObject = await getCurrentPositionAsync();
      const { longitude, latitude } = currentLocation.coords;
      const address = await reverseGeocode(longitude, latitude);
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

  async function reverseGeocode(longitude: number, latitude: number): Promise<ReverseGeocodeResponse> {
    const response = await fetch(
      `https://api.dataforsyningen.dk/adgangsadresser/reverse?x=${encodeURIComponent(
        longitude,
      )}&y=${encodeURIComponent(latitude)}&struktur=mini`,
    );
    return await response.json();
  }

  async function handleMarkerPress(event: MarkerPressEvent) {
    const { longitude, latitude } = event.nativeEvent.coordinate;
    try {
      const address = await reverseGeocode(longitude, latitude);
      setLocation({
        tekst: address.betegnelse,
        adresse: {
          husnr: address.husnr,
          postnr: address.postnr,
          postnrnavn: address.postnrnavn,
          vejnavn: address.vejnavn,
          x: longitude,
          y: latitude,
        },
      });
    } catch (error) {
      console.error(error);
    }
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
        <View style={{ flex: 5 }}>
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

            {locationsData?.map((location, index) => (
              <Marker
                key={`location-${index}-${location.id}`}
                coordinate={{
                  longitude: location.coordinates.longitude,
                  latitude: location.coordinates.latitude,
                }}
                icon={require('../../../assets/wwpin.png')}
                pinColor={colors.secondary.base}
                onPress={handleMarkerPress}
              />
            ))}
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

          <Text style={textStyles.heading}>Nearby wash locations</Text>
          <LocationsList locations={locationsData ?? []} />
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
    marginTop: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  underMap: {
    flex: 3,
  },
  buttonsContainer: {
    marginTop: 16,
    justifyContent: 'space-around',
  },
});

const textStyles = StyleSheet.create({
  heading: {
    ...globalTextStyles.heading,
    color: colors.black.base,
    paddingTop: 24,
    paddingBottom: 16,
  },
});
