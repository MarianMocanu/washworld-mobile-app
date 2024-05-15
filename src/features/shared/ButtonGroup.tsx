import { FC, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from '@shared/Button';

export type ItemData = {
  display: any;
  value: any;
};

type Props = {
  data: ItemData[];
  containerStyle?: StyleProp<ViewStyle>;
  onPress: (value: any) => void;
  initialIndex?: number;
};

export const ButtonGroup: FC<Props> = ({ data, containerStyle, onPress, initialIndex }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex ?? -1);

  function handleOnPress(value: any, index: number) {
    setSelectedIndex(index);
    onPress(value);
  }

  function renderItem({ item, index }: { item: ItemData; index: number }) {
    return (
      <Button
        text={item.display}
        primary={selectedIndex === index}
        primaryUnselected={selectedIndex !== index}
        onPress={() => handleOnPress(item.value, index)}
        key={`button_${index}`}
      />
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {data.map((item, index) => renderItem({ item, index }))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
  },
});
