import * as fonts from 'expo-font';
import { useEffect, useState } from 'react';
import { Main } from 'src/Main';

export default function App() {
  const [appReady, setAppReady] = useState(false);

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

  useEffect(() => {
    loadFonts();
  }, []);

  if (appReady) {
    return <Main />;
  }
}

