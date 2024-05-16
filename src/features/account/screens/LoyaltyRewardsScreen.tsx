import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { AccountStackParamList } from '../AccountScreen';

type Props = NativeStackScreenProps<AccountStackParamList, 'rewards'>;

const LoyaltyRewardsScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loyalty Rewards Screen</Text>
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export default LoyaltyRewardsScreen;
