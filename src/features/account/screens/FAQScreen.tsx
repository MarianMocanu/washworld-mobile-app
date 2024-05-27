import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { signOut } from 'src/features/auth/authSlice';
import { AppDispatch } from 'src/app/store';
import { useDispatch } from 'react-redux';
import { ScreenHeader } from '@shared/ScreenHeader';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { FlatList } from 'react-native';
import { CollapsibleShared } from '@shared/CollapsibleShared';
import { AccountStackParamList } from '../AccountNavigator';

type Props = NativeStackScreenProps<AccountStackParamList, 'faq'>;

const FAQScreen = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<AccountStackParamList, 'log-out'>>();

  const data = [
    {
      question: 'What washing programs do you offer?',
      answer:
        'We offer five different wash programs in our car washes, and for them you have the option of choosing additional purchases at the car wash if the car needs a little extra. ',
    },
    {
      question: 'Can I wash in all your locations?',
      answer:
        'As a member of Wash World, you can wash in all our locations for an extra DKK 10 per month. The purchase can be easily and always unsubscribed again and will cease at the end of the current month. If you do not wish to purchase access to all washing locations, then you have unlimited washing in your primary laundry hall included in your membership.',
    },
    {
      question: 'How many cars can I wash on a membership?',
      answer:
        'You can only wash the registered car on your membership. A membership is associated with a number plate, so you can only wash the number plate you have created on your membership. If you have several cars that you want to wash unlimitedly, remember to create a membership for each individual car.',
    },
    {
      question: 'Can I have multiple license plates on one profile?',
      answer:
        'Yes, you can. You can have as many memberships as you want on your member profile. All memberships are invoiced together, on the last banking day of the month, from the registered payment card.         ',
    },
    {
      question: 'How do I add another license plate?',
      answer:
        'If you get another car and thereby need to wash more cars, you must create an unlimited membership linked to the number plate of the new car under the same profile. There is free creation for all additional cars you add, after the first car, on the same member profile.',
    },
  ];

  return (
    <View style={{ backgroundColor: '#FFF', flex: 1 }}>
      <ScreenHeader backButtonShown onBackPress={() => navigation.navigate('index')} />
      <View style={styles.contentWrapper}>
        <Text style={textStyles.heading}>FAQ</Text>
        <View style={styles.listWrapper}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => `question_${index}`}
            renderItem={({ item }) => (
              <CollapsibleShared title={item.question} textContent={item.answer}></CollapsibleShared>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white.base,
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headingSection: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 36,
  },
  listWrapper: {
    width: '100%',
    marginTop: 24,
    flex: 1,
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
    lineHeight: 20,
  },
  button: {
    ...globalTextStyles.heading,
    color: colors.white.base,
    alignSelf: 'center',
  },
});

export default FAQScreen;
