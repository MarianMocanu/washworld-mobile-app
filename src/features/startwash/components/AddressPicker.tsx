import { FC, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@globals/globalStyles';
import Input from '@shared/Input';
import { Button } from '@shared/Button';

export type ReverseGeocodeResponse = {
  id: string;
  vejnavn: string;
  husnr: string;
  postnr: string;
  postnrnavn: string;
  betegnelse: string; // here is the full text for the address
};

// type of the address option fetched from dawa
export type AddressObject = {
  tekst: string;
  adresse: {
    husnr: string;
    postnr: string;
    postnrnavn: string;
    vejnavn: string;
    x: number; // longitude
    y: number; // latitude
  };
};

type Props = {
  /**
   * @description Callback function that is called when the icon is pressed
   */
  onIconPress: () => void;

  /**
   * @description The value of the input field
   */
  address: AddressObject;

  /**
   * @description Callback function that is called when the input value changes
   */
  onAddressSelect: (value: AddressObject) => void;

  /**
   * @description Whether the icon should show a loading indicator
   */
  loading?: boolean;
};

export const AddressPicker: FC<Props> = ({ onIconPress, address, onAddressSelect, loading }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [addressOptions, setAddressOptions] = useState<AddressObject[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  function handleOnSelect(option: AddressObject) {
    onAddressSelect(option);
    setInputValue(option.tekst);
    setAddressOptions([]);
    inputRef.current?.blur();
  }

  useEffect(() => {
    if (inputValue.length < 3) {
      return;
    }
    fetch(`https://dawa.aws.dk/adresser/autocomplete?q=${encodeURIComponent(inputValue)}`)
      .then(response => response.json())
      .then(response => setAddressOptions(response))
      .catch(error => console.error(error));
  }, [inputValue]);

  useEffect(() => {
    setInputValue(address?.tekst ?? '');
  }, [address]);

  return (
    <TouchableWithoutFeedback onPress={inputRef.current?.blur}>
      <>
        <Input
          ref={inputRef}
          placeholder="City, street name or zip code"
          onChangeText={text => setInputValue(text)}
          value={inputValue}
          rightIcon={
            inputValue ? (
              <MaterialIcons name="close" size={24} color={colors.black.base} />
            ) : loading ? (
              <ActivityIndicator color={colors.primary.base} size={'small'} />
            ) : (
              <MaterialIcons name="location-on" size={32} color={colors.primary.base} />
            )
          }
          onRightIconPress={inputValue ? () => setInputValue('') : loading ? undefined : onIconPress}
          inputContainerStyle={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          isValid
        />

        {addressOptions.length > 0 && isFocused && (
          <FlatList
            data={addressOptions}
            keyExtractor={(item, index) => `address-option-${index}`}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Button style={styles.option} onPress={() => handleOnSelect(item)}>
                <Text style={text.option}>{item.tekst}</Text>
              </Button>
            )}
            style={[styles.optionsContainer, { maxHeight: Math.min(4, addressOptions.length) * 48 }]}
          />
        )}
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white.base,
    borderWidth: 1,
    borderColor: colors.grey[10],
    margin: 8,
  },
  optionsContainer: {
    marginHorizontal: 8,
    backgroundColor: colors.white.base,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.grey[10],
    marginTop: -32,
  },
  option: {
    height: 48,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
});

const text = StyleSheet.create({
  option: {
    fontFamily: 'gilroy-medium',
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey[90],
  },
});
