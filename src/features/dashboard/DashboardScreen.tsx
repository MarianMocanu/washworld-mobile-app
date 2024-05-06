import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {};

export const DashboardScreen: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'gilroy-bold', fontSize: 40 }}>Dashboard</Text>
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
