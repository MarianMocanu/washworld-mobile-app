import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {};

export const SignupScreen: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>sign up</Text>
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
