import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { FC, useLayoutEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import AuthStackNavigator from './navigation/AuthNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import MainNavigator from './navigation/MainNavigator';
import { colors } from '@globals/globalStyles';
import { autoSignIn } from './features/auth/authSlice';

export const Main: FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    dispatch(autoSignIn());
  }, []);

  if (auth.status === 'loading') {
    return <ActivityIndicator size="large" color={colors.primary.base} style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {auth.isSignedIn ? <MainNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
