import { Button } from '@shared/Button';
import { FC, useEffect, useRef, useState } from 'react';
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
  const flatListRef = useRef<FlatList>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const { user } = useSelector((state: RootState): RootState['auth'] => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const { data: subscriptionData } = useSubscription(user?.id, {
    enabled: !!user?.id,
  });
  const { data: carsData } = useCars(user?.id, { enabled: !!user?.id });

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

  useEffect(() => {
    if (carsData && carsData.length) {
      dispatch(setCarId(carsData[0].id));
    }
  }, []);

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
      {services.length ? (
        <View style={styles.horizontal}>
          <Text style={text.serviceLevel}>{services[currentItemIndex].levels![0].name}</Text>
          {!subscriptionData ? (
            <Text style={text.priceBig}>
              {services[currentItemIndex].levels![0].price}
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
        text="Select"
        primary
        style={{ marginHorizontal: 24 }}
        onPress={() => onSelectPress(services[currentItemIndex].id)}
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
