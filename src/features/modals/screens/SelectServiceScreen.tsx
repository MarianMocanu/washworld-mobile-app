import { colors, globalTextStyles } from '@globals/globalStyles';
import { Service, ServiceType } from '@models/Service';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '@shared/Button';
import { ModalStackParamList } from 'src/navigation/ModalNavigator';
import { useTerminals } from '@queries/Terminals';
import { Terminal } from '@models/Terminal';
import { StepsList } from '../components/StepsList';

export const SelectServiceScreen: FC = () => {
  const navigation = useNavigation<NavigationProp<ModalStackParamList, 'select-service'>>();

  const route = useRoute<RouteProp<ModalStackParamList, 'select-service'>>();
  const { locationId } = route.params;

  const flatListRef = useRef<FlatList>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const { data: terminalsData } = useTerminals(locationId, { enabled: !!locationId });
  const [automatedServices, setAutomatedServices] = useState<Service[]>([]);

  function getDistinctAutomatedServices(terminals: Terminal[]): Service[] {
    const allServices: Service[] = terminals.reduce((acc, terminal) => {
      if (terminal.services) {
        acc.push(...terminal.services);
      }
      return acc;
    }, [] as Service[]);

    const distinctAutomatedServices: Service[] = allServices.filter((service, index, self) => {
      if (service.type === ServiceType.auto) {
        return index === self.findIndex(serv => serv.id === service.id);
      }
    });
    return distinctAutomatedServices;
  }

  function scrollToNextItem() {
    const nextIndex = currentItemIndex + 1;
    if (nextIndex < automatedServices.length) {
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
    navigation.navigate('scan-plate');
  }

  useEffect(() => {
    if (terminalsData) {
      setAutomatedServices(getDistinctAutomatedServices(terminalsData));
    }
  }, [terminalsData]);

  return (
    <View style={styles.container}>
      <ScreenHeader backButtonShown onBackPress={navigation.goBack} />
      <View style={styles.screenContent}>
        <Text style={text.title}>Select service</Text>
        <View style={styles.listHeader}>
          <Button style={styles.iconButton} onPress={scrollToPreviousItem} disabled={currentItemIndex === 0}>
            <MaterialIcons name="chevron-left" style={styles.arrowIcon} />
          </Button>
          <Text style={text.serviceLevel}>
            {automatedServices.length ? automatedServices[currentItemIndex].levels![0].name : 'N/A'}
          </Text>
          <Button
            style={styles.iconButton}
            onPress={scrollToNextItem}
            disabled={currentItemIndex === automatedServices.length - 1}
          >
            <MaterialIcons name="chevron-right" style={styles.arrowIcon} />
          </Button>
        </View>
        <FlatList
          ref={flatListRef}
          data={automatedServices}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }: { item: Service }) => <StepsList stepsData={item.steps} numberOfSteps={2} />}
          pagingEnabled
          horizontal
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
});
