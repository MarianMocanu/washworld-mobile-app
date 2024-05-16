import { NavigationProp, useNavigation } from '@react-navigation/native';
import Input from '@shared/Input';
import { FC, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthStackParamList } from 'src/navigation/AuthNavigator';

type Props = {};

export const LoginScreen: FC<Props> = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList, 'login'>>();
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text>login</Text>
      {/* just an example for now */}
      <Input
        placeholder="Email"
        isValid={email && email.length < 3 ? true : false}
        errorMessage="Email is required"
        onChangeText={text => {
          setEmail(text);
        }}
      ></Input>
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
