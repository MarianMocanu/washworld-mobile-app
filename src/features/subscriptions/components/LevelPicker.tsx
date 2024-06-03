import { Button } from '@shared/Button';
import { ScreenHeader } from '@shared/ScreenHeader';
import { FC, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Level } from '@models/Level';
import { colors, globalTextStyles } from '@globals/globalStyles';
import { LevelStepsList } from './LevelStepsList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  /**
   * The visibility of the modal.
   */
  visible: boolean;
  /**
   * Function to set the visibility of the modal.
   */
  setVisible: (visible: boolean) => void;
  /**
   * Function to handle the selection of a level.
   */
  onSelect: (id: number) => void;
  /**
   * The data of the levels to be displayed.
   */
  levels: Level[];
};

export const LevelPicker: FC<Props> = ({ visible, setVisible, onSelect, levels }) => {
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const [focusedIndex, setFocusedIndex] = useState(0);
  const focusedLevel: Level = useMemo(() => levels[focusedIndex], [levels, focusedIndex]);

  function scrollToNextItem() {
    const nextIndex = focusedIndex + 1;
    if (nextIndex < levels.length) {
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

  function handleOnSelectPress() {
    onSelect(levels[focusedIndex].id);
    setVisible(false);
  }

  return (
    <Modal visible={visible}>
      <ScreenHeader backButtonShown onBackPress={() => setVisible(false)} style={{ marginTop: insets.top }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Button style={styles.button} onPress={scrollToPreviousItem} disabled={focusedIndex === 0}>
            <MaterialIcons name="chevron-left" style={styles.arrowIcon} />
          </Button>
          <Text style={text.title}>Our plans</Text>
          <Button
            style={styles.button}
            onPress={scrollToNextItem}
            disabled={focusedIndex === levels.length - 1}
          >
            <MaterialIcons name="chevron-right" style={styles.arrowIcon} />
          </Button>
        </View>
        {levels.length && focusedLevel ? (
          <View style={styles.horizontal}>
            <Text style={text.level}>{focusedLevel.name}</Text>
            <Text style={text.priceBig}>
              {focusedLevel.price}
              <Text style={text.priceSmall}>kr./mo.</Text>
            </Text>
          </View>
        ) : null}
        <View style={styles.list}>
          <FlatList
            ref={flatListRef}
            data={levels}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }: { item: Level }) => <LevelStepsList steps={item.services[0].steps} />}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={updateCurrentItemIndex}
          />
          <Button text="Select" primary style={{ marginHorizontal: 24 }} onPress={handleOnSelectPress} />
        </View>
      </View>
    </Modal>
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
    justifyContent: 'space-between',
    backgroundColor: colors.white.cream,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});

const text = StyleSheet.create({
  title: {
    ...globalTextStyles.headingLarge,
    alignSelf: 'center',
  },
  level: {
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
