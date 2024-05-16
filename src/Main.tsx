import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TabNavigator from './navigation/TabNavigator';
import AuthStackNavigator from './navigation/AuthNavigator';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';

export const Main: FC = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>{auth.isSignedIn ? <TabNavigator /> : <AuthStackNavigator />}</NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
