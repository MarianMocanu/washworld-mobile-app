import { colors, globalTextStyles } from '@globals/globalStyles';
import { Service, ServiceType } from '@models/Service';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MainStackParamsList } from 'src/navigation/MainNavigator';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '@shared/Button';

export const SelectServiceScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<MainStackParamsList, 'modals'>>();
  const flatListRef = useRef<FlatList>(null);

  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  // create a new array of services as dummy data, with 5 items
  const services = Array.from({ length: 5 }, (_, index) => {
    return new Service(index, new Date(), ServiceType.auto, 100);
  });

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

  function handleOnPress() {
    navigation.navigate('modals', { screen: 'scan-plate' });
  }

  return (
    <View style={styles.container}>
      <ScreenHeader backButtonShown onBackPress={() => navigation.navigate('tabs')} />
      <View style={styles.screenContent}>
        <Text style={text.title}>Select service</Text>
        <View style={styles.listHeader}>
          <Button style={styles.iconButton} onPress={scrollToPreviousItem} disabled={currentItemIndex === 0}>
            <MaterialIcons name="chevron-left" style={styles.arrowIcon} />
          </Button>
          <Text style={text.serviceLevel}>Basic</Text>
          <Button
            style={styles.iconButton}
            onPress={scrollToNextItem}
            disabled={currentItemIndex === services.length - 1}
          >
            <MaterialIcons name="chevron-right" style={styles.arrowIcon} />
          </Button>
        </View>
        <FlatList
          ref={flatListRef}
          data={services}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={styles.itemStep}>
                <MaterialIcons name="check" style={styles.checkIcon} color={colors.primary.base} />
                <Text style={text.stepActive}>Car soap</Text>
              </View>
              <View style={styles.itemStep}>
                <MaterialIcons name="check" style={styles.checkIcon} color={colors.primary.base} />
                <Text style={text.stepActive}>Drying</Text>
              </View>
              <View style={styles.itemStep}>
                <MaterialIcons name="check" style={styles.checkIcon} color={colors.primary.base} />
                <Text style={text.stepActive}>Brush wash</Text>
              </View>
              <View style={styles.itemStep}>
                <MaterialIcons name="check" style={styles.checkIcon} color={colors.primary.base} />
                <Text style={text.stepActive}>High pressure rinse</Text>
              </View>
              <View style={styles.itemStep}>
                <MaterialIcons name="check" style={styles.checkIcon} color={colors.primary.base} />
                <Text style={text.stepActive}>Wheel wash</Text>
              </View>
              <View style={styles.itemStep}>
                <MaterialIcons name="check" style={styles.checkIcon} color={colors.primary.base} />
                <Text style={text.stepActive}>Rinse wax</Text>
              </View>
              <View style={styles.itemStep}>
                <MaterialIcons name="check" style={styles.checkIcon} color={colors.grey[30]} />
                <Text style={text.stepInactive}>Undercarriage wash*</Text>
              </View>
              <View style={styles.itemStep}>
                <MaterialIcons name="check" style={styles.checkIcon} color={colors.grey[30]} />
                <Text style={text.stepInactive}>Polishing</Text>
              </View>
              <View style={styles.itemStep}>
                <MaterialIcons name="check" style={styles.checkIcon} color={colors.grey[30]} />
                <Text style={text.stepInactive}>Insect repellent</Text>
              </View>
              <View style={styles.itemStep}>
                <MaterialIcons name="check" style={styles.checkIcon} color={colors.grey[30]} />
                <Text style={text.stepInactive}>Degreasing</Text>
              </View>
              <View style={styles.itemStep}>
                <MaterialIcons name="check" style={styles.checkIcon} color={colors.grey[30]} />
                <Text style={text.stepInactive}>Foam Splash</Text>
              </View>
              <View style={styles.itemStep}>
                <MaterialIcons name="check" style={styles.checkIcon} color={colors.grey[30]} />
                <Text style={text.stepInactive}>Extra drying</Text>
              </View>
            </View>
          )}
          pagingEnabled
          horizontal
          contentContainerStyle={styles.listContent}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={updateCurrentItemIndex}
        />
        <Button text="Select" primary style={{ marginHorizontal: 24 }} onPress={handleOnPress} />
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
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  listContent: {
    marginHorizontal: 24,
  },
  listItem: {
    width: Dimensions.get('window').width - 48,
    height: Dimensions.get('window').height,
  },
  itemStep: {
    flexDirection: 'row',
    height: 28,
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 24,
    lineHeight: 24,
    color: colors.white.base,
  },
  iconButton: {
    backgroundColor: colors.primary.base,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  checkIcon: {
    fontSize: 24,
    lineHeight: 24,
    paddingRight: 8,
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
    color: colors.black.base,
  },
  stepActive: {
    fontFamily: 'gilroy-medium',
    fontSize: 18,
    lineHeight: 22,
    color: colors.grey[90],
  },
  stepInactive: {
    fontFamily: 'gilroy-medium',
    fontSize: 18,
    lineHeight: 22,
    color: colors.grey[30],
  },
});
