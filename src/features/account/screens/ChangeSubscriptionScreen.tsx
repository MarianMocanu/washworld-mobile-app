import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { AccountStackParamList } from '../AccountNavigator';
import { SubscriptionsList } from '@shared/SubscriptionsList';

type Props = NativeStackScreenProps<AccountStackParamList, 'subscription'>;

const ChangeSubscriptionScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SubscriptionsList />
    </View>
  );
};

export default ChangeSubscriptionScreen;
