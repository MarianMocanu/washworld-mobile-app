import { Button } from '@shared/Button';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Service } from '@models/Service';
import { StepsList } from './StepsList';
import { useSubscription } from '@queries/Subscriptions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/app/store';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { setCarId } from '../screens/eventSlice';
import { useCars } from '@queries/Car';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamsList } from 'src/navigation/MainNavigator';

type Props = {
  /**
   * Title of the select service screen
   */
  title: string;
  /**
   * Additional container styles
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Services data to display as paginated list
   */
  services: Service[];
  /**
   * Function to handle the select button press
   */
  onSelectPress: (id: number) => void;
};

export const SelectService: FC<Props> = ({ title, services, onSelectPress, containerStyle }) => {
  const navigation = useNavigation<NavigationProp<MainStackParamsList, 'stacks-car'>>();
  const flatListRef = useRef<FlatList>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const { user } = useSelector((state: RootState): RootState['auth'] => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const { data: subscriptionData } = useSubscription(user?.id, {
    enabled: !!user?.id,
  });

  const { data: carsData } = useCars(user?.id, { enabled: !!user?.id });

  const currentFocusedService = useMemo(() => services[currentItemIndex], [services, currentItemIndex]);

  const isServiceIncludedInSubscription = useMemo(() => {
    if (subscriptionData && currentFocusedService?.levels) {
      return currentFocusedService.levels[0].id <= subscriptionData.level.id;
    }
    return true;
  }, [subscriptionData, services, currentItemIndex]);

  function scrollToNextItem() {
    const nextIndex = currentItemIndex + 1;
    if (nextIndex < services.length) {
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentItemIndex(nextIndex);
    }
  }

  function scrollToPreviousItem() {
    const previousIndex = currentItemIndex - 1;
    if (previousIndex >= 0) {
      flatListRef.current?.scrollToIndex({ index: previousIndex });
      setCurrentItemIndex(previousIndex);
    }
  }

  function updateCurrentItemIndex(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(event.nativeEvent.contentOffset.x / (Dimensions.get('window').width - 48));
    setCurrentItemIndex(index);
  }

  function handleOnPressUpgradeSubscription() {
    navigation.navigate('tabs', { screen: 'account', params: { screen: 'subscription' } });
  }

  useEffect(() => {
    if (carsData && carsData.length) {
      dispatch(setCarId(carsData[0].id));
    }
  }, []);

  useEffect(() => {
    setCurrentItemIndex(0);
  }, [services]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Button style={styles.button} onPress={scrollToPreviousItem} disabled={currentItemIndex === 0}>
          <MaterialIcons name="chevron-left" style={styles.arrowIcon} />
        </Button>
        <Text style={text.title}>{title}</Text>
        <Button
          style={styles.button}
          onPress={scrollToNextItem}
          disabled={currentItemIndex === services.length - 1}
        >
          <MaterialIcons name="chevron-right" style={styles.arrowIcon} />
        </Button>
      </View>

      {services.length && currentFocusedService && currentFocusedService.levels ? (
        <View style={styles.horizontal}>
          <Text style={text.serviceLevel}>{currentFocusedService.levels[0].name}</Text>
          {!subscriptionData ? (
            <Text style={text.priceBig}>
              {currentFocusedService.levels[0].price}
              <Text style={text.priceSmall}>kr.</Text>
            </Text>
          ) : null}
        </View>
      ) : null}
      <FlatList
        ref={flatListRef}
        data={services}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }: { item: Service }) => <StepsList steps={item.steps} />}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentItemIndex}
      />
      <Button
        text={isServiceIncludedInSubscription ? 'Select' : 'Upgrade subscription'}
        primary={isServiceIncludedInSubscription ? true : false}
        secondary={!isServiceIncludedInSubscription ? true : false}
        style={{ marginHorizontal: 24 }}
        onPress={
          isServiceIncludedInSubscription
            ? () => onSelectPress(services[currentItemIndex].id)
            : handleOnPressUpgradeSubscription
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
    gap: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  arrowIcon: {
    fontSize: 24,
    lineHeight: 24,
    color: colors.white.base,
  },
  button: {
    backgroundColor: colors.primary.base,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeButton: {
    position: 'absolute',
    top: Dimensions.get('window').height / 3,
    left: 0,
    width: Dimensions.get('window').width - 96,
    marginHorizontal: 24,
    alignSelf: 'center',
  },
});

const text = StyleSheet.create({
  title: {
    ...globalTextStyles.headingLarge,
    alignSelf: 'center',
  },
  serviceLevel: {
    fontFamily: 'gilroy-bold',
    fontSize: 24,
    lineHeight: 28,
    color: colors.primary.base,
  },
  priceBig: {
    fontFamily: 'gilroy-bold',
    fontSize: 32,
    lineHeight: 36,
    color: colors.grey[90],
    paddingLeft: 12,
  },
  priceSmall: {
    fontFamily: 'gilroy-bold',
    fontSize: 16,
    lineHeight: 36,
    color: colors.grey[90],
  },
});
