import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { AccountStackParamList } from '../AccountNavigator';

type Props = NativeStackScreenProps<AccountStackParamList, 'services'>;

const PreferredServicesScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Preferred Services Screen</Text>
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export default PreferredServicesScreen;
