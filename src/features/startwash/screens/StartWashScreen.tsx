import { FC, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '@globals/globalStyles';
import MapView, { Marker } from 'react-native-maps';
import { LocationObject, getCurrentPositionAsync, reverseGeocodeAsync } from 'expo-location';
import { ScreenHeader } from '@shared/ScreenHeader';
import Input from '@shared/Input';
import { MaterialIcons } from '@expo/vector-icons';
import { ButtonGroup } from '@shared/ButtonGroup';

type Props = {};

export const StartWashScreen: FC<Props> = () => {
  const [location, setLocation] = useState<LocationObject>();
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<MapView>(null);

  async function setCurrentLocation() {
    try {
      setLoading(true);
      let location = await getCurrentPositionAsync();
      setLocation(location);

      let addresses = await reverseGeocodeAsync(location.coords);
      if (addresses.length > 0 && addresses[0].name) {
        setInputValue(addresses[0].name);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Center the map when the location changes
  useEffect(() => {
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.06,
        longitudeDelta: 0.02,
      });
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <ScreenHeader filterButtonShown />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location?.coords.latitude ?? 55.640548407825584,
            longitude: location?.coords.longitude ?? 12.583026625431271,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
              }}
            />
          )}
        </MapView>
        <Input
          placeholder="City, street name or zip code"
          onChangeText={text => setInputValue(text)}
          value={inputValue}
          rightIcon={
            loading ? (
              <ActivityIndicator color={colors.primary.base} size={'small'} />
            ) : (
              <MaterialIcons name="location-on" size={32} color={colors.primary.base} />
            )
          }
          onRightIconPress={loading ? undefined : setCurrentLocation}
          inputContainerStyle={styles.input}
        />
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white.base,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  map: {
    flex: 3,
    marginTop: 12,
    borderRadius: 4,
  },
  underMap: {
    flex: 2,
  },
  buttonsContainer: {
    justifyContent: 'space-around',
  },
  input: {
    backgroundColor: colors.white.base,
    borderWidth: 1,
    borderColor: colors.grey[10],
    marginHorizontal: 8,
    position: 'absolute',
    top: -420,
  },
});
