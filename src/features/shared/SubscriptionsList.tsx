import { Text, View } from 'react-native';
import RadioButton from './RadioButton';
import { useState } from 'react';
import { useLevels } from '@queries/Levels';

export const SubscriptionsList = () => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const { data, isLoading, error } = useLevels();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data</Text>;

  return (
    <View>
      <Text>SubscriptionList</Text>
      {data.map((level: { name: string; price: number }, index: number) => (
        <RadioButton
          key={index}
          label={level.name}
          price={level.price + ' kr./mo.'}
          value={index}
          selected={selectedValue === index}
          onSelect={setSelectedValue}
          disabled={false}
        />
      ))}
    </View>
  );
};
