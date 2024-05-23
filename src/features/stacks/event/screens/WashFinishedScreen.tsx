import { colors, globalTextStyles } from '@globals/globalStyles';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@shared/Button';
import { FC, useEffect } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/app/store';
import { CheckCircle } from 'src/assets/SVGIcons';
import { EventStackParamList } from 'src/navigation/EventNavigator';
import { TabsParamList } from 'src/navigation/TabNavigator';
import { resetEvent } from './eventSlice';
import { ScreenHeader } from '@shared/ScreenHeader';
import { CarWashed } from 'src/assets/SVGImages';

export const WashFinishedScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<TabsParamList>>();
  const route = useRoute<RouteProp<EventStackParamList, 'wash-finished'>>();
  const { stopped } = route.params;

  function handleOnPress() {
    navigation.navigate('dashboard');
    dispatch(resetEvent());
  }

  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader />
      <View style={[styles.screenContent, { justifyContent: 'center', marginTop: -76 }]}>
        <Text style={text.title}>{stopped ? 'Wash stopped' : 'Wash complete'}</Text>
        {/* <CheckCircle style={{ alignSelf: 'center' }} /> */}
        <CarWashed style={{ alignSelf: 'center' }} />
        <Text style={[text.regular, { alignSelf: 'center' }]}>Proceed through the gate!</Text>
        <Button text="Finish" primary onPress={handleOnPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContent: {
    flex: 1,
    margin: 24,
    gap: 40,
  },
  icon: {
    fontSize: 32,
    lineHeight: 32,
    color: colors.secondary.base,
  },
});

const text = StyleSheet.create({
  title: {
    ...globalTextStyles.headingLarge,
    alignSelf: 'center',
  },
  regular: {
    fontFamily: 'gilroy-medium',
    fontSize: 16,
    lineHeight: 20,
    color: colors.grey[90],
  },
});
