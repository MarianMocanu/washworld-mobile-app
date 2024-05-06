import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthStackParamList } from 'src/navigation/AuthNavigator';

type Props = {};

export const LoginScreen: FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList, 'login'>>();

  return (
    <View style={styles.container}>
      <Text>login</Text>
      <Button title="Login" onPress={() => navigation.navigate('signup')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
