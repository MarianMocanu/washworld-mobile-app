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
import { colors, globalTextStyles } from '@globals/globalStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackParamsList } from 'src/navigation/MainNavigator';
import { AllStepsList } from './AllStepsList';
import { Subscription } from '@models/Subscription';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';

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
  /**
   * Active subscription data
   */
  activeSubscription: Subscription | undefined;
};

export const ServicePicker: FC<Props> = ({
  title,
  services,
  onSelectPress,
  containerStyle,
  activeSubscription,
}) => {
  const navigation = useNavigation<NavigationProp<MainStackParamsList, 'stacks-event'>>();
  const flatListRef = useRef<FlatList>(null);
  const { carId } = useSelector((state: RootState) => state.activeCar);

  const [focusedIndex, setFocusedIndex] = useState(0);
  const focusedService: Service = useMemo(() => services[focusedIndex], [services, focusedIndex]);

  // console.debug('focused service', JSON.stringify(focusedService, null, 2));

  const isServiceIncludedInSubscription = useMemo(() => {
    if (activeSubscription && focusedService && focusedService.levels) {
      return activeSubscription.level.id >= focusedService.levels[0].id;
    }
    return true;
  }, [activeSubscription, services, focusedIndex]);

  function scrollToNextItem() {
    const nextIndex = focusedIndex + 1;
    if (nextIndex < services.length) {
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setFocusedIndex(nextIndex);
    }
  }

  function scrollToPreviousItem() {
    const previousIndex = focusedIndex - 1;
    if (previousIndex >= 0) {
      flatListRef.current?.scrollToIndex({ index: previousIndex });
      setFocusedIndex(previousIndex);
    }
  }

  function updateCurrentItemIndex(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(event.nativeEvent.contentOffset.x / (Dimensions.get('window').width - 48));
    setFocusedIndex(index);
  }

  function handleOnUpgradePress() {
    if (carId) {
      navigation.navigate('stacks-subscription', { screen: 'subscription-handle', params: { carId } });
    }
  }

  function handleOnSelectPress() {
    onSelectPress(services[focusedIndex].id);
  }

  useEffect(() => {
    setFocusedIndex(0);
  }, [services]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Button style={styles.button} onPress={scrollToPreviousItem} disabled={focusedIndex === 0}>
          <MaterialIcons name="chevron-left" style={styles.arrowIcon} />
        </Button>
        <Text style={text.title}>{title}</Text>
        <Button
          style={styles.button}
          onPress={scrollToNextItem}
          disabled={focusedIndex === services.length - 1}
        >
          <MaterialIcons name="chevron-right" style={styles.arrowIcon} />
        </Button>
      </View>
      {services.length && focusedService && focusedService.levels ? (
        <View style={styles.horizontal}>
          <Text style={text.serviceLevel}>{focusedService.levels[0].name}</Text>
          {!activeSubscription ? (
            <Text style={text.priceBig}>
              {focusedService.price}
              <Text style={text.priceSmall}>kr.</Text>
            </Text>
          ) : null}
        </View>
      ) : null}
      <View style={styles.list}>
        <FlatList
          ref={flatListRef}
          data={services}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }: { item: Service }) => <AllStepsList steps={item.steps} />}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={updateCurrentItemIndex}
        />
        <Button
          text={isServiceIncludedInSubscription ? 'Select service' : 'Upgrade subscription'}
          primary={isServiceIncludedInSubscription ? true : false}
          secondary={!isServiceIncludedInSubscription ? true : false}
          style={{ marginHorizontal: 24 }}
          onPress={isServiceIncludedInSubscription ? handleOnSelectPress : handleOnUpgradePress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  list: {
    flex: 1,
    backgroundColor: colors.white.cream,
    borderRadius: 4,
    padding: 16,
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
    backgroundColor: colors.white.cream,
    borderRadius: 4,
    paddingVertical: 16,
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
