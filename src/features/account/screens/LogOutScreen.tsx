import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { AccountStackParamList } from '../AccountScreen';
import { LogoSVG } from 'src/assets/SVGIcons';

type Props = NativeStackScreenProps<AccountStackParamList, 'log-out'>;

const LogOutScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Log Out Screen</Text>
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export default LogOutScreen;

