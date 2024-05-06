import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import TabNavigator from './navigation/TabNavigator';
import AuthStackNavigator from './navigation/AuthNavigator';

export const Main: FC = () => {
  const isLoggedIn = true;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {isLoggedIn ? <TabNavigator /> : <AuthStackNavigator />}
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
