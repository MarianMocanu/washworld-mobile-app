import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { AccountStackParamList } from '../AccountNavigator';

type Props = NativeStackScreenProps<AccountStackParamList, 'location'>;

const PreferredLocationScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Preferred Location Screen</Text>
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export default PreferredLocationScreen;
