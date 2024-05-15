import * as fonts from 'expo-font';
import { useEffect, useState } from 'react';
import { Main } from 'src/Main';
import * as Location from 'expo-location';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string>();

  async function loadFonts() {
    await fonts
      .loadAsync({
        'gilroy-bold': require('./assets/fonts/Gilroy-Bold.otf'),
        'gilroy-semibold': require('./assets/fonts/Gilroy-SemiBold.otf'),
        'gilroy-medium': require('./assets/fonts/Gilroy-Medium.otf'),
        'gilroy-regular': require('./assets/fonts/Gilroy-Regular.otf'),
      })
      .finally(() => {
        setAppReady(true);
      });
  }

  async function requestLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied');
      return;
    }
  }

  useEffect(() => {
    loadFonts();
    requestLocationPermission();
  }, []);

  if (appReady) {
    return <Main />;
  }
}

