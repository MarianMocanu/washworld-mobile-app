import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { AccStackParamList } from '../AccountScreen';

type Props = NativeStackScreenProps<AccStackParamList, 'SubmitFeedback'>;

const SubmitFeedbackScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Submit Feedback Screen</Text>
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  );
};

export default SubmitFeedbackScreen;

