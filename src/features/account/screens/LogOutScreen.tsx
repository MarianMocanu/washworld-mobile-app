import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { signOut } from 'src/features/auth/authSlice';
import { AppDispatch } from 'src/app/store';
import { useDispatch } from 'react-redux';
import { ScreenHeader } from '@shared/ScreenHeader';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { Button } from '@shared/Button';
import { AccountStackParamList } from '../AccountNavigator';

type Props = NativeStackScreenProps<AccountStackParamList, 'log-out'>;

const LogOutScreen = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<AccountStackParamList, 'log-out'>>();

  return (
    <ScrollView style={{ backgroundColor: '#FFF' }} contentContainerStyle={styles.container}>
      <ScreenHeader backButtonShown onBackPress={() => navigation.navigate('index')} />
      <View style={styles.contentWrapper}>
        <View>
          <View style={styles.headingSection}>
            <Text style={textStyles.heading}>Sign out</Text>
            <Text style={textStyles.regular}>Are you sure you want to sign out?</Text>
          </View>
          <Button primary onPress={() => dispatch(signOut())}>
            <Text style={textStyles.button}>Sign out</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white.base,
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 36,
  },
});

const textStyles = StyleSheet.create({
  heading: {
    ...globalTextStyles.heading,
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 8,
    fontFamily: 'gilroy-semibold',
  },
  regular: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
  },
  button: {
    ...globalTextStyles.heading,
    color: colors.white.base,
    alignSelf: 'center',
  },
});

export default LogOutScreen;
