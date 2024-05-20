import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { AccountStackParamList } from '../AccountNavigator';
import { LogoSVG } from 'src/assets/SVGIcons';
import { signOut } from 'src/features/auth/authSlice';
import { AppDispatch } from 'src/app/store';
import { useDispatch } from 'react-redux';

type Props = NativeStackScreenProps<AccountStackParamList, 'log-out'>;

const LogOutScreen = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Log Out Screen</Text>
      <Button title="Sign out" onPress={() => dispatch(signOut())} />
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export default LogOutScreen;
