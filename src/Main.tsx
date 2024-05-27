import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { FC, useLayoutEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AuthStackNavigator from './features/auth/AuthNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import MainNavigator from './navigation/MainNavigator';
import { colors } from '@globals/globalStyles';
import { autoSignIn } from './features/auth/authSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Main: FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    dispatch(autoSignIn());
  }, []);

  if (auth.status === 'loading') {
    return <ActivityIndicator size="large" color={colors.primary.base} style={{ flex: 1 }} />;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {auth.isSignedIn ? <MainNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
